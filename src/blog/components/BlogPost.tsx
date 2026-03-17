import React from "react";
import type { BlogLinkComponent } from "../lib/types";
import { fetchBlogPost } from "../lib/api";

const DEFAULT_API_URL =
  process.env.ADMINFAST_API_URL ||
  "https://adminfast-prod-backend-ere5z.ondigitalocean.app";

export interface BlogPostProps {
  appId: string;
  slug: string;
  Link: BlogLinkComponent;
  notFound: () => never;
  apiBaseUrl?: string;
  basePath?: string;
  revalidate?: number;
}

export default async function BlogPost({
  appId,
  slug,
  Link,
  notFound,
  apiBaseUrl = DEFAULT_API_URL,
  basePath = "/blogs",
  revalidate = 300,
}: BlogPostProps) {
  const post = await fetchBlogPost(appId, slug, apiBaseUrl, { revalidate });

  if (!post) {
    notFound();
  }

  const p = post as NonNullable<typeof post>;

  return (
    <article style={{ maxWidth: "768px", margin: "0 auto", padding: "2rem" }}>
      <Link href={basePath} style={{ display: "inline-block", marginBottom: "1rem" }}>
        ← Back to blog
      </Link>

      <h1 style={{ marginBottom: "0.5rem" }}>{p.title}</h1>
      <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1.5rem" }}>
        {p.author.name} ·{" "}
        {new Date(p.publishedAt).toLocaleDateString()}
        {p.tags.length > 0 && ` · ${p.tags.join(", ")}`}
      </div>

      {p.coverImage && (
        <img
          src={p.coverImage}
          alt={p.title}
          style={{ width: "100%", borderRadius: 8, marginBottom: "1.5rem" }}
        />
      )}

      <div
        dangerouslySetInnerHTML={{ __html: p.content }}
        style={{ lineHeight: 1.6 }}
      />
    </article>
  );
}
