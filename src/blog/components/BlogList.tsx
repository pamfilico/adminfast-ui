import React from "react";
import type { BlogPostSummary } from "../lib/types";
import type { BlogLinkComponent } from "../lib/types";
import { fetchBlogList } from "../lib/api";

const DEFAULT_API_URL =
  process.env.ADMINFAST_API_URL ||
  "https://adminfast-prod-backend-ere5z.ondigitalocean.app";

export interface BlogListProps {
  appId: string;
  Link: BlogLinkComponent;
  searchParams?: { page?: string; tag?: string };
  apiBaseUrl?: string;
  basePath?: string;
  postsPerPage?: number;
  revalidate?: number;
}

export default async function BlogList({
  appId,
  Link,
  searchParams = {},
  apiBaseUrl = DEFAULT_API_URL,
  basePath = "/blogs",
  postsPerPage = 20,
  revalidate = 60,
}: BlogListProps) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  const tag = searchParams.tag;

  const { posts, pagination } = await fetchBlogList(appId, apiBaseUrl, {
    page,
    pageSize: postsPerPage,
    tag,
    revalidate,
  });

  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Blog</h1>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            basePath={basePath}
            Link={Link}
          />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <nav style={{ marginTop: "2rem", display: "flex", gap: "0.5rem" }}>
          {page > 1 && (
            <Link
              href={`${basePath}?page=${page - 1}${tag ? `&tag=${tag}` : ""}`}
            >
              Previous
            </Link>
          )}
          <span>
            Page {page} of {pagination.totalPages}
          </span>
          {page < pagination.totalPages && (
            <Link
              href={`${basePath}?page=${page + 1}${tag ? `&tag=${tag}` : ""}`}
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

function BlogCard({
  post,
  basePath,
  Link,
}: {
  post: BlogPostSummary;
  basePath: string;
  Link: BlogLinkComponent;
}) {
  return (
    <article
      style={{ border: "1px solid #eee", borderRadius: 8, padding: "1rem" }}
    >
      <Link href={`${basePath}/${post.slug}`}>
        <h2 style={{ margin: "0 0 0.5rem" }}>{post.title}</h2>
      </Link>
      <p style={{ color: "#666", fontSize: "0.9rem", margin: 0 }}>
        {post.excerpt}
      </p>
      <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#888" }}>
        {post.author.name} · {new Date(post.publishedAt).toLocaleDateString()}
        {post.tags.length > 0 && ` · ${post.tags.join(", ")}`}
      </div>
    </article>
  );
}
