import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'src/data/translations-cache.json');

interface TranslateBody {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  targetLocale: string;
}

interface CacheEntry {
  title: string;
  excerpt: string;
  content: string;
  translatedAt: string;
}

type CacheMap = Record<string, CacheEntry>;

/** Read cache from disk. */
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

/** Write cache to disk (best-effort; Vercel serverless may not persist). */
function writeCache(cache: CacheMap) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch {
    // ignore write errors on serverless
  }
}

/** Call Google Cloud Translation API v2 to translate text. */
async function translateWithGoogle(text: string, targetLang: string): Promise<string> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_TRANSLATE_API_KEY is not configured');
  }

  // Google Translate API v2 supports HTML via format=html
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'zh-CN',
        target: targetLang === 'en' ? 'en' : targetLang,
        format: 'html', // preserves HTML tags in content
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google Translate API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data?.data?.translations?.[0]?.translatedText || text;
}

export async function POST(request: NextRequest) {
  try {
    const body: TranslateBody = await request.json();
    const { id, title, excerpt, content, targetLocale } = body;

    if (!id || !targetLocale) {
      return NextResponse.json({ error: 'Missing id or targetLocale' }, { status: 400 });
    }

    const cacheKey = `${id}_${targetLocale}`;
    const cache = readCache();

    // Return cached version if available
    if (cache[cacheKey]) {
      return NextResponse.json({
        title: cache[cacheKey].title,
        excerpt: cache[cacheKey].excerpt,
        content: cache[cacheKey].content,
        cached: true,
      });
    }

    // Check if Google Translate key is configured
    if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
      return NextResponse.json({
        error: 'GOOGLE_TRANSLATE_API_KEY not configured. Set it in your environment variables.',
        title,
        excerpt,
        content,
        cached: false,
      }, { status: 503 });
    }

    // Translate all fields via Google Cloud Translation
    const lang = targetLocale === 'en' ? 'en' : targetLocale;
    const [translatedTitle, translatedExcerpt, translatedContent] = await Promise.all([
      translateWithGoogle(title, lang),
      translateWithGoogle(excerpt, lang),
      translateWithGoogle(content, lang),
    ]);

    // Cache the result
    cache[cacheKey] = {
      title: translatedTitle,
      excerpt: translatedExcerpt,
      content: translatedContent,
      translatedAt: new Date().toISOString(),
    };
    writeCache(cache);

    return NextResponse.json({
      title: translatedTitle,
      excerpt: translatedExcerpt,
      content: translatedContent,
      cached: false,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
}
