import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getPostsByCategory, createPost } from '@/lib/posts';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let posts;
  if (category) {
    posts = getPostsByCategory(category);
  } else {
    posts = getAllPosts().filter((p) => p.published);
  }

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, coverImage, category, author } = body;

    if (!title || !content) {
      return NextResponse.json({ error: '标题和内容不能为空' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '')
      || `post-${Date.now()}`;

    const post = {
      id: uuidv4(),
      title,
      slug: `${slug}-${Date.now()}`,
      excerpt: excerpt || title.substring(0, 100),
      content,
      coverImage: coverImage || '/images/illust-lightbulb.svg',
      category: category || 'tech',
      author: author || { name: '匿名', avatar: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: true,
    };

    const created = createPost(post);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 });
  }
}
