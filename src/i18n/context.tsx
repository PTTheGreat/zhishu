'use client';

import { createContext, useContext, type ReactNode } from 'react';
import zh, { type Dict } from './zh';
import en from './en';

/* ─── Types ───────────────────────────────────────────────────────── */

export type Locale = 'zh' | 'en';

const DICTS: Record<Locale, Dict> = { zh, en };

/* ─── Context ─────────────────────────────────────────────────────── */

interface LocaleCtx {
  locale: Locale;
  dict: Dict;
}

const LocaleContext = createContext<LocaleCtx>({ locale: 'zh', dict: zh });

/* ─── Provider ────────────────────────────────────────────────────── */

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const dict = DICTS[locale] ?? zh;
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

/* ─── Hooks ───────────────────────────────────────────────────────── */

/** Get the current locale string ('zh' | 'en'). */
export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

/** Get the full dictionary object for the current locale. */
export function useDict(): Dict {
  return useContext(LocaleContext).dict;
}

/** Shorthand — same as useDict. */
export function useT(): Dict {
  return useContext(LocaleContext).dict;
}

/* ─── Server-side helper ──────────────────────────────────────────── */

/** Get dictionary for a given locale (for use in Server Components / API). */
export function getDictionary(locale: Locale): Dict {
  return DICTS[locale] ?? zh;
}
