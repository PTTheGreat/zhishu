import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      status: 'error',
      message: 'GOOGLE_TRANSLATE_API_KEY not found in environment',
    });
  }

  try {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: ['你好世界'],
          source: 'zh-CN',
          target: 'en',
          format: 'text',
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({
        status: 'error',
        httpStatus: res.status,
        apiKeyPrefix: apiKey.substring(0, 10) + '...',
        errorResponse: data,
      });
    }

    return NextResponse.json({
      status: 'ok',
      apiKeyPrefix: apiKey.substring(0, 10) + '...',
      input: '你好世界',
      output: data?.data?.translations?.[0]?.translatedText,
    });
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}
