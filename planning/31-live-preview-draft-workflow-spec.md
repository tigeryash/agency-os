# Live Preview and Draft Workflow Spec

## Goal

Add live preview support and a draft/publish workflow to the Payload CMS starter so content editors can preview changes before publishing. All public-content collections and globals get draft versioning, a side-by-side live preview iframe in the admin, and a new-tab draft preview with an exit banner.

## Approach

Payload-native live preview + Next.js draft mode. Leverages Payload v3's built-in `livePreview` config for the side-by-side iframe, Next.js `draftMode()` for the new-tab preview route, and Payload's native `versions` + `drafts` on all public collections and globals.

## Scope

### In Scope

1. Draft versioning on all public collections (Pages, Services, Posts, ServiceAreas) and globals (SiteSettings, Header, Footer)
2. Side-by-side live preview iframe in the Payload admin panel
3. New-tab draft preview with authenticated access
4. Exit preview banner on the frontend (new-tab flow only)
5. Status field migration from custom `status` to Payload's native `_status` + `archived` boolean
6. Draft-aware data fetching
7. Tests

### Out of Scope

1. Token-based shareable preview links (future Premium tier feature)
2. Globals preview in new-tab flow (live preview iframe covers this)
3. Analytics, pricing, CRM, or branding changes

## Design

### 1. Collection and Global Configuration

Enable `versions` with `drafts` on all four public collections:

```ts
versions: {
  drafts: {
    autosave: true,
    schedulePublish: false, // Requires Payload jobs queue — deferred until needed
    validate: false,        // Intentional: allows saving incomplete drafts
  },
  maxPerDoc: 10,
}
```

Enable `versions` with `drafts: true` on all three globals (SiteSettings, Header, Footer).

### 2. Status Field Migration

**Current state:** All public collections use a custom `status` field with values `draft | published | archived` plus a `publishedAt` timestamp.

**Target state:**

- Remove custom `status` field from `publicationFields`. Payload's `drafts: true` adds its own `_status` field (draft/published) automatically.
- Add `archived` boolean field, defaults to `false`.
- Keep `publishedAt` for display and scheduling.

**Database migration mapping:**

| Old `status` | New `_status` | New `archived` |
|--------------|---------------|----------------|
| `published`  | `published`   | `false`        |
| `archived`   | `published`   | `true`         |
| `draft`      | `draft`       | `false`        |

**Migration mechanism:** Payload migration script in `src/migrations/`. Adds the `archived` column, maps existing `status` values per the table above, then drops the custom `status` column.

**Query update:** `getPublishedWhere()` filters on `_status: 'published'` AND `archived: false` instead of `status: 'published'`.

### 3. Access Control

Each public collection's `read` access becomes draft-aware:

- **Unauthenticated users:** only see `{ _status: { equals: 'published' } }`
- **Authenticated admin users:** see everything (drafts + published)

This ensures draft content is never exposed to the public frontend.

### 4. Live Preview (Side-by-Side Iframe)

Add `livePreview` to the Payload admin config with a dynamic URL resolver:

```ts
admin: {
  livePreview: {
    url: ({ data, collectionConfig, globalConfig }) => {
      const slug = collectionConfig?.slug ?? globalConfig?.slug
      const collectionPathMap: Record<string, string> = {
        pages: data.slug === 'home' ? '/' : `/${data.slug}`,
        services: `/services/${data.slug}`,
        posts: `/blog/${data.slug}`,
        'service-areas': `/service-areas/${data.slug}`,
      }
      // Globals (header, footer, site-settings) all preview on the home page
      if (!collectionConfig) return '/'
      return collectionPathMap[slug ?? ''] || '/'
    },
    collections: ['pages', 'services', 'posts', 'service-areas'],
    globals: ['header', 'footer', 'site-settings'],
  },
}
```

Each frontend page route gets a thin client component wrapper using the `useLivePreview` hook from `@payloadcms/live-preview-react`:

1. Server component fetches initial data (draft-aware when in draft mode)
2. Passes it to a client component that calls `useLivePreview({ initialData, serverURL: process.env.NEXT_PUBLIC_SITE_URL, depth: 2 })`
3. The hook merges real-time changes from the admin iframe via `postMessage`

New dependency: `@payloadcms/live-preview-react`.

### 5. Draft Preview (New Tab)

**Preview route** at `src/app/(frontend)/preview/route.ts`:

1. Receives query params: `path`, `collection`, `slug`, `previewSecret`
2. Validates `previewSecret` against `PREVIEW_SECRET` env var
3. Authenticates the user via `payload.auth({ headers: request.headers })` — returns `{ user }`, must be a logged-in admin
4. Enables Next.js `draftMode()`
5. Redirects to the target path

**Collection admin.preview config:** Each public collection gets a `preview` function generating the URL to this route with appropriate params.

**Exit preview route** at `src/app/(frontend)/preview/exit/route.ts`: Disables `draftMode()` and redirects back.

**Exit preview banner:** A small floating component rendered on the frontend only when `draftMode().isEnabled` is true. Shows "Viewing Draft" with an "Exit Preview" link.

**New env var:** `PREVIEW_SECRET` added to `.env.example` and deployment docs.

### 6. Draft-Aware Data Fetching

Draft-aware queries require **two changes working together**:

1. **Where clause** — relax the filter to include drafts
2. **`draft: true` flag** — pass to `payload.find()` / `payload.findGlobal()` options so Payload returns the latest draft version instead of the latest published version

Without both, Payload returns the published version even if the where clause doesn't filter it out.

**Signature change for `getPublishedWhere()`:** Add a `draft?: boolean` parameter instead of calling `draftMode()` internally. This keeps the function pure and usable in any context. Callers pass `(await draftMode()).isEnabled`.

```ts
// Updated signature
function getPublishedWhere(draft: boolean = false): Where {
  if (draft) return {}  // No filter — fetch latest draft
  return { _status: { equals: 'published' }, archived: { equals: false } }
}
```

Callers then use both the where clause and the draft flag:

```ts
const { isEnabled: isDraft } = await draftMode()
const result = await payload.find({
  collection: 'pages',
  where: getPublishedSlugWhere(slug, isDraft),
  draft: isDraft,
})
```

Update `getPublishedSlugWhere(slug)` similarly to accept a `draft` parameter.

All existing page routes already use these helpers, so they become draft-aware with the parameter addition.

### 7. Frontend Page Route Changes

Each of the four dynamic routes needs:

1. A check for `draftMode().isEnabled`
2. Pass `draft: true` to Payload queries when in draft mode
3. A client component wrapper with `useLivePreview` for live preview support
4. The exit preview banner component when in draft mode

Detail routes affected:
- `src/app/(frontend)/[slug]/page.tsx`
- `src/app/(frontend)/services/[slug]/page.tsx`
- `src/app/(frontend)/blog/[slug]/page.tsx`
- `src/app/(frontend)/service-areas/[slug]/page.tsx`
- `src/app/(frontend)/page.tsx` (home)

Listing routes also affected (use `getPublishedWhere()`, need draft param + exit banner):
- `src/app/(frontend)/services/page.tsx`
- `src/app/(frontend)/blog/page.tsx`
- `src/app/(frontend)/service-areas/page.tsx`

## Testing Strategy

### Unit Tests

- `getPublishedWhere()` returns correct filters for draft mode on/off + archived combinations
- Preview URL generation for each collection produces correct paths
- Access control returns correct constraints for authenticated vs unauthenticated users

### Integration/E2E Tests

- Published page is visible to public
- Draft page is NOT visible to public
- Archived page is NOT visible to public
- Preview route rejects unauthenticated users (403)
- Preview route rejects invalid preview secret (403)
- Preview route enables draft mode and redirects for valid admin user
- Exit preview route disables draft mode
- Draft page is visible when draft mode is enabled

### Not E2E Testable

- Live preview iframe interaction (requires admin panel + postMessage). Client wrapper components can be unit tested with mocked `useLivePreview` to verify correct props.

## New Dependencies

- `@payloadcms/live-preview-react`

## New Environment Variables

- `PREVIEW_SECRET` — shared secret for validating preview route requests

## Summary of Changes

| Area | Change |
|------|--------|
| Collections (Pages, Services, Posts, ServiceAreas) | Add `versions` with `drafts`, `autosave`, `maxPerDoc: 10` |
| Globals (SiteSettings, Header, Footer) | Add `versions` with `drafts: true` |
| Publication fields | Remove custom `status`, add `archived` boolean, keep `publishedAt` |
| Access control | Draft-aware read: public sees `_status: published` + `archived: false` only |
| Payload admin config | Add `livePreview` with dynamic URL resolver |
| Collection admin config | Add `preview` function for new-tab draft preview |
| New route: `/preview` | Validates secret + auth, enables `draftMode()`, redirects |
| New route: `/preview/exit` | Disables `draftMode()`, redirects back |
| Frontend page routes | Add thin client wrappers with `useLivePreview` hook |
| Draft-aware queries | Update `getPublishedWhere(draft)` to accept draft param, filter on `_status` + `archived` |
| Exit preview banner | Floating banner on frontend when `draftMode()` is enabled |
| New dependency | `@payloadcms/live-preview-react` |
| New env var | `PREVIEW_SECRET` |
| DB migration | Map existing `status` values to `_status` + `archived` |

## Explicit Deferrals

- Token-based shareable preview links — future Premium tier feature
- Globals new-tab preview — live preview iframe covers this for now
- Scheduled publishing — requires Payload jobs queue configuration, deferred until needed
