import { Post } from './types';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/posts.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export function getAllPosts(): Post[] {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  const posts: Post[] = JSON.parse(data);
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((p) => p.published);
}

export function getPostsByCategory(category: string): Post[] {
  if (category === 'latest') return getPublishedPosts();
  return getPublishedPosts().filter((p) => p.category === category);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostById(id: string): Post | undefined {
  return getAllPosts().find((p) => p.id === id);
}

export function createPost(post: Post): Post {
  ensureDataFile();
  const posts = getAllPosts();
  posts.push(post);
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  return post;
}

export function updatePost(id: string, updates: Partial<Post>): Post | null {
  ensureDataFile();
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...updates, updatedAt: new Date().toISOString() };
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  return posts[index];
}

export function deletePost(id: string): boolean {
  ensureDataFile();
  const posts = getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
