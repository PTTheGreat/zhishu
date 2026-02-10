import { cookies, headers } from 'next/headers';
import zh from './zh';
import en from './en';
import type { Dict } from './zh';
import type { Locale } from './types';

export type { Locale };

const DICTS: Record<Locale, Dict> = { zh, en };

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

/** Get dictionary for a given locale (server-safe, no 'use client'). */
export function getDictionary(locale: Locale): Dict {
  return DICTS[locale] ?? zh;
}
