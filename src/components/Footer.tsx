'use client';

import Link from 'next/link';

export default function Footer() {
  /* Only include link groups that have at least one real (non-#) link */
  const linkGroups = [
    {
      title: '产品',
      links: [
        { label: '功能介绍', href: '/#features' },
        { label: '使用场景', href: '/#cases' },
      ],
    },
    {
      title: '资源',
      links: [
        { label: '博客', href: '/blog' },
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
                值
              </div>
              <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-strong)', fontFamily: 'var(--font-serif)' }}>
                值数
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
              全网内容洞察平台。覆盖 30+ 内容平台，通过 AI
              实时分析全网数据，帮助品牌发现趋势、评估达人、监测声量，让每一个营销决策都有据可依。
            </p>
          </div>

          {/* Link columns — only real links */}
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
            &copy; {new Date().getFullYear()} 值数科技（ZhiShu Tech）. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
