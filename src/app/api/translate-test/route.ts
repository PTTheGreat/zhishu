import { NextResponse } from 'next/server';
import { translatePostSummaries } from '@/lib/translate';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  const results: Record<string, unknown> = { ts: Date.now(), hasKey: !!apiKey };

  // Test 1: Direct Google API call
  try {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: ['你好世界', '测试标题'],
          source: 'zh-CN',
          target: 'en',
          format: 'text',
        }),
      }
    );
    const data = await res.json();
    results.directApi = {
      ok: res.ok,
      status: res.status,
      translations: data?.data?.translations?.map((t: { translatedText: string }) => t.translatedText),
      error: !res.ok ? data?.error?.message : undefined,
    };
  } catch (err) {
    results.directApi = { error: err instanceof Error ? err.message : 'failed' };
  }

  // Test 2: Batch translate via our utility
  try {
    const fakePosts = [
      { id: 'test-1', title: '语义搜索时代的 SEO 策略', excerpt: '搜索引擎正在进化' },
      { id: 'test-2', title: '增长飞轮 vs 漏斗模型', excerpt: '漏斗思维正在杀死增长' },
    ];
    const map = await translatePostSummaries(fakePosts, 'en');
    results.batchUtil = {
      input: fakePosts.map(p => p.title),
      output: fakePosts.map(p => map.get(p.id)?.title || 'NOT FOUND'),
    };
  } catch (err) {
    results.batchUtil = { error: err instanceof Error ? err.message : 'failed' };
  }

  return NextResponse.json(results, { headers: { 'Cache-Control': 'no-store' } });
}
