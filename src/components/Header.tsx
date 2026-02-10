'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { label: '功能', href: '/#features' },
  { label: '资源', href: '/#insights' },
  { label: '活动', href: '/#cases' },
  { label: '博客', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
            值
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
            值数
          </span>
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          className="header-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
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

          <Link
            href="/#cta"
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
            免费试用
          </Link>
        </nav>
      </div>
    </header>
  );
}
