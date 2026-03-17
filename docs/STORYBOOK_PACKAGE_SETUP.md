# Storybook Package Setup Guide

This document describes the complete Storybook setup for this package, including MSW (Mock Service Worker) integration and GitHub Pages deployment. This configuration allows you to develop, test, and showcase components with mocked API responses.

For general project architecture and development guidelines, see [CLAUDE.md](../CLAUDE.md).

## Table of Contents

1. [Dependencies](#dependencies)
2. [Configuration Files](#configuration-files)
3. [MSW Setup](#msw-setup)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Complete Setup Commands](#complete-setup-commands)

---

## Dependencies

### Required npm Packages

Add these to your `package.json`:

```json
{
  "devDependencies": {
    "@chromatic-com/storybook": "^4.1.1",
    "@storybook/addon-a11y": "^9.1.10",
    "@storybook/addon-docs": "^9.1.10",
    "@storybook/addon-onboarding": "^9.1.10",
    "@storybook/addon-vitest": "^9.1.10",
    "@storybook/blocks": "^8.6.14",
    "@storybook/nextjs": "^9.1.10",
    "gh-pages": "^6.3.0",
    "msw": "^2.11.3",
    "msw-storybook-addon": "^2.0.5",
    "storybook": "^9.1.10"
  },
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build && node .storybook/fix-github-pages.js",
    "deploy-storybook": "npm run build-storybook && gh-pages -d storybook-static -b gh-pages --dotfiles"
  },
  "msw": {
    "workerDirectory": ["public"]
  }
}
```

### Installation Steps

```bash
# Initialize Storybook for Next.js
npx storybook@latest init

# Install MSW and adapter
npm install --save-dev msw msw-storybook-addon

# Initialize MSW service worker
npx msw init public/

# Install GitHub Pages deployment tool
npm install --save-dev gh-pages
```

---

## Configuration Files

### 1. `.storybook/main.ts`

Main Storybook configuration file:

```typescript
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": ["../public"],
};
export default config;
```

**Key Points:**
- Uses `@storybook/nextjs` framework for Next.js compatibility
- Stories co-located with components in `src/`
- `staticDirs` includes `public/` for MSW service worker access

### 2. `.storybook/preview.tsx`

Preview configuration with MUI theme and MSW integration:

```typescript
import type { Preview } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { initialize, mswLoader } from 'msw-storybook-addon';
import React from 'react';

// Initialize MSW with correct service worker path
// Detect if running on GitHub Pages by checking the pathname
const isGitHubPages = typeof window !== 'undefined' && window.location.pathname.startsWith('/adminfast-ui');
initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: isGitHubPages ? '/adminfast-ui/mockServiceWorker.js' : '/mockServiceWorker.js',
  },
});

// Create Material-UI theme
const theme = createTheme();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-center" />
        <Story />
      </ThemeProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
```

**Key Points:**
- MSW initialization with GitHub Pages path detection
- Material-UI theme provider wraps all stories
- `react-hot-toast` Toaster included for notifications
- `mswLoader` enables MSW in all stories

### 3. `.storybook/fix-github-pages.js`

Post-build script to fix GitHub Pages compatibility:

```javascript
const fs = require('fs');
const path = require('path');

const storybookStaticPath = path.join(__dirname, '..', 'storybook-static');

// Add .nojekyll file to bypass Jekyll processing
fs.writeFileSync(path.join(storybookStaticPath, '.nojekyll'), '');
console.log('Created .nojekyll file');

// Fix MSW service worker preload path in iframe.html
const iframeHtmlPath = path.join(storybookStaticPath, 'iframe.html');
let iframeHtml = fs.readFileSync(iframeHtmlPath, 'utf8');
iframeHtml = iframeHtml.replace(
  /<link rel="preload" href="\/mockServiceWorker\.js" as="script">/g,
  '<link rel="preload" href="./mockServiceWorker.js" as="script">'
);
fs.writeFileSync(iframeHtmlPath, iframeHtml);
console.log('Fixed MSW service worker preload path in iframe.html');

console.log('GitHub Pages setup complete');
```

**Purpose:**
- Creates `.nojekyll` to prevent GitHub Pages from processing files
- Fixes absolute paths to relative paths for MSW service worker
- Automatically runs after `storybook build`

---

## MSW Setup

### 1. Create Mock Handlers

Create `src/mocks/faqHandlers.ts` (or similar):

```typescript
import { http, HttpResponse } from "msw";

export const mockFaqItems = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    translation_id: "faq-trans-1",
    title: "How do I get started?",
    description: "Getting started is easy! Simply sign up for an account and follow our onboarding guide.",
    seo_title: "Getting Started Guide",
    seo_description: "Learn how to get started",
    seo_keywords: "getting started, onboarding",
    is_translated: true,
    locale_code: "en",
  },
  // Add more mock items as needed
];

export const faqHandlers = [
  http.get("*/api/v1/apps/:appId/faqs/locale/:locale", async ({ params }) => {
    const { locale } = params;
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json({
      success: true,
      data: mockFaqItems.map((item) => ({ ...item, locale_code: locale })),
    });
  }),
];
```

### 2. Initialize MSW in Storybook

The MSW initialization in `.storybook/preview.tsx` handles:
- Detecting GitHub Pages deployment (checks for `/adminfast-ui` path prefix)
- Adjusting service worker URL accordingly
- Loading handlers via `mswLoader`

### 3. Using MSW in Stories

Stories can pass handlers via `parameters.msw.handlers`:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { faqHandlers } from "../mocks/faqHandlers";

const meta: Meta<typeof MyComponent> = {
  title: "Material/MyComponent",
  component: MyComponent,
  parameters: {
    layout: "fullscreen",
    msw: { handlers: faqHandlers },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

---

## GitHub Pages Deployment

### Setup GitHub Repository

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`
   - Save

2. **Configure Base Path (if needed):**

   If your Storybook is deployed to `https://username.github.io/repo-name/`, the base path is `/repo-name`.

   The preview configuration automatically detects this and adjusts the MSW service worker path.

### Deploy Commands

```bash
# Build Storybook with GitHub Pages fixes
npm run build-storybook

# Deploy to GitHub Pages (gh-pages branch)
npm run deploy-storybook
```

The `deploy-storybook` script:
1. Builds Storybook static site
2. Runs `fix-github-pages.js` to fix paths
3. Pushes `storybook-static/` to `gh-pages` branch
4. Includes dotfiles (`.nojekyll`)

### Verify Deployment

After deployment, visit:
- `https://username.github.io/repo-name/` (with base path)
- `https://username.github.io/` (without base path)

Check browser console for MSW registration:
```
[MSW] Mocking enabled.
```

---

## Complete Setup Commands

### Fresh Installation

```bash
# 1. Install dependencies
npm install

# 2. Initialize MSW service worker
npx msw init public/

# 3. Run Storybook locally
npm run storybook

# 4. Build and deploy to GitHub Pages
npm run deploy-storybook
```

### Development Workflow

```bash
# Run Storybook locally (hot reload enabled)
npm run storybook

# Test build locally
npm run build-storybook
npx http-server storybook-static

# Deploy to GitHub Pages
npm run deploy-storybook
```

### Troubleshooting

**MSW not working in GitHub Pages:**
- Check that `.nojekyll` exists in deployed site
- Verify service worker URL in browser DevTools → Network tab
- Check console for MSW registration errors

**Stories not loading:**
- Ensure mock data matches the expected API response shape
- Verify handler paths match the API URLs your components call

**Build failures:**
- Clear `node_modules` and reinstall
- Check TypeScript errors: `npm run build`
- Verify all peer dependencies installed

---

## File Structure Summary

```
.storybook/
├── main.ts                    # Storybook configuration
├── preview.tsx                # MSW + MUI theme setup
└── fix-github-pages.js        # Post-build GitHub Pages fix

src/
├── material/
│   ├── Component.tsx
│   └── Component.stories.tsx  # Stories co-located with components
└── mocks/
    └── faqHandlers.ts         # MSW mock API handlers

public/
└── mockServiceWorker.js       # MSW service worker (generated)

storybook-static/              # Build output (gitignored)
└── .nojekyll                  # Created by fix script
```

---

## Additional Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [MSW Documentation](https://mswjs.io/docs/)
- [MSW Storybook Addon](https://github.com/mswjs/msw-storybook-addon)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Last Updated:** 2025-10-07
**Related:** [CLAUDE.md](../CLAUDE.md)
