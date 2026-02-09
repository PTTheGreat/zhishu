'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-divider)' }}>
      {/* Main footer content */}
      <div
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '64px 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: '32px',
          }}
        >
          {/* Brand column */}
          <div>
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
            {/* Social icons */}
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {[
                { label: 'X', icon: <XIcon /> },
                { label: '微信', icon: <WeChatIcon /> },
                { label: 'LinkedIn', icon: <LinkedInIcon /> },
                { label: '微博', icon: <WeiboIcon /> },
              ].map((s) => (
                <button
                  key={s.label}
                  title={s.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-divider)',
                    background: 'none',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            {
              title: '产品',
              links: [
                { label: '功能介绍', href: '/#features' },
                { label: '定价方案', href: '#' },
                { label: 'API 文档', href: '#' },
                { label: '更新日志', href: '#' },
                { label: '系统状态', href: '#' },
              ],
            },
            {
              title: '资源',
              links: [
                { label: '博客', href: '/blog' },
                { label: '案例研究', href: '#' },
                { label: '白皮书', href: '#' },
                { label: '帮助中心', href: '#' },
                { label: '开发者文档', href: '#' },
              ],
            },
            {
              title: '公司',
              links: [
                { label: '关于我们', href: '#' },
                { label: '加入我们', href: '#' },
                { label: '联系我们', href: '#' },
                { label: '合作伙伴', href: '#' },
                { label: '媒体资源', href: '#' },
              ],
            },
            {
              title: '法律',
              links: [
                { label: '隐私政策', href: '#' },
                { label: '服务条款', href: '#' },
                { label: '数据安全', href: '#' },
                { label: 'Cookie 设置', href: '#' },
              ],
            },
          ].map((group) => (
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
        <div
          style={{
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>
            &copy; {new Date().getFullYear()} 值数科技（ZhiShu Tech）. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>京ICP备2026XXXXXXXX号</span>
            <span style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>增值电信业务经营许可证</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Social Icons ─────────────────────────────────────────────────────── */

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WeChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838C15.114 5.405 12.2 2.188 8.691 2.188z" />
      <path d="M23.66 14.854C24 14.265 24 13.547 24 12.546c0-3.352-3.029-6.108-7.062-6.188-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.108.24-.243 0-.06-.024-.12-.04-.178l-.325-1.233a.492.492 0 0 1 .177-.554c.6-.44 1.06-.994 1.163-1.248z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WeiboIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443z" />
      <path d="M17.661 13.773c-.346-.105-.583-.178-.402-.642.395-1.005.436-1.871.009-2.491-.8-1.162-2.985-1.097-5.455-.031 0 0-.782.344-.582-.279.381-1.236.324-2.272-.27-2.87-1.349-1.36-4.938-.021-8.013 2.991C.683 11.565-.698 14.253.372 16.252c2.027 3.784 7.381 6.084 12.36 6.084 6.528 0 10.869-3.793 10.869-6.807 0-1.822-1.533-2.855-2.765-3.265z" />
    </svg>
  );
}
