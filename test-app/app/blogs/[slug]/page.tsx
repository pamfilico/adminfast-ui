import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPost } from "@pamfilico/adminfast-ui/blog";

const MOCK_API_URL =
  process.env.BLOG_TEST_API_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3007");

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <BlogPost
      appId="test-app"
      slug={slug}
      Link={Link}
      notFound={notFound}
      apiBaseUrl={MOCK_API_URL}
      basePath="/blogs"
    />
  );
}
