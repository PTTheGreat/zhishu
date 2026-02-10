export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  published: boolean;
  /* i18n: optional translated fields */
  title_en?: string;
  excerpt_en?: string;
  content_en?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

/** Static category list — labels are resolved via i18n dict at render time. */
export const CATEGORIES: Category[] = [
  { id: '1', name: '最新的', slug: 'latest' },
  { id: '2', name: '技术', slug: 'tech' },
  { id: '3', name: '产品', slug: 'product' },
  { id: '4', name: '思考', slug: 'thinking' },
];

/**
 * Category slug -> dict key mapping (used to look up i18n labels).
 * e.g. CATEGORY_DICT_KEYS['tech'] = 'tech' → dict.categories.tech
 */
export const CATEGORY_SLUGS = ['latest', 'tech', 'product', 'thinking'] as const;

/**
 * 每个分类对应的封面底色
 * - 技术: 冷蓝调
 * - 产品: 暖米调
 * - 思考: 淡紫调
 */
export const CATEGORY_COLORS: Record<string, string> = {
  tech: '#E4EEF5',
  product: '#F3ECDF',
  thinking: '#ECE8F4',
};

/** Still export CATEGORY_LABELS for backward-compat (server-side fallback). */
export const CATEGORY_LABELS: Record<string, string> = {
  tech: '技术',
  product: '产品',
  thinking: '思考',
};
