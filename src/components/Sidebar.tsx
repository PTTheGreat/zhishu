'use client';

import { CATEGORY_SLUGS } from '@/lib/types';
import { useT } from '@/i18n/context';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  const t = useT();

  /** Resolve category slug to its i18n label. */
  const catLabel = (slug: string) => {
    return (t.categories as Record<string, string>)[slug] || slug;
  };

  return (
    <aside style={{ width: '200px', flexShrink: 0, paddingRight: '32px' }}>
      <h1
        className="font-en"
        style={{ fontSize: '24px', fontWeight: 600, color: 'var(--highlight)', letterSpacing: '-0.02em' }}
      >
        Blog
      </h1>
      <p style={{ marginTop: '10px', fontSize: '13px', lineHeight: 1.65, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
        {t.blog.sidebarTagline}
      </p>

      <nav style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {CATEGORY_SLUGS.map((slug) => (
          <button
            key={slug}
            onClick={() => onCategoryChange(slug)}
            style={{
              textAlign: 'left',
              fontSize: '14px',
              color: activeCategory === slug ? 'var(--text-strong)' : 'var(--text-secondary)',
              fontWeight: activeCategory === slug ? 600 : 400,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.2s',
            }}
          >
            {catLabel(slug)}
          </button>
        ))}
      </nav>
    </aside>
  );
}
