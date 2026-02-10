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

/** Call Google Cloud Translation API v2 to translate a single text. */
async function callGoogleTranslate(text: string, targetLang: string): Promise<string> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey || !text.trim()) return text;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
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
      return text; // fallback to original
    }

    const data = await res.json();
    return data?.data?.translations?.[0]?.translatedText || text;
  } catch (err) {
    // Network error / timeout — return original text gracefully
    console.error('Google Translate fetch failed (network/timeout):', err instanceof Error ? err.message : err);
    return text;
  }
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
