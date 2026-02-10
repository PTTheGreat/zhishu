import Link from 'next/link';
import Image from 'next/image';
import { Post, CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/types';

export default function BlogCard({ post }: { post: Post }) {
  const date = new Date(post.createdAt)
    .toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-');

  const bgColor = CATEGORY_COLORS[post.category] || '#F0F0EC';
  const label = CATEGORY_LABELS[post.category] || post.category;

  return (
    <Link href={`/blog/${post.slug}`} className="group" style={{ display: 'block', textDecoration: 'none' }}>
      {/* Cover Image */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '15px',
          border: '1px solid var(--border-image)',
          aspectRatio: '4/3',
          background: bgColor,
        }}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          style={{ objectFit: 'contain', padding: '40px', transition: 'transform 0.3s' }}
          className="group-hover:scale-105"
        />
        {/* Category tag */}
        <span
          style={{
            position: 'absolute',
            right: '12px',
            top: '12px',
            borderRadius: '9999px',
            padding: '4px 12px',
            fontSize: '12px',
            background: 'rgba(255,255,255,0.85)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-divider)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {label}
        </span>
      </div>

      {/* Content */}
      <div style={{ marginTop: '16px' }}>
        <div className="font-en" style={{ fontSize: '13px', color: 'var(--text-decorative)' }}>
          {date}
        </div>
        <h3
          className="card-title hover-highlight"
          style={{
            marginTop: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </h3>
        {/* Author */}
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {post.author.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={24}
              height={24}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--border-divider)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {post.author.name}
          </span>
          {post.author.title && (
            <span style={{ fontSize: '11px', color: 'var(--text-decorative)', padding: '1px 6px', borderRadius: '4px', background: 'var(--border-divider)' }}>
              {post.author.title}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
