import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getPublishedPosts } from '@/lib/posts';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/types';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getPublishedPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Related posts: same category, exclude current, max 3
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  const date = new Date(post.createdAt)
    .toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-');

  return (
    <div
      className="blog-detail-layout"
      style={{
        maxWidth: 'var(--container-width)',
        margin: '0 auto',
        padding: '48px 24px',
      }}
    >
      {/* Left sidebar */}
      <aside className="blog-detail-sidebar">
        <Link
          href="/blog"
          className="hover-highlight"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none' }}
        >
          ← 所有文章
        </Link>

        <div style={{ marginTop: '24px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>分享此文</div>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {['link', 'twitter', 'wechat', 'weibo'].map((icon) => (
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
              >
                <ShareIcon type={icon} />
              </button>
            ))}
          </div>
        </div>

        {/* Category badge */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>分类</div>
          <div style={{ marginTop: '8px' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-block',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
                background: CATEGORY_COLORS[post.category] || '#F0F0EC',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              {CATEGORY_LABELS[post.category] || post.category}
            </Link>
          </div>
        </div>
      </aside>

      {/* Article content */}
      <div className="blog-detail-content">
        <article>
          <h1
            className="font-title"
            style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}
          >
            {post.title}
          </h1>

          {/* Author info with real avatar */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={36}
                height={36}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'var(--border-divider)',
                  color: 'var(--text-secondary)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-regular)' }}>{post.author.name}</span>
                {post.author.title && (
                  <span style={{ fontSize: '11px', color: 'var(--text-decorative)', padding: '1px 6px', borderRadius: '4px', background: 'var(--border-divider)' }}>
                    {post.author.title}
                  </span>
                )}
              </div>
              <span className="font-en" style={{ fontSize: '13px', color: 'var(--text-decorative)' }}>{date}</span>
            </div>
          </div>

          {/* Article body */}
          <div
            className="article-content"
            style={{ marginTop: '40px' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Cover illustration */}
          <div
            style={{
              margin: '40px 0',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '16px',
              padding: '48px',
              background: CATEGORY_COLORS[post.category] || '#F0F0EC',
              border: '1px solid var(--border-image)',
            }}
          >
            <Image src={post.coverImage} alt={post.title} width={280} height={210} />
          </div>
        </article>

        {/* ─── Prev / Next navigation ──────────────────────────────────── */}
        <div
          className="prev-next-grid"
          style={{
            marginTop: '48px',
            borderTop: '1px solid var(--border-divider)',
            paddingTop: '40px',
          }}
        >
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group"
              style={{
                borderRadius: '12px',
                border: '1px solid var(--border-divider)',
                padding: '20px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>← 上一篇</div>
              <div
                className="card-title hover-highlight"
                style={{
                  marginTop: '8px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {prevPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group"
              style={{
                borderRadius: '12px',
                border: '1px solid var(--border-divider)',
                padding: '20px',
                textAlign: 'right',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>下一篇 →</div>
              <div
                className="card-title hover-highlight"
                style={{
                  marginTop: '8px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {nextPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* ─── Related articles ────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h3 className="module-heading">相关推荐</h3>
            <div className="related-posts-grid" style={{ marginTop: '24px' }}>
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group"
                  style={{
                    overflow: 'hidden',
                    borderRadius: '12px',
                    border: '1px solid var(--border-divider)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px',
                      background: CATEGORY_COLORS[rp.category] || '#F0F0EC',
                      aspectRatio: '16/9',
                    }}
                  >
                    <Image
                      src={rp.coverImage}
                      alt={rp.title}
                      width={80}
                      height={60}
                      style={{ opacity: 0.7, transition: 'transform 0.3s' }}
                      className="group-hover:scale-110"
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div className="font-en" style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>
                      {new Date(rp.createdAt)
                        .toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
                        .replace(/\//g, '-')}
                    </div>
                    <div
                      className="card-title hover-highlight"
                      style={{
                        marginTop: '6px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {rp.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Share Icons ──────────────────────────────────────────────────────── */

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
