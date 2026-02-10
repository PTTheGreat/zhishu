import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getPublishedPosts } from '@/lib/posts';
import { CATEGORY_COLORS } from '@/lib/types';
import { notFound } from 'next/navigation';
import { getLocale } from '@/i18n/server';
import { getDictionary } from '@/i18n/context';
import ShareButtons from './ShareButtons';

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

  const locale = await getLocale();
  const t = getDictionary(locale);

  const allPosts = getPublishedPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Related posts: same category, exclude current, max 3
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  const dateLocale = locale === 'zh' ? 'zh-CN' : 'en-US';
  const date = new Date(post.createdAt)
    .toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-');

  const catLabel = (t.categories as Record<string, string>)[post.category] || post.category;

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
          {t.blog.allPosts}
        </Link>

        <ShareButtons locale={locale} />

        {/* Category badge */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>{t.blog.category}</div>
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
              {catLabel}
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
              <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>{t.blog.prevPost}</div>
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
              <div style={{ fontSize: '12px', color: 'var(--text-decorative)' }}>{t.blog.nextPost}</div>
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
            <h3 className="module-heading">{t.blog.related}</h3>
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
                        .toLocaleDateString(dateLocale, { month: '2-digit', day: '2-digit' })
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
