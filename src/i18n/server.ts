import { cookies, headers } from 'next/headers';
import type { Locale } from './context';

/**
 * Read locale in Server Components.
 * Reads from the cookie set by middleware, falls back to x-locale header, then 'zh'.
 */
export async function getLocale(): Promise<Locale> {
  // Try cookie first
  const cookieStore = await cookies();
  const cookie = cookieStore.get('locale')?.value;
  if (cookie === 'en' || cookie === 'zh') return cookie;

  // Fall back to header set by middleware
  const headerStore = await headers();
  const header = headerStore.get('x-locale');
  if (header === 'en' || header === 'zh') return header;

  return 'zh';
}
