/**
 * Blog API client - fetches from configurable base URL
 */

import type { BlogListResponse, BlogPostFull, BlogSlugsResponse } from './types';

export async function fetchBlogList(
  appId: string,
  apiBaseUrl: string,
  options?: {
    page?: number;
    pageSize?: number;
    tag?: string;
    sort?: 'asc' | 'desc';
    revalidate?: number;
  }
): Promise<BlogListResponse> {
  const params = new URLSearchParams();
  if (options?.page) params.set('page', String(options.page));
  if (options?.pageSize) params.set('pageSize', String(options.pageSize));
  if (options?.tag) params.set('tag', options.tag);
  if (options?.sort) params.set('sort', options.sort);

  const url = `${apiBaseUrl.replace(/\/$/, '')}/api/blogs/${appId}${params.toString() ? `?${params}` : ''}`;
  const res = await fetch(url, {
    next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blog list: ${res.status}`);
  }

  return res.json();
}

export async function fetchBlogPost(
  appId: string,
  slug: string,
  apiBaseUrl: string,
  options?: { revalidate?: number }
): Promise<BlogPostFull | null> {
  const url = `${apiBaseUrl.replace(/\/$/, '')}/api/blogs/${appId}/${encodeURIComponent(slug)}`;
  const res = await fetch(url, {
    next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch blog post: ${res.status}`);

  return res.json();
}

export async function fetchBlogSlugs(
  appId: string,
  apiBaseUrl: string,
  options?: { revalidate?: number }
): Promise<BlogSlugsResponse> {
  const url = `${apiBaseUrl.replace(/\/$/, '')}/api/blogs/${appId}/slugs`;
  const res = await fetch(url, {
    next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
  });

  if (!res.ok) throw new Error(`Failed to fetch blog slugs: ${res.status}`);

  return res.json();
}
