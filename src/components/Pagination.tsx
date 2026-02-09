'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const btnBase: React.CSSProperties = {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontSize: '14px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-en)',
    transition: 'opacity 0.2s',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '32px 0' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ ...btnBase, color: 'var(--text-secondary)', opacity: currentPage === 1 ? 0.3 : 1 }}
      >
        ‹
      </button>

      {getVisiblePages().map((page, i) =>
        typeof page === 'string' ? (
          <span key={`dots-${i}`} style={{ ...btnBase, color: 'var(--text-decorative)', cursor: 'default' }}>
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              ...btnBase,
              color: page === currentPage ? 'var(--text-strong)' : 'var(--text-secondary)',
              fontWeight: page === currentPage ? 600 : 400,
            }}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ ...btnBase, color: 'var(--text-secondary)', opacity: currentPage === totalPages ? 0.3 : 1 }}
      >
        ›
      </button>
    </div>
  );
}
