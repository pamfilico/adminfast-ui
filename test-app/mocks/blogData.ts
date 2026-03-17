/**
 * Mock blog data for testing - matches spec API contract
 */

export const mockPosts = [
  {
    id: "post-1",
    slug: "how-to-rent-a-car",
    title: "How to Rent a Car",
    excerpt: "A short guide to renting your first car. Everything you need to know before you hit the road.",
    coverImage: "https://placehold.co/800x400?text=Car+Rental",
    author: { name: "Georgios", avatar: "https://placehold.co/64?text=G" },
    tags: ["guide", "rental"],
    publishedAt: "2026-03-01T12:00:00Z",
    updatedAt: "2026-03-10T08:00:00Z",
  },
  {
    id: "post-2",
    slug: "top-destinations-2026",
    title: "Top Destinations for 2026",
    excerpt: "Discover the most popular travel destinations for the coming year. From beaches to mountains.",
    coverImage: "https://placehold.co/800x400?text=Destinations",
    author: { name: "Maria", avatar: "https://placehold.co/64?text=M" },
    tags: ["travel", "destinations"],
    publishedAt: "2026-03-05T09:00:00Z",
    updatedAt: "2026-03-12T14:00:00Z",
  },
  {
    id: "post-3",
    slug: "road-trip-tips",
    title: "Essential Road Trip Tips",
    excerpt: "Planning a long drive? Here are our top tips for a smooth and enjoyable road trip experience.",
    coverImage: null,
    author: { name: "Admin" },
    tags: ["guide", "road-trip"],
    publishedAt: "2026-03-08T11:00:00Z",
    updatedAt: "2026-03-08T11:00:00Z",
  },
];

export const mockPostFull: Record<string, { content: string; seo?: Record<string, string> }> = {
  "how-to-rent-a-car": {
    content: `
      <p>Renting a car doesn't have to be complicated. Follow these simple steps to get on the road quickly.</p>
      <h2>1. Choose Your Vehicle</h2>
      <p>Consider the size of your group and the type of terrain you'll be driving on.</p>
      <h2>2. Compare Prices</h2>
      <p>Shop around and check for hidden fees like insurance and fuel policies.</p>
      <h2>3. Inspect Before You Drive</h2>
      <p>Document any existing damage to avoid being charged later.</p>
    `,
    seo: {
      metaTitle: "How to Rent a Car | CarFast",
      metaDescription: "Everything you need to know about renting a car for your next trip.",
      ogImage: "https://placehold.co/1200x630?text=Car+Rental",
    },
  },
  "top-destinations-2026": {
    content: `
      <p>2026 is shaping up to be an exciting year for travel. Here are the destinations trending now.</p>
      <ul>
        <li>Coastal retreats in Southern Europe</li>
        <li>Mountain escapes in the Alps</li>
        <li>Cultural hubs in Asia</li>
      </ul>
    `,
    seo: {
      metaTitle: "Top Destinations 2026 | CarFast",
      metaDescription: "Discover the most popular travel destinations for 2026.",
    },
  },
  "road-trip-tips": {
    content: `
      <p>Before you head out on the open road, make sure you're prepared.</p>
      <blockquote>Always pack snacks and water. You never know when you'll need them.</blockquote>
      <p>Check your vehicle's fluids and tire pressure. Plan your rest stops in advance.</p>
    `,
  },
};
