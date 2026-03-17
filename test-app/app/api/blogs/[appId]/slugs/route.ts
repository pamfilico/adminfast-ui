import { NextRequest } from "next/server";
import { mockPosts } from "../../../../../mocks/blogData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  const slugs = mockPosts.map((p) => ({
    slug: p.slug,
    updatedAt: p.updatedAt,
  }));

  return Response.json({ slugs });
}
