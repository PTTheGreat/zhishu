import { NextRequest, NextResponse } from 'next/server';
import { translatePost } from '@/lib/translate';

interface TranslateBody {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  targetLocale: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: TranslateBody = await request.json();
    const { id, title, excerpt, content, targetLocale } = body;

    if (!id || !targetLocale) {
      return NextResponse.json({ error: 'Missing id or targetLocale' }, { status: 400 });
    }

    if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
      return NextResponse.json({
        error: 'GOOGLE_TRANSLATE_API_KEY not configured.',
        title,
        excerpt,
        content,
        cached: false,
      }, { status: 503 });
    }

    const result = await translatePost(id, title, excerpt, content, targetLocale);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
}
