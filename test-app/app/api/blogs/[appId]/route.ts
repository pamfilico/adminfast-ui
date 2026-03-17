import { NextRequest } from "next/server";
import { mockPosts } from "../../../../mocks/blogData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  const { appId } = await params;
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10)));
  const tag = searchParams.get("tag");

  let filtered = mockPosts;
  if (tag) {
    filtered = mockPosts.filter((p) => p.tags.includes(tag));
  }

  const totalPosts = filtered.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const start = (page - 1) * pageSize;
  const posts = filtered.slice(start, start + pageSize);

  return Response.json({
    posts,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalPosts,
    },
  });
}
