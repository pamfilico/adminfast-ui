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

### Material UI Feedback Button (Legacy)

The package also includes the original feedback components:

```tsx
import { MaterialFeedbackButton } from "@pamfilico/adminfast-ui/material";

export default function MyApp() {
  return (
    <>
      {/* Your app content */}
      <MaterialFeedbackButton
        meta={{ user_email: "user@example.com", visitor_id: "abc123" }}
        apiBasePath="/api/v1/feedback"
        additionalHeaders={{ "Authorization": "Bearer token" }}
      />
    </>
  );
}
```

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
