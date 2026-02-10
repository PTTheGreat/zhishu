'use client';

import { CATEGORIES } from '@/lib/types';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside style={{ width: '200px', flexShrink: 0, paddingRight: '32px' }}>
      <h1
        className="font-en"
        style={{ fontSize: '24px', fontWeight: 600, color: 'var(--highlight)', letterSpacing: '-0.02em' }}
      >
        Blog
      </h1>
      <p style={{ marginTop: '10px', fontSize: '13px', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
        全网洞察营销，
        <br />
        先行者的思考与实践。
      </p>

      <nav style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            style={{
              textAlign: 'left',
              fontSize: '14px',
              color: activeCategory === cat.slug ? 'var(--text-strong)' : 'var(--text-secondary)',
              fontWeight: activeCategory === cat.slug ? 600 : 400,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.2s',
            }}
          >
            {cat.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
