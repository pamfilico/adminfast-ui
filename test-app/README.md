# Blog Test App

Test Next.js app for `@pamfilico/adminfast-ui` blog components. Uses mocked data served by local API routes. Wraps the app with `AdminFastProvider` for shared config (appId, apiBaseUrl, locale).

## Run

From the `adminfast-ui` package root:

```bash
npm run test-app:dev
```

This builds the package, installs test-app deps, and starts the dev server on http://localhost:3007.

## Override Data Source

The `apiBaseUrl` prop on `BlogList` and `BlogPost` overrides where data is fetched from. By default, the test app uses its own mock API at `http://localhost:3007/api/blogs`.

To point at a different API (e.g. real AdminFast backend):

1. Set the `BLOG_TEST_API_URL` env var in `test-app/.env.local`:
   ```
   BLOG_TEST_API_URL=https://your-adminfast-api.example.com
   ```

2. Or pass `apiBaseUrl` explicitly in the page components.

## Mock Data

Mock posts are defined in `mocks/blogData.ts`. API routes in `app/api/blogs/[appId]/` serve this data and match the spec contract:

- `GET /api/blogs/:appId` - paginated list
- `GET /api/blogs/:appId/:slug` - single post
- `GET /api/blogs/:appId/slugs` - all slugs
