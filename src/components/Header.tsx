'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: '功能', href: '/#features' },
  { label: '资源', href: '/#insights' },
  { label: '活动', href: '/#cases' },
  { label: '博客', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        width: '100%',
        borderBottom: '1px solid var(--border-divider)',
        backgroundColor: 'var(--bg-primary)',
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
        {/* Logo — 思源宋体 */}
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

        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => {
            const active = link.href === '/blog' && pathname?.startsWith('/blog');
            return (
              <Link
                key={link.label}
                href={link.href}
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
            href="#"
            style={{
              fontSize: '14px',
              fontWeight: 400,
              padding: '6px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-divider)',
              color: 'var(--text-regular)',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            登录
          </Link>
          <Link
            href="/#cta"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              padding: '6px 16px',
              borderRadius: '8px',
              backgroundColor: 'var(--highlight)',
              color: '#fff',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            免费试用
          </Link>
        </nav>
      </div>
    </header>
  );
}
