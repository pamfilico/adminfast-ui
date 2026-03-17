# @pamfilico/adminfast-ui

A collection of reusable admin panel UI components for Material UI, designed for rapid development of content management systems.

## Installation

### React 19 / Next.js 15+ Projects

Due to peer dependency constraints with `react-canvas-draw` (which currently supports React 16-17), you need to install with the `--legacy-peer-deps` flag:

```bash
npm install @pamfilico/adminfast-ui --legacy-peer-deps
```

**Note:** The package works perfectly fine with React 19 at runtime. The flag is only needed because `react-canvas-draw` hasn't updated its peer dependency requirements yet.

### React 18 / Next.js 14 Projects

```bash
npm install @pamfilico/adminfast-ui
```

## AdminFastProvider

Wrap your app (or a section) with `AdminFastProvider` to provide shared config to client components via `useAdminFast()`. Server components (BlogList, BlogPost, FAQs, Features) receive config as props from the page.

```tsx
import { AdminFastProvider } from "@pamfilico/adminfast-ui";

export default function RootLayout({ children }) {
  return (
    <AdminFastProvider
      appId="your-app-id"
      apiBaseUrl={process.env.ADMINFAST_API_URL!}
      locale="en"
      revalidate={60}
      blogBasePath="/blogs"
    >
      {children}
    </AdminFastProvider>
  );
}
```

Client components can then use `useAdminFast()` to access `appId`, `apiBaseUrl`, `locale`, etc.

## Quick Start

### Content List Component

```tsx
import { ContentList } from "@pamfilico/adminfast-ui";

function FeaturesPage({ appID }) {
  return (
    <ContentList
      appID={appID}
      contentType="features"
      title="Feature"
      apiEndpoint={`/api/v1/apps/${appID}/features`}
    />
  );
}
```

### Content Edit Component

```tsx
import { ContentEdit } from "@pamfilico/adminfast-ui";

function FeatureEditPage({ appID, featureID }) {
  return (
    <ContentEdit
      appID={appID}
      contentID={featureID}
      contentType="features"
      title="Feature"
      apiEndpoint={`/api/v1/apps/${appID}/features`}
    />
  );
}
```

## Components

### ContentList
A reusable list component for managing content with:
- Table display with expand/collapse rows
- Add/Edit/Delete operations
- Markdown editor for content creation
- SEO fields management
- Slug management
- Click-to-edit navigation

**Props:**
- `appID` - Application ID
- `contentType` - Type of content (e.g., "faqs", "features", "terms", "privacy")
- `title` - Display title for the content type
- `apiEndpoint` - API endpoint for CRUD operations

### ContentEdit
A reusable edit component for managing content and translations:
- Edit original/base content
- Manage translations for multiple locales
- Translation status indicators
- Individual save buttons for each translation
- Monaco Editor for markdown editing
- SEO fields for each translation

**Props:**
- `appID` - Application ID
- `contentID` - Content item ID
- `contentType` - Type of content
- `title` - Display title
- `apiEndpoint` - API endpoint
- `useContentField` - Use 'content' instead of 'description' (for terms/privacy)

### Server Components (SEO-friendly)

Server components for public-facing pages with built-in SEO support:

#### FeaturesServerComponent

```tsx
import { FeaturesServerComponent } from "@pamfilico/adminfast-ui/material";
import { MyFeaturesList } from "./components/MyFeaturesList";

export default function FeaturesPage() {
  return (
    <FeaturesServerComponent
      locale="en"
      appId="your-app-id"
      adminPanelBaseDomain="https://admin.example.com"
      renderComponent={MyFeaturesList}
    />
  );
}
```

#### FaqsServerComponent

```tsx
import { FaqsServerComponent } from "@pamfilico/adminfast-ui/material";
import { MyFaqsList } from "./components/MyFaqsList";

export default function FaqsPage() {
  return (
    <FaqsServerComponent
      locale="en"
      appId="your-app-id"
      adminPanelBaseDomain="https://admin.example.com"
      renderComponent={MyFaqsList}
    />
  );
}
```

### SEO Utilities

Generate Next.js metadata and structured data from your content:

#### Generate Metadata for Feature Pages

```tsx
import { fetchFeatures, generateMetadataFromSeo, generateFeatureStructuredData } from "@pamfilico/adminfast-ui";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const features = await fetchFeatures("en", "your-app-id", "https://admin.example.com");

  return generateMetadataFromSeo(
    features[0],
    { titleSuffix: "| Your App", siteName: "Your App" }
  );
}

export default async function FeaturesPage() {
  const features = await fetchFeatures("en", "your-app-id", "https://admin.example.com");
  const structuredData = generateFeatureStructuredData(features, "Your Product");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Your page content */}
    </>
  );
}
```

#### Generate Metadata for FAQ Pages

```tsx
import { fetchFaqs, extractCollectionSeo, generateFaqStructuredData } from "@pamfilico/adminfast-ui";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const faqs = await fetchFaqs("en", "your-app-id", "https://admin.example.com");

  return extractCollectionSeo(faqs, {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions",
    titleSuffix: "| Your App",
    siteName: "Your App"
  });
}

export default async function FaqsPage() {
  const faqs = await fetchFaqs("en", "your-app-id", "https://admin.example.com");
  const structuredData = generateFaqStructuredData(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Your page content */}
    </>
  );
}
```

**SEO Utilities Available:**
- `generateMetadataFromSeo()` - Generate metadata from a single item
- `extractCollectionSeo()` - Generate metadata from multiple items
- `generateFaqStructuredData()` - Create FAQ schema for rich snippets
- `generateFeatureStructuredData()` - Create product/feature schema
- `StructuredData` component - Helper for injecting JSON-LD

## Features

- 🚀 **Rapid Development** - Pre-built components for common admin panel needs
- 🌍 **Multi-locale Support** - Built-in translation management
- 📝 **Markdown Editor** - Monaco editor integration for rich content
- 🔍 **SEO Optimized** - SEO fields management for all content
- 🎨 **Material UI** - Built on top of Material-UI components
- 📱 **Responsive** - Mobile-friendly designs
- ♿ **Accessible** - WCAG compliant components

## Documentation

Visit our [Storybook documentation](https://pamfilico.github.io/adminfast-ui/) for interactive examples and detailed component documentation.

## License

MIT
