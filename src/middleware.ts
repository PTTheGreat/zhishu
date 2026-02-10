import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware: detect locale from subdomain, query param, or Accept-Language header.
 *
 * Priority:
 *   1. `?lang=zh|en`  (dev override)
 *   2. Subdomain prefix: `zh.` or `en.`
 *   3. Existing `locale` cookie
 *   4. Accept-Language header
 *   5. Default → 'zh'
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;

  let locale: string | null = null;

  // 1. Query-param override (useful for local dev)
  const langParam = url.searchParams.get('lang');
  if (langParam === 'en' || langParam === 'zh') {
    locale = langParam;
  }

  // 2. Subdomain
  if (!locale) {
    const parts = host.split('.');
    if (parts.length >= 2) {
      const sub = parts[0].toLowerCase();
      if (sub === 'en') locale = 'en';
      else if (sub === 'zh') locale = 'zh';
    }
  }

  // 3. Existing cookie
  if (!locale) {
    const cookie = request.cookies.get('locale')?.value;
    if (cookie === 'en' || cookie === 'zh') {
      locale = cookie;
    }
  }

  // 4. Accept-Language
  if (!locale) {
    const acceptLang = request.headers.get('accept-language') || '';
    locale = acceptLang.toLowerCase().includes('zh') ? 'zh' : 'en';
  }

  // Ensure valid
  if (locale !== 'en') locale = 'zh';

  // Set header for downstream Server Components
  response.headers.set('x-locale', locale);

  // Set cookie (30 days)
  response.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
