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

/** Call OpenAI to translate text. */
async function translateWithOpenAI(text: string, field: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const systemPrompt = field === 'content'
    ? 'You are a professional translator. Translate the following Chinese HTML content into natural, fluent English. Preserve all HTML tags exactly. Only output the translated HTML, nothing else.'
    : 'You are a professional translator. Translate the following Chinese text into natural, fluent English. Only output the translation, nothing else.';

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || text;
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

    // Check if OpenAI key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: 'OPENAI_API_KEY not configured. Set it in your environment variables.',
        title,
        excerpt,
        content,
        cached: false,
      }, { status: 503 });
    }

    // Translate all fields
    const [translatedTitle, translatedExcerpt, translatedContent] = await Promise.all([
      translateWithOpenAI(title, 'title'),
      translateWithOpenAI(excerpt, 'excerpt'),
      translateWithOpenAI(content, 'content'),
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
