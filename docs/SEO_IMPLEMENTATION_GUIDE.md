# SEO Implementation Guide for adminfast-ui

This guide shows how to implement full SEO support in a Next.js app using adminfast-ui server components.

## Table of Contents
1. [Root Layout Configuration](#root-layout-configuration)
2. [Page-Level Metadata](#page-level-metadata)
3. [Structured Data (JSON-LD)](#structured-data-json-ld)
4. [Complete Example](#complete-example)

---

## Root Layout Configuration

Your root `layout.tsx` should configure site-wide SEO defaults.

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourapp.com"),
  title: {
    default: "Your App Name",
    template: "%s | Your App Name",
  },
  description: "Your app description for search engines",
  keywords: ["keyword1", "keyword2", "keyword3"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourapp.com",
    siteName: "Your App Name",
    title: "Your App Name",
    description: "Your app description for search engines",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your App Name",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your App Name",
    description: "Your app description for search engines",
    creator: "@yourtwitterhandle",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## Page-Level Metadata

### Features Page

```tsx
// app/features/page.tsx
import type { Metadata } from "next";
import {
  fetchFeatures,
  extractCollectionSeo,
  generateFeatureStructuredData
} from "@pamfilico/adminfast-ui";

const ADMIN_DOMAIN = process.env.NEXT_PUBLIC_ADMIN_DOMAIN!;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID!;

export async function generateMetadata(): Promise<Metadata> {
  const features = await fetchFeatures("en", APP_ID, ADMIN_DOMAIN);

  if (features.length === 0) {
    return {
      title: "Features",
      description: "Discover our amazing features",
    };
  }

  return extractCollectionSeo(features, {
    title: "Features",
    description: "Discover our amazing features",
    titleSuffix: "| Your App",
    siteName: "Your App",
  });
}

export default async function FeaturesPage() {
  const features = await fetchFeatures("en", APP_ID, ADMIN_DOMAIN);
  const structuredData = generateFeatureStructuredData(features, "Your Product");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <h1>Features</h1>
        <ul>
          {features.map((feature) => (
            <li key={feature.id}>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
```

### FAQ Page

```tsx
// app/faqs/page.tsx
import type { Metadata } from "next";
import {
  fetchFaqs,
  extractCollectionSeo,
  generateFaqStructuredData
} from "@pamfilico/adminfast-ui";

const ADMIN_DOMAIN = process.env.NEXT_PUBLIC_ADMIN_DOMAIN!;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID!;

export async function generateMetadata(): Promise<Metadata> {
  const faqs = await fetchFaqs("en", APP_ID, ADMIN_DOMAIN);

  if (faqs.length === 0) {
    return {
      title: "FAQs",
      description: "Frequently Asked Questions",
    };
  }

  return extractCollectionSeo(faqs, {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our product",
    titleSuffix: "| Your App",
    siteName: "Your App",
  });
}

export default async function FaqsPage() {
  const faqs = await fetchFaqs("en", APP_ID, ADMIN_DOMAIN);
  const structuredData = generateFaqStructuredData(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq) => (
          <article key={faq.id}>
            <h2>{faq.title}</h2>
            <p>{faq.description}</p>
          </article>
        ))}
      </main>
    </>
  );
}
```

### Individual Feature/FAQ Page

```tsx
// app/features/[id]/page.tsx
import type { Metadata } from "next";
import { generateMetadataFromSeo } from "@pamfilico/adminfast-ui";

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  // Fetch individual feature
  const response = await fetch(
    `${ADMIN_DOMAIN}/api/v1/apps/${APP_ID}/features/locale/en/${params.id}`
  );
  const { data: feature } = await response.json();

  return generateMetadataFromSeo(feature, {
    titleSuffix: "| Your App",
    siteName: "Your App",
  });
}

export default async function FeaturePage({
  params
}: {
  params: { id: string }
}) {
  // Fetch and render individual feature
  // ...
}
```

---

## Structured Data (JSON-LD)

### Why Structured Data?
Structured data helps search engines understand your content and display rich results (rich snippets) in search results.

### Available Structured Data Generators

#### 1. FAQ Structured Data
```tsx
import { generateFaqStructuredData } from "@pamfilico/adminfast-ui";

const faqs = await fetchFaqs("en", APP_ID, ADMIN_DOMAIN);
const structuredData = generateFaqStructuredData(faqs);

// Output example:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is this product?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This product is..."
      }
    }
  ]
}
```

#### 2. Product/Feature Structured Data
```tsx
import { generateFeatureStructuredData } from "@pamfilico/adminfast-ui";

const features = await fetchFeatures("en", APP_ID, ADMIN_DOMAIN);
const structuredData = generateFeatureStructuredData(features, "Your Product Name");

// Output example:
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Your Product Name",
  "description": "Feature 1, Feature 2, Feature 3",
  "featureList": ["Feature 1", "Feature 2", "Feature 3"]
}
```

---

## Complete Example

Here's a complete, production-ready example combining all SEO best practices:

```tsx
// app/features/page.tsx
import type { Metadata } from "next";
import {
  fetchFeatures,
  extractCollectionSeo,
  generateFeatureStructuredData
} from "@pamfilico/adminfast-ui";
import { notFound } from "next/navigation";

const ADMIN_DOMAIN = process.env.NEXT_PUBLIC_ADMIN_DOMAIN!;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID!;

// Generate SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const features = await fetchFeatures("en", APP_ID, ADMIN_DOMAIN);

    if (features.length === 0) {
      return {
        title: "Features",
        description: "Discover our amazing features",
      };
    }

    const metadata = extractCollectionSeo(features, {
      title: "Features",
      description: "Discover our amazing features that make your life easier",
      titleSuffix: "| Your App",
      siteName: "Your App",
    });

    // Add canonical URL
    return {
      ...metadata,
      alternates: {
        canonical: "https://yourapp.com/features",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Features",
      description: "Discover our features",
    };
  }
}

export default async function FeaturesPage() {
  let features;

  try {
    features = await fetchFeatures("en", APP_ID, ADMIN_DOMAIN);
  } catch (error) {
    console.error("Error fetching features:", error);
    notFound();
  }

  if (features.length === 0) {
    return (
      <main>
        <h1>No Features Available</h1>
        <p>Check back soon for new features!</p>
      </main>
    );
  }

  const structuredData = generateFeatureStructuredData(features, "Your Product");

  return (
    <>
      {/* Structured Data for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Semantic HTML for SEO */}
      <main>
        <header>
          <h1>Product Features</h1>
          <p>Discover what makes our product amazing</p>
        </header>

        <section>
          {features.map((feature) => (
            <article key={feature.id}>
              <h2>{feature.seo_title || feature.title}</h2>
              <p>{feature.seo_description || feature.description}</p>

              {/* Use semantic HTML */}
              <div dangerouslySetInnerHTML={{ __html: feature.description }} />
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour
```

---

## Environment Variables

Add these to your `.env.local`:

```bash
NEXT_PUBLIC_ADMIN_DOMAIN=https://admin.yourapp.com
NEXT_PUBLIC_APP_ID=your-app-id-here
```

---

## SEO Checklist

- [ ] Root layout configured with site-wide metadata
- [ ] `metadataBase` set for absolute URLs
- [ ] Page-level `generateMetadata()` functions added
- [ ] Structured data (JSON-LD) added to relevant pages
- [ ] Semantic HTML used (h1, h2, article, section, etc.)
- [ ] Canonical URLs set
- [ ] Open Graph images configured
- [ ] Twitter Card metadata included
- [ ] robots.txt configured
- [ ] sitemap.xml generated

---

## Testing SEO

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Validator**: https://validator.schema.org/
3. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
5. **Lighthouse SEO Audit**: Chrome DevTools > Lighthouse > SEO

---

## Additional Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
