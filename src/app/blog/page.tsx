'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { Post } from '@/lib/types';
import { useT, useLocale } from '@/i18n/context';

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const t = useT();
  const locale = useLocale();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'latest') {
        params.set('category', activeCategory);
      }
      params.set('locale', locale);
      const res = await fetch(`/api/posts?${params.toString()}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, locale]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <div
        className="blog-layout"
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '48px 24px',
        }}
      >
        <div className="blog-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Sidebar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <Link
            href="/editor"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'var(--highlight)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              width: 'fit-content',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {t.blog.writePost}
          </Link>
        </div>

        <div className="blog-main">
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-decorative)' }}>{t.blog.loading}</div>
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-decorative)' }}>{t.blog.noArticles}</div>
            </div>
          ) : (
            <>
              <div className="blog-card-grid">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      {/* ─── Newsletter / Subscribe Section ────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--border-divider)' }}>
        <div
          style={{
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            padding: '80px 24px',
          }}
        >
          <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-heading">{t.blog.subscribeTitle}</h2>
            <p className="section-desc" style={{ marginTop: '12px' }}>
              {t.blog.subscribeDesc}
            </p>

            <div className="subscribe-form" style={{ marginTop: '24px' }}>
              <input
                type="email"
                placeholder={t.blog.subscribePlaceholder}
                style={{
                  flex: 1,
                  borderRadius: '12px',
                  border: '1px solid var(--border-divider)',
                  padding: '12px 16px',
                  fontSize: '14px',
                  outline: 'none',
                  color: 'var(--text-regular)',
                  background: '#fff',
                }}
              />
              <button
                style={{
                  flexShrink: 0,
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#fff',
                  backgroundColor: 'var(--highlight)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t.blog.subscribeBtn}
              </button>
            </div>

            <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-decorative)' }}>
              {t.blog.subscribeDisclaimer}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
