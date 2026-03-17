import type { AdminFastLinkComponent } from "../../provider/types";

export type { AdminFastLinkComponent as BlogLinkComponent };

export interface BlogAuthor {
  name: string;
  avatar?: string;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  author: BlogAuthor;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
}

export interface BlogPostFull extends BlogPostSummary {
  content: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string | null;
  };
}

export interface BlogListResponse {
  posts: BlogPostSummary[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalPosts: number;
  };
}

export interface BlogSlugsResponse {
  slugs: Array<{ slug: string; updatedAt: string }>;
}
