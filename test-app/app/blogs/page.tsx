import Link from "next/link";
import { BlogList } from "@pamfilico/adminfast-ui/blog";

const MOCK_API_URL =
  process.env.BLOG_TEST_API_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3007");

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>;
}) {
  const params = await searchParams;
  return (
    <BlogList
      appId="test-app"
      Link={Link}
      searchParams={params}
      apiBaseUrl={MOCK_API_URL}
      basePath="/blogs"
    />
  );
}
