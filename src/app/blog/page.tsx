'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { Post } from '@/lib/types';

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'latest') {
        params.set('category', activeCategory);
      }
      const res = await fetch(`/api/posts?${params.toString()}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

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
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          display: 'flex',
          gap: '48px',
          padding: '48px 24px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            写文章
          </Link>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-decorative)' }}>加载中...</div>
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-decorative)' }}>暂无文章</div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  columnGap: '30px',
                  rowGap: '36px',
                }}
              >
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
            <h2
              className="font-title"
              style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-strong)' }}
            >
              订阅值数洞察周刊
            </h2>
            <p
              style={{
                marginTop: '12px',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              每周精选全网营销趋势、达人动态、品牌案例，直送你的邮箱。已有 8,000+ 营销人订阅。
            </p>

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="email"
                placeholder="输入你的工作邮箱"
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
                订阅
              </button>
            </div>

            <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-decorative)' }}>
              无垃圾邮件，随时退订。查看我们的
              <a href="#" style={{ textDecoration: 'underline' }}>
                隐私政策
              </a>
              。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
