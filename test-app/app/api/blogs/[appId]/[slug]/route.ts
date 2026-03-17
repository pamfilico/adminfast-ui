import { NextRequest } from "next/server";
import { mockPosts, mockPostFull } from "../../../../../mocks/blogData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ appId: string; slug: string }> }
) {
  const { appId, slug } = await params;

  const summary = mockPosts.find((p) => p.slug === slug);
  if (!summary) {
    return new Response(null, { status: 404 });
  }

  const full = mockPostFull[slug];
  const content = full?.content ?? `<p>Content for ${summary.title}</p>`;
  const seo = full?.seo;

  return Response.json({
    ...summary,
    content,
    seo: seo
      ? {
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          ogImage: seo.ogImage,
          canonicalUrl: null,
        }
      : undefined,
  });
}
