'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TiptapEditor from '@/components/TiptapEditor';
import { useT } from '@/i18n/context';

const COVER_IMAGE_VALUES = [
  '/images/illust-lightbulb.svg',
  '/images/illust-megaphone.svg',
  '/images/illust-chart.svg',
  '/images/illust-rocket.svg',
  '/images/illust-brain.svg',
  '/images/illust-telescope.svg',
  '/images/illust-target.svg',
  '/images/illust-puzzle.svg',
];

export default function EditorPage() {
  const router = useRouter();
  const t = useT();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('tech');
  const [coverImage, setCoverImage] = useState('/images/illust-lightbulb.svg');
  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const CATEGORIES = [
    { value: 'tech', label: t.categories.tech },
    { value: 'product', label: t.categories.product },
    { value: 'thinking', label: t.categories.thinking },
  ];

  const coverLabels = t.editor.coverLabels as unknown as string[];

  const handlePublish = async () => {
    if (!title.trim()) {
      alert(t.editor.alertTitleRequired);
      return;
    }
    if (!content.trim() || content === '<p></p>') {
      alert(t.editor.alertContentRequired);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          coverImage,
          author: {
            name: authorName || (t === (await import('@/i18n/zh')).default ? '匿名' : 'Anonymous'),
            title: authorTitle || '',
            avatar: '',
          },
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => {
          router.push('/blog');
        }, 1500);
      } else {
        const err = await res.json();
        alert(err.error || 'Error');
      }
    } catch {
      alert(t.editor.alertNetworkError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '100%', minHeight: '100vh', background: 'white' }}>
      {/* ─── Top bar ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 24px',
          borderBottom: '1px solid var(--border-divider)',
          background: 'white',
        }}
      >
        <Link
          href="/blog"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
          }}
        >
          {t.editor.backToBlog}
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-divider)',
              background: 'none',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            {t.editor.settings}
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            style={{
              padding: '6px 20px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--highlight)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              opacity: saving ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {saving ? t.editor.publishing : saved ? t.editor.published : t.editor.publish}
          </button>
        </div>
      </div>

      {/* ─── Main layout ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex' }}>
        {/* ─── Content area ──────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            maxWidth: '760px',
            margin: '0 auto',
            padding: '48px 24px',
          }}
        >
          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.editor.titlePlaceholder}
            className="font-title"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '36px',
              fontWeight: 700,
              color: 'var(--text-strong)',
              background: 'transparent',
              lineHeight: 1.3,
              marginBottom: '32px',
            }}
          />

          {/* Editor */}
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        {/* ─── Settings panel (slide in) ──────────────────────────────── */}
        {showSettings && (
          <aside
            style={{
              width: '300px',
              flexShrink: 0,
              borderLeft: '1px solid var(--border-divider)',
              padding: '24px',
              background: 'var(--bg-primary)',
              height: 'calc(100vh - 49px)',
              position: 'sticky',
              top: '49px',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-strong)' }}>
                {t.editor.articleSettings}
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-decorative)', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>

            {/* Author */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                {t.editor.author}
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder={t.editor.authorPlaceholder}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid var(--border-divider)',
                  padding: '8px 12px',
                  fontSize: '13px',
                  outline: 'none',
                  color: 'var(--text-regular)',
                  background: 'white',
                }}
              />
            </div>

            {/* Author Title */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                {t.editor.jobTitle}
              </label>
              <input
                type="text"
                value={authorTitle}
                onChange={(e) => setAuthorTitle(e.target.value)}
                placeholder={t.editor.jobTitlePlaceholder}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid var(--border-divider)',
                  padding: '8px 12px',
                  fontSize: '13px',
                  outline: 'none',
                  color: 'var(--text-regular)',
                  background: 'white',
                }}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                {t.editor.categoryLabel}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid var(--border-divider)',
                  padding: '8px 12px',
                  fontSize: '13px',
                  outline: 'none',
                  color: 'var(--text-regular)',
                  background: 'white',
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover image */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                {t.editor.coverImage}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {COVER_IMAGE_VALUES.map((val, idx) => (
                  <button
                    key={val}
                    onClick={() => setCoverImage(val)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '10px 6px',
                      borderRadius: '8px',
                      border: coverImage === val
                        ? '2px solid var(--highlight)'
                        : '1px solid var(--border-divider)',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '6px',
                        background: '#F5F5F0',
                        backgroundImage: `url(${val})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    {coverLabels[idx] || ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Cover image URL */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                {t.editor.coverImageUrl}
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid var(--border-divider)',
                  padding: '8px 12px',
                  fontSize: '13px',
                  outline: 'none',
                  color: 'var(--text-regular)',
                  background: 'white',
                }}
              />
            </div>

            {/* Tips */}
            <div
              style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'var(--highlight-light)',
                fontSize: '12px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}
            >
              <strong style={{ color: 'var(--highlight)' }}>{t.editor.editorTips}</strong>
              <ul style={{ marginTop: '6px', paddingLeft: '16px' }}>
                <li><kbd style={{ padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--border-divider)', fontSize: '11px' }}>/</kbd> {t.editor.tipSlash}</li>
                <li>{t.editor.tipSelect}</li>
                <li>{t.editor.tipMarkdown}</li>
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
