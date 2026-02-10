'use client';

import { useT } from '@/i18n/context';
import type { Locale } from '@/i18n/context';

export default function ShareButtons({ locale }: { locale: Locale }) {
  const t = useT();

  /* Chinese env: link, wechat, weibo   English env: link, twitter, linkedin */
  const shareIcons = locale === 'zh'
    ? ['link', 'wechat', 'weibo']
    : ['link', 'twitter', 'linkedin'];

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>{t.blog.shareThis}</div>
      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {shareIcons.map((icon) => (
          <button
            key={icon}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: '1px solid var(--border-divider)',
              background: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
            onClick={() => handleShare(icon)}
          >
            <ShareIcon type={icon} />
          </button>
        ))}
      </div>
    </div>
  );
}

function handleShare(type: string) {
  if (typeof window === 'undefined') return;
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  switch (type) {
    case 'link':
      navigator.clipboard.writeText(window.location.href);
      break;
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
      break;
    case 'linkedin':
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
      break;
    case 'wechat':
      // WeChat sharing typically requires a QR code; for now, copy link
      navigator.clipboard.writeText(window.location.href);
      break;
    case 'weibo':
      window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank');
      break;
  }
}

function ShareIcon({ type }: { type: string }) {
  switch (type) {
    case 'link':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'wechat':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z" />
          <path d="M16.938 8.858c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.108.24-.243 0-.06-.024-.12-.04-.178l-.325-1.233a.492.492 0 0 1 .177-.554C23.238 18.394 24 16.81 24 15.046c0-3.352-3.029-6.108-7.062-6.188z" />
        </svg>
      );
    case 'weibo':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443z" />
          <path d="M17.661 13.773c-.346-.105-.583-.178-.402-.642.395-1.005.436-1.871.009-2.491-.8-1.162-2.985-1.097-5.455-.031 0 0-.782.344-.582-.279.381-1.236.324-2.272-.27-2.87-1.349-1.36-4.938-.021-8.013 2.991C.683 11.565-.698 14.253.372 16.252c2.027 3.784 7.381 6.084 12.36 6.084 6.528 0 10.869-3.793 10.869-6.807 0-1.822-1.533-2.855-2.765-3.265z" />
        </svg>
      );
    default:
      return null;
  }
}
