'use client';

import Link from 'next/link';
import { useT } from '@/i18n/context';

export default function Footer() {
  const t = useT();

  const linkGroups = [
    {
      title: t.footer.product,
      links: [
        { label: t.footer.featuresIntro, href: '/#features' },
        { label: t.footer.useCases, href: '/#cases' },
      ],
    },
    {
      title: t.footer.resources,
      links: [
        { label: t.nav.blog, href: '/blog' },
      ],
    },
  ];

  return (
    <footer style={{ borderTop: '1px solid var(--border-divider)' }}>
      <div
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '64px 24px',
        }}
      >
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-strong)', fontFamily: 'var(--font-serif)' }}>
                {t.common.brand}
              </span>
            </div>
            <p
              style={{
                marginTop: '16px',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '300px',
              }}
            >
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-strong)' }}>
                {group.title}
              </div>
              <nav style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border-divider)' }}>
        <div className="footer-bottom">
          <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
