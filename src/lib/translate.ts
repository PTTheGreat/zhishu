import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'src/data/translations-cache.json');

interface CacheEntry {
  title: string;
  excerpt: string;
  content: string;
  translatedAt: string;
}

type CacheMap = Record<string, CacheEntry>;

/** Read translation cache from disk. */
function readCache(): CacheMap {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    }
  } catch {
    // ignore corrupt cache
  }
  return {};
}

/** Write translation cache to disk (best-effort). */
function writeCache(cache: CacheMap) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch {
    // ignore write errors on serverless
  }
}

/**
 * Call Google Cloud Translation API v2 to translate one or more texts in a single request.
 * Returns an array of translated strings in the same order as input.
 */
async function callGoogleTranslateBatch(texts: string[], targetLang: string): Promise<string[]> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) return texts;

  // Filter out empty strings but remember their positions
  const indexMap: number[] = [];
  const nonEmpty: string[] = [];
  texts.forEach((t, i) => {
    if (t.trim()) {
      indexMap.push(i);
      nonEmpty.push(t);
    }
  });

  if (nonEmpty.length === 0) return texts;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: nonEmpty,
          source: 'zh-CN',
          target: targetLang,
          format: 'html',
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      console.error('Google Translate error:', res.status, await res.text());
      return texts; // fallback to originals
    }

    const data = await res.json();
    const translations = data?.data?.translations || [];

    // Reconstruct the full array
    const result = [...texts];
    indexMap.forEach((originalIdx, batchIdx) => {
      result[originalIdx] = translations[batchIdx]?.translatedText || texts[originalIdx];
    });
    return result;
  } catch (err) {
    console.error('Google Translate batch failed:', err instanceof Error ? err.message : err);
    return texts; // fallback to originals
  }
}

/** Convenience: translate a single text. */
async function callGoogleTranslate(text: string, targetLang: string): Promise<string> {
  const [result] = await callGoogleTranslateBatch([text], targetLang);
  return result;
}

/**
 * Translate a blog post's title, excerpt, and content.
 * Returns cached result if available; otherwise calls Google Translate and caches.
 * If no API key is configured, returns original text.
 */
export async function translatePost(
  id: string,
  title: string,
  excerpt: string,
  content: string,
  targetLocale: string
): Promise<{ title: string; excerpt: string; content: string; cached: boolean }> {
  const cacheKey = `${id}_${targetLocale}`;
  const cache = readCache();

  // Return cached version
  if (cache[cacheKey]) {
    return {
      title: cache[cacheKey].title,
      excerpt: cache[cacheKey].excerpt,
      content: cache[cacheKey].content,
      cached: true,
    };
  }

  // No API key? Return original
  if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
    return { title, excerpt, content, cached: false };
  }

  const lang = targetLocale === 'en' ? 'en' : targetLocale;

  // Translate all fields in parallel
  const [translatedTitle, translatedExcerpt, translatedContent] = await Promise.all([
    callGoogleTranslate(title, lang),
    callGoogleTranslate(excerpt, lang),
    callGoogleTranslate(content, lang),
  ]);

  // Cache the result
  cache[cacheKey] = {
    title: translatedTitle,
    excerpt: translatedExcerpt,
    content: translatedContent,
    translatedAt: new Date().toISOString(),
  };
  writeCache(cache);

  return {
    title: translatedTitle,
    excerpt: translatedExcerpt,
    content: translatedContent,
    cached: false,
  };
}

/**
 * Translate only title + excerpt (lightweight, for list views).
 */
export async function translatePostSummary(
  id: string,
  title: string,
  excerpt: string,
  targetLocale: string
): Promise<{ title: string; excerpt: string }> {
  const cacheKey = `${id}_${targetLocale}`;
  const cache = readCache();

  if (cache[cacheKey]) {
    return {
      title: cache[cacheKey].title,
      excerpt: cache[cacheKey].excerpt,
    };
  }

  if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
    return { title, excerpt };
  }

  const lang = targetLocale === 'en' ? 'en' : targetLocale;

  const [translatedTitle, translatedExcerpt] = await Promise.all([
    callGoogleTranslate(title, lang),
    callGoogleTranslate(excerpt, lang),
  ]);

  // Partial cache (title + excerpt only, no content yet)
  cache[cacheKey] = {
    title: translatedTitle,
    excerpt: translatedExcerpt,
    content: '', // will be filled when user opens the detail page
    translatedAt: new Date().toISOString(),
  };
  writeCache(cache);

  return { title: translatedTitle, excerpt: translatedExcerpt };
}

/**
 * Batch-translate summaries for multiple posts (used by list API).
 * Uses only 2 Google API calls regardless of post count.
 */
export async function translatePostSummaries(
  posts: { id: string; title: string; excerpt: string }[],
  targetLocale: string
): Promise<Map<string, { title: string; excerpt: string }>> {
  const cache = readCache();
  const lang = targetLocale === 'en' ? 'en' : targetLocale;
  const result = new Map<string, { title: string; excerpt: string }>();

  // Separate cached vs uncached
  const uncachedIndices: number[] = [];
  posts.forEach((post, idx) => {
    const cacheKey = `${post.id}_${targetLocale}`;
    if (cache[cacheKey]) {
      result.set(post.id, {
        title: cache[cacheKey].title,
        excerpt: cache[cacheKey].excerpt,
      });
    } else {
      uncachedIndices.push(idx);
    }
  });

  // If all cached, return immediately
  if (uncachedIndices.length === 0) return result;

  // No API key? Return originals
  if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
    uncachedIndices.forEach((idx) => {
      result.set(posts[idx].id, {
        title: posts[idx].title,
        excerpt: posts[idx].excerpt,
      });
    });
    return result;
  }

  // Batch translate: all titles in one call, all excerpts in another
  const titlesToTranslate = uncachedIndices.map((i) => posts[i].title);
  const excerptsToTranslate = uncachedIndices.map((i) => posts[i].excerpt);

  const [translatedTitles, translatedExcerpts] = await Promise.all([
    callGoogleTranslateBatch(titlesToTranslate, lang),
    callGoogleTranslateBatch(excerptsToTranslate, lang),
  ]);

  // Store results and update cache
  uncachedIndices.forEach((origIdx, batchIdx) => {
    const post = posts[origIdx];
    const tTitle = translatedTitles[batchIdx] || post.title;
    const tExcerpt = translatedExcerpts[batchIdx] || post.excerpt;

    result.set(post.id, { title: tTitle, excerpt: tExcerpt });

    const cacheKey = `${post.id}_${targetLocale}`;
    cache[cacheKey] = {
      title: tTitle,
      excerpt: tExcerpt,
      content: '',
      translatedAt: new Date().toISOString(),
    };
  });

  writeCache(cache);
  return result;
}
