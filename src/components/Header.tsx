'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useT, useLocale } from '@/i18n/context';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useT();
  const locale = useLocale();

  const navLinks = [
    { label: t.nav.features, href: '/#features' },
    { label: t.nav.blog, href: '/blog' },
  ];

  /** Switch locale by toggling subdomain (production) or ?lang= (dev). */
  const switchLocale = () => {
    const target = locale === 'zh' ? 'en' : 'zh';
    if (typeof window === 'undefined') return;
    const { hostname, protocol, port, pathname: p, search } = window.location;

    // Production: switch subdomain
    const parts = hostname.split('.');
    if (parts.length >= 2 && (parts[0] === 'zh' || parts[0] === 'en')) {
      parts[0] = target;
      window.location.href = `${protocol}//${parts.join('.')}${port ? ':' + port : ''}${p}${search}`;
      return;
    }

    // Dev: use ?lang= param
    const url = new URL(window.location.href);
    url.searchParams.set('lang', target);
    // Also set cookie so it persists
    document.cookie = `locale=${target};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
    window.location.href = url.toString();
  };

  return (
    <header
      style={{
        width: '100%',
        borderBottom: '1px solid var(--border-divider)',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 200,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--text-strong)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)',
            }}
          >
            {t.common.brandIcon}
          </div>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--text-strong)',
              letterSpacing: '0.02em',
              fontFamily: 'var(--font-serif)',
            }}
          >
            {t.common.brand}
          </span>
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          className="header-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t.nav.menu}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Nav */}
        <nav className={`header-nav ${menuOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => {
            const active = link.href === '/blog' && pathname?.startsWith('/blog');
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: '14px',
                  fontWeight: active ? 500 : 400,
                  color: active ? 'var(--text-strong)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Language Switcher */}
          <button
            onClick={switchLocale}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-divider)',
              background: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {locale === 'zh' ? 'EN' : '中'}
          </button>

          <Link
            href="/demo"
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              padding: '6px 16px',
              borderRadius: '8px',
              backgroundColor: 'var(--highlight)',
              color: '#fff',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              textAlign: 'center',
            }}
          >
            {t.nav.trialCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
