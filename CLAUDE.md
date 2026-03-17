# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@pamfilico/adminfast-ui`, a TypeScript library providing reusable admin panel UI components for Material UI/Next.js applications. The package includes content management components (ContentList, ContentEdit) with multi-locale translation support, 
## Build & Development Commands

```bash
# Build the TypeScript project (outputs to dist/)
npm run build

# Watch mode for development
npm run dev

# Storybook for component development and testing
npm run storybook              # Run Storybook dev server on port 6006
npm run build-storybook        # Build static Storybook (includes GitHub Pages fix)
npm run deploy-storybook       # Deploy to GitHub Pages (gh-pages branch)

# Release workflow (IMPORTANT: use npm-publisher agent)
# When ready to publish, request the npm-publisher agent to handle versioning and publishing
# The agent will guide you through: version bumping, building, publishing to npm, and deploying Storybook
npm run release:patch  # Manual: 1.0.x -> 1.0.(x+1) - for bug fixes
npm run release:minor  # Manual: 1.0.x -> 1.(x+1).0 - for new features
npm run release:major  # Manual: 1.x.x -> (x+1).0.0 - for breaking changes
```

## Architecture

### Package Structure

- **Entry points**:
  - `@pamfilico/adminfast-ui` (main): Exports all components
  - `@pamfilico/adminfast-ui/material`: Direct Material UI component access (server components)
- **Source**: Component code in `src/` directory
- **Build**: TypeScript compiles to `dist/` with declaration files
- **Storybook stories**: Co-located with components
- **Mock API handlers**: `src/mocks/faqHandlers.ts` (MSW configuration for FAQs)
- **Public assets**: `public/mockServiceWorker.js` (MSW service worker)

### Key Components

#### AdminFast Components (New)

1. **ContentList** (`src/content/ContentList.tsx`)
   - Reusable list component for managing content (FAQs, Features, Terms, Privacy)
   - Table display with expand/collapse rows
   - Add/Edit/Delete operations
   - Monaco Editor for markdown content
   - SEO fields management
   - Slug management with dynamic add/remove
   - Click-to-edit navigation
   - Props: `appID`, `contentType`, `title`, `apiEndpoint`

2. **ContentEdit** (`src/content/ContentEdit.tsx`)
   - Reusable edit component for managing content and translations
   - Edit original/base content at the top
   - Accordion list of translations below
   - Translation status indicators (Translated/Not Translated)
   - Individual save buttons for original and each translation
   - Monaco Editor for markdown editing
   - Support for both `description` (FAQs/Features) and `content` (Terms/Privacy) fields
   - Props: `appID`, `contentID`, `contentType`, `title`, `apiEndpoint`, `useContentField`

#### Server Components (SEO-Optimized for Public Pages)

3. **FeaturesServerComponent** (`src/material/server/FeaturesServerComponent.tsx`)
   - Server-side component for rendering features on public-facing pages
   - Fetches data server-side for optimal SEO
   - Includes `fetchFeatures()` helper function for metadata generation
   - Exports TypeScript interfaces: `FeatureItem`, `FeaturesServerComponentProps`
   - Props: `locale`, `appId`, `adminPanelBaseDomain`, `renderComponent`, `revalidate`

4. **FaqsServerComponent** (`src/material/server/FaqsServerComponent.tsx`)
   - Server-side component for rendering FAQs on public-facing pages
   - Fetches data server-side for optimal SEO
   - Includes `fetchFaqs()` helper function for metadata generation
   - Exports TypeScript interfaces: `FaqItem`, `FaqsServerComponentProps`
   - Props: `locale`, `appId`, `adminPanelBaseDomain`, `renderComponent`, `revalidate`

#### SEO Utilities (`src/utils/seo.ts`)

5. **SEO Helper Functions**
   - `generateMetadataFromSeo(data, defaults)` - Generate Next.js Metadata from SEO fields
   - `extractCollectionSeo(items, defaults)` - Generate metadata for collection pages
   - `generateFaqStructuredData(faqs)` - Create FAQ schema.org JSON-LD for rich snippets
   - `generateFeatureStructuredData(features, productName)` - Create Product schema for rich snippets
   - All functions support OpenGraph and Twitter Card metadata
   - **See codespec `docs/check/adminfast-ui-seo-implementation-guide.md` for complete usage examples**

### Technology Stack

- **React 19** / **Next.js 15** (with legacy peer deps for react-canvas-draw compatibility)
- **Material UI v7** (@mui/material, @emotion)
- **Form handling**: Formik + Yup
- **Markdown editing**: Monaco Editor (@monaco-editor/react)
- **Drawing**: react-canvas-draw (dynamically imported to avoid SSR issues)
- **Screenshot**: html-to-image (dynamically imported)
- **HTTP**: axios (peer dependency)
- **Notifications**: react-hot-toast
- **Internationalization**: Built-in i18n system with JSON locale files

### Important Patterns

- **Dynamic imports**: CanvasDraw and html-to-image are imported dynamically with `ssr: false` to prevent Next.js SSR issues
- **"use client"**: Components use "use client" directive for Next.js App Router compatibility
- **Device detection**: Uses MUI's `useMediaQuery` with theme breakpoints
- **Monaco Editor**: Integrated for markdown content editing with minimap disabled and word wrap enabled
- **Translation management**: Built-in support for managing content translations across multiple locales
- **Reusable patterns**: ContentList and ContentEdit are designed to work with any content type by passing different props

### API Contract

**ContentList** expects API endpoints that support:
- **GET /{endpoint}** - List all items
- **POST /{endpoint}** - Create new item (title, description, seo_title, seo_description, seo_keywords, slugs)
- **DELETE /{endpoint}/{id}** - Delete item

**ContentEdit** expects API endpoints that support:
- **GET /{endpoint}/{id}** - Get single item with translations array
- **PUT /{endpoint}/{id}** - Update base item
- **PUT /{endpoint}/{id}/translations/{translation_id}** - Update specific translation

**Key fields**:
- Base content: `title`, `description`, `seo_title`, `seo_description`, `seo_keywords`, `slugs`
- Translation: All base fields plus `is_translated`, `locale_id`, `locale_code`, `locale_description`
- Terms/Privacy use `content` instead of `description` in translations

### Installation Notes

For React 19 / Next.js 15+ projects, requires `--legacy-peer-deps` flag due to `react-canvas-draw` peer dependency constraints (works fine at runtime).

### Storybook & Testing

- **Storybook**: Used for component development and visual testing
- **MSW (Mock Service Worker)**: API mocking configured in `src/mocks/faqHandlers.ts`
- **GitHub Pages**: Storybook deployed to gh-pages branch
- **For complete Storybook setup instructions, see codespec `docs/check/adminfast-ui-storybook-package-setup.md`**

## Development Guidelines

- Maintain "use client" directive in client-side components
- Keep dynamic imports for SSR-incompatible libraries
- Use MUI breakpoints for responsive behavior
- Always include proper TypeScript types for component props
- When creating new content management components, follow the ContentList/ContentEdit pattern
- For publishing new versions, use the npm-publisher agent which handles the complete workflow
- Keep components framework-agnostic where possible (accept data via props, not tight coupling)

## AdminFast Ecosystem

This library is part of the AdminFast ecosystem:
- **AdminFast** - The main admin panel application
- **AdminFast UI** (`@pamfilico/adminfast-ui`) - This component library
- Components are designed to be reusable across different AdminFast implementations
