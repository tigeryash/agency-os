# Live Preview and Draft Workflow Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Payload v3 live preview, draft versioning, and a new-tab preview workflow to all public-content collections and globals.

**Architecture:** Enable Payload-native `versions` + `drafts` on collections/globals, wire the admin `livePreview` iframe via `@payloadcms/live-preview-react`, and add Next.js `draftMode()` routes for new-tab preview. Migrate the custom `status` field to Payload's native `_status` + an `archived` boolean.

**Tech Stack:** Payload CMS v3, Next.js 15 (App Router), `@payloadcms/live-preview-react`, Vitest, Playwright

**Spec:** `planning/31-live-preview-draft-workflow-spec.md`

---

## File Structure

### New Files
- `src/app/(frontend)/preview/route.ts` — preview route handler (enables draft mode)
- `src/app/(frontend)/preview/exit/route.ts` — exit preview route handler
- `src/components/PreviewBanner.tsx` — floating exit-preview banner
- `src/components/LivePreviewWrapper.tsx` — shared client component with `useLivePreview` hook
- `src/tests/lib/payload.test.ts` — unit tests for draft-aware query helpers
- `src/tests/lib/previewUrl.test.ts` — unit tests for preview URL generation
- `src/tests/lib/accessControl.test.ts` — unit tests for draft-aware access control
- `e2e/preview.spec.ts` — E2E tests for preview routes and draft visibility

### Modified Files
- `package.json` — add `@payloadcms/live-preview-react`
- `.env.example` — add `PREVIEW_SECRET`
- `payload.config.ts` — add `livePreview` config
- `src/payload/fields/publicationFields.ts` — remove `status`, add `archived`
- `src/payload/collections/Pages.ts` — add `versions`, `drafts`, `access`, `admin.preview`
- `src/payload/collections/Services.ts` — same
- `src/payload/collections/Posts.ts` — same
- `src/payload/collections/ServiceAreas.ts` — same
- `src/payload/globals/SiteSettings.ts` — add `versions` with `drafts`
- `src/payload/globals/Header.ts` — same
- `src/payload/globals/Footer.ts` — same
- `src/lib/payload.ts` — draft-aware `getPublishedWhere(draft)` and `getPublishedSlugWhere(slug, draft)`
- `src/app/(frontend)/page.tsx` — draft-aware + live preview wrapper
- `src/app/(frontend)/[slug]/page.tsx` — same
- `src/app/(frontend)/services/page.tsx` — draft-aware + preview banner
- `src/app/(frontend)/services/[slug]/page.tsx` — draft-aware + live preview wrapper
- `src/app/(frontend)/blog/page.tsx` — draft-aware + preview banner
- `src/app/(frontend)/blog/[slug]/page.tsx` — draft-aware + live preview wrapper
- `src/app/(frontend)/service-areas/page.tsx` — draft-aware + preview banner
- `src/app/(frontend)/service-areas/[slug]/page.tsx` — draft-aware + live preview wrapper
- `src/app/sitemap.ts` — use updated `getPublishedWhere(false)`
- `src/components/blocks/BlogPreviewBlock.tsx` — use updated `getPublishedWhere(false)`

---

## Chunk 1: Shared Infrastructure

### Task 1: Install dependency and add env var

**Files:**
- Modify: `package.json`
- Modify: `.env.example`

- [ ] **Step 1: Install `@payloadcms/live-preview-react`**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun add @payloadcms/live-preview-react`
Expected: Package added to `package.json` dependencies

- [ ] **Step 2: Add `PREVIEW_SECRET` to `.env.example`**

Add to `.env.example`:
```
# Preview (draft mode)
PREVIEW_SECRET=replace-with-a-random-secret
```

- [ ] **Step 3: Add `PREVIEW_SECRET` to local `.env`**

Run: `echo '\nPREVIEW_SECRET=dev-preview-secret' >> .env`

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lockb .env.example
git commit -m "feat: add @payloadcms/live-preview-react and PREVIEW_SECRET env var"
```

---

### Task 2: Update publication fields (remove status, add archived)

**Files:**
- Modify: `src/payload/fields/publicationFields.ts`
- Test: `src/tests/lib/payload.test.ts` (created in Task 3)

- [ ] **Step 1: Update `publicationFields.ts`**

Replace the full contents of `src/payload/fields/publicationFields.ts` with:

```ts
import type { Field } from 'payload'

export const publicationFields: Field[] = [
  {
    name: 'publishedAt',
    type: 'date',
    admin: {
      position: 'sidebar',
      date: {
        pickerAppearance: 'dayAndTime',
      },
      description: 'When this content was or will be published.',
    },
  },
  {
    name: 'archived',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      position: 'sidebar',
      description: 'Archived content is hidden from the frontend but remains published in the version history.',
    },
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/payload/fields/publicationFields.ts
git commit -m "feat: replace custom status field with archived boolean for draft workflow"
```

---

### Task 3: Update query helpers (draft-aware)

**Files:**
- Modify: `src/lib/payload.ts`
- Create: `src/tests/lib/payload.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/tests/lib/payload.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getPublishedWhere, getPublishedSlugWhere } from '@/lib/payload'

describe('getPublishedWhere', () => {
  it('returns published + not-archived + publishedAt filter when draft is false', () => {
    const where = getPublishedWhere(false)
    expect(where).toHaveProperty('and')
    const conditions = (where as any).and
    expect(conditions).toContainEqual({ _status: { equals: 'published' } })
    expect(conditions).toContainEqual({ archived: { equals: false } })
    // Should include publishedAt date-gating
    const publishedAtCondition = conditions.find((c: any) => c.or)
    expect(publishedAtCondition).toBeTruthy()
  })

  it('returns published + not-archived + publishedAt filter when draft is omitted', () => {
    const where = getPublishedWhere()
    expect(where).toHaveProperty('and')
  })

  it('returns empty filter when draft is true', () => {
    const where = getPublishedWhere(true)
    expect(where).toEqual({})
  })
})

describe('getPublishedSlugWhere', () => {
  it('returns slug + published filter when draft is false', () => {
    const where = getPublishedSlugWhere('about', false)
    const conditions = (where as any).and
    expect(conditions).toContainEqual({ slug: { equals: 'about' } })
    expect(conditions).toContainEqual({ _status: { equals: 'published' } })
    expect(conditions).toContainEqual({ archived: { equals: false } })
  })

  it('returns slug-only filter when draft is true', () => {
    const where = getPublishedSlugWhere('about', true)
    expect(where).toEqual({
      slug: { equals: 'about' },
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run vitest run src/tests/lib/payload.test.ts`
Expected: FAIL — current signatures don't accept `draft` parameter, and field names are `status` not `_status`

- [ ] **Step 3: Update `src/lib/payload.ts`**

Update the existing file (preserving import style) to:

```ts
import { getPayload, type Where } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export function getPublishedWhere(draft: boolean = false): Where {
  if (draft) return {}
  return {
    and: [
      { _status: { equals: 'published' } } as Where,
      { archived: { equals: false } } as Where,
      {
        or: [
          { publishedAt: { less_than_equal: new Date().toISOString() } } as Where,
          { publishedAt: { exists: false } } as Where,
        ],
      } as Where,
    ],
  }
}

export function getPublishedSlugWhere(slug: string, draft: boolean = false): Where {
  if (draft) {
    return { slug: { equals: slug } }
  }
  return {
    and: [
      { slug: { equals: slug } } as Where,
      ...((getPublishedWhere(false) as any).and || []),
    ],
  }
}
```

Note: The `publishedAt` date-gating filter is preserved from the original implementation. Content with a future `publishedAt` date remains hidden from the public frontend.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run vitest run src/tests/lib/payload.test.ts`
Expected: PASS — all 5 tests green

- [ ] **Step 5: Commit**

```bash
git add src/lib/payload.ts src/tests/lib/payload.test.ts
git commit -m "feat: make query helpers draft-aware with _status and archived fields"
```

---

### Task 4: Draft-aware access control helper

**Files:**
- Create: `src/payload/access/publishedOrAuthenticated.ts`
- Create: `src/tests/lib/accessControl.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/tests/lib/accessControl.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { publishedOrAuthenticated } from '@/payload/access/publishedOrAuthenticated'

describe('publishedOrAuthenticated', () => {
  it('returns status filter when no user', () => {
    const result = publishedOrAuthenticated({ req: { user: null } } as any)
    expect(result).toEqual({ _status: { equals: 'published' } })
  })

  it('returns true when user is authenticated', () => {
    const result = publishedOrAuthenticated({ req: { user: { id: '1' } } } as any)
    expect(result).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run vitest run src/tests/lib/accessControl.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement the access control helper**

Create `src/payload/access/publishedOrAuthenticated.ts`:

```ts
import type { Access } from 'payload'

export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run vitest run src/tests/lib/accessControl.test.ts`
Expected: PASS — both tests green

- [ ] **Step 5: Commit**

```bash
git add src/payload/access/publishedOrAuthenticated.ts src/tests/lib/accessControl.test.ts
git commit -m "feat: add publishedOrAuthenticated access control for draft-aware collections"
```

---

### Task 5: Preview URL generation helper

**Files:**
- Create: `src/lib/previewUrl.ts`
- Create: `src/tests/lib/previewUrl.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/tests/lib/previewUrl.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { generatePreviewUrl, generateLivePreviewUrl } from '@/lib/previewUrl'

describe('generatePreviewUrl', () => {
  it('generates correct URL for pages', () => {
    const url = generatePreviewUrl({ slug: 'about', collection: 'pages' })
    expect(url).toContain('/preview?')
    expect(url).toContain('slug=about')
    expect(url).toContain('collection=pages')
    expect(url).toContain('path=%2Fabout')
  })

  it('generates correct URL for home page', () => {
    const url = generatePreviewUrl({ slug: 'home', collection: 'pages' })
    expect(url).toContain('path=%2F')
    expect(url).not.toContain('path=%2Fhome')
  })

  it('generates correct URL for services', () => {
    const url = generatePreviewUrl({ slug: 'plumbing', collection: 'services' })
    expect(url).toContain('path=%2Fservices%2Fplumbing')
  })

  it('generates correct URL for posts', () => {
    const url = generatePreviewUrl({ slug: 'my-post', collection: 'posts' })
    expect(url).toContain('path=%2Fblog%2Fmy-post')
  })

  it('generates correct URL for service-areas', () => {
    const url = generatePreviewUrl({ slug: 'toronto', collection: 'service-areas' })
    expect(url).toContain('path=%2Fservice-areas%2Ftoronto')
  })
})

describe('generateLivePreviewUrl', () => {
  it('generates correct URL for pages', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'about' },
      collectionConfig: { slug: 'pages' },
    })
    expect(url).toBe('/about')
  })

  it('generates root URL for home page', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'home' },
      collectionConfig: { slug: 'pages' },
    })
    expect(url).toBe('/')
  })

  it('generates correct URL for services', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'plumbing' },
      collectionConfig: { slug: 'services' },
    })
    expect(url).toBe('/services/plumbing')
  })

  it('generates correct URL for posts', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'my-post' },
      collectionConfig: { slug: 'posts' },
    })
    expect(url).toBe('/blog/my-post')
  })

  it('generates correct URL for service-areas', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'toronto' },
      collectionConfig: { slug: 'service-areas' },
    })
    expect(url).toBe('/service-areas/toronto')
  })

  it('returns / for globals (no collectionConfig)', () => {
    const url = generateLivePreviewUrl({
      data: {},
      collectionConfig: undefined,
    })
    expect(url).toBe('/')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run vitest run src/tests/lib/previewUrl.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement the preview URL helpers**

Create `src/lib/previewUrl.ts`:

```ts
const collectionPathMap: Record<string, (slug: string) => string> = {
  pages: (slug) => (slug === 'home' ? '/' : `/${slug}`),
  services: (slug) => `/services/${slug}`,
  posts: (slug) => `/blog/${slug}`,
  'service-areas': (slug) => `/service-areas/${slug}`,
}

export function generatePreviewUrl({
  slug,
  collection,
}: {
  slug: string
  collection: string
}): string {
  const pathFn = collectionPathMap[collection]
  const path = pathFn ? pathFn(slug) : `/${slug}`

  const params = new URLSearchParams({
    slug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/preview?${params.toString()}`
}

export function generateLivePreviewUrl({
  data,
  collectionConfig,
}: {
  data: Record<string, any>
  collectionConfig?: { slug: string } | null
}): string {
  if (!collectionConfig) return '/'

  const pathFn = collectionPathMap[collectionConfig.slug]
  return pathFn ? pathFn(data.slug) : '/'
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run vitest run src/tests/lib/previewUrl.test.ts`
Expected: PASS — all 11 tests green

- [ ] **Step 5: Commit**

```bash
git add src/lib/previewUrl.ts src/tests/lib/previewUrl.test.ts
git commit -m "feat: add preview URL generation helpers for collections"
```

---

## Chunk 2: Database Migration

### Task 6: Create migration for status field

**Files:**
- Create: migration file via Payload CLI

This must run BEFORE enabling `drafts: true` on collections. Payload's draft system adds `_status` automatically on schema push, but the existing `status` data needs to be migrated first to avoid data loss.

- [ ] **Step 1: Generate migration**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run payload migrate:create status-to-draft-archived`

This creates a migration file in `src/migrations/`.

- [ ] **Step 2: Edit the generated migration**

In the generated `up()` function, add SQL to:

```sql
-- Add archived column to each public collection table
ALTER TABLE pages ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;
ALTER TABLE services ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;
ALTER TABLE service_areas ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;

-- Map existing status values to archived
UPDATE pages SET archived = true WHERE status = 'archived';
UPDATE services SET archived = true WHERE status = 'archived';
UPDATE posts SET archived = true WHERE status = 'archived';
UPDATE service_areas SET archived = true WHERE status = 'archived';

-- Note: _status column will be added by Payload's drafts system on next schema push
-- The existing 'status' column can be dropped after verifying the migration
```

In the `down()` function, reverse the changes.

- [ ] **Step 3: Run migration**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run payload migrate`
Expected: Migration completes successfully

- [ ] **Step 4: Commit**

```bash
git add src/migrations/
git commit -m "feat: add migration to map status field to archived boolean"
```

---

## Chunk 3: Payload Collection and Global Configuration

### Task 7: Add versions, drafts, and access control to collections

**Files:**
- Modify: `src/payload/collections/Pages.ts`
- Modify: `src/payload/collections/Services.ts`
- Modify: `src/payload/collections/Posts.ts`
- Modify: `src/payload/collections/ServiceAreas.ts`

- [ ] **Step 1: Update `Pages.ts`**

Add imports and configuration:

```ts
import { publishedOrAuthenticated } from '@/payload/access/publishedOrAuthenticated'
import { generatePreviewUrl } from '@/lib/previewUrl'
```

Add to the collection config object:

```ts
versions: {
  drafts: {
    autosave: true,
    schedulePublish: false,
    validate: false,
  },
  maxPerDoc: 10,
},
access: {
  read: publishedOrAuthenticated,
},
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  preview: (doc) => generatePreviewUrl({ slug: doc.slug as string, collection: 'pages' }),
},
```

- [ ] **Step 2: Update `Services.ts`**

Same pattern as Pages. Add imports, `versions`, `access`, and update `admin` config:

```ts
defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
preview: (doc) => generatePreviewUrl({ slug: doc.slug as string, collection: 'services' }),
```

- [ ] **Step 3: Update `Posts.ts`**

Same pattern. Update `defaultColumns`:

```ts
defaultColumns: ['title', 'slug', 'publishedAt', '_status', 'updatedAt'],
preview: (doc) => generatePreviewUrl({ slug: doc.slug as string, collection: 'posts' }),
```

- [ ] **Step 4: Update `ServiceAreas.ts`**

Same pattern. Update `defaultColumns`:

```ts
defaultColumns: ['title', 'slug', 'areaType', '_status', 'updatedAt'],
preview: (doc) => generatePreviewUrl({ slug: doc.slug as string, collection: 'service-areas' }),
```

- [ ] **Step 5: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`
Expected: No type errors

- [ ] **Step 6: Commit**

```bash
git add src/payload/collections/Pages.ts src/payload/collections/Services.ts src/payload/collections/Posts.ts src/payload/collections/ServiceAreas.ts
git commit -m "feat: enable draft versioning and preview on all public collections"
```

---

### Task 8: Add versions and drafts to globals

**Files:**
- Modify: `src/payload/globals/SiteSettings.ts`
- Modify: `src/payload/globals/Header.ts`
- Modify: `src/payload/globals/Footer.ts`

- [ ] **Step 1: Update `SiteSettings.ts`**

Add to the global config object:

```ts
versions: {
  drafts: true,
},
```

- [ ] **Step 2: Update `Header.ts`**

Same — add `versions: { drafts: true }`.

- [ ] **Step 3: Update `Footer.ts`**

Same — add `versions: { drafts: true }`.

- [ ] **Step 4: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add src/payload/globals/SiteSettings.ts src/payload/globals/Header.ts src/payload/globals/Footer.ts
git commit -m "feat: enable draft versioning on all globals"
```

---

### Task 9: Add livePreview to Payload config

**Files:**
- Modify: `payload.config.ts`

- [ ] **Step 1: Add import**

```ts
import { generateLivePreviewUrl } from '@/lib/previewUrl'
```

- [ ] **Step 2: Add `livePreview` inside the `admin` object**

```ts
admin: {
  user: Users.slug,
  livePreview: {
    url: ({ data, collectionConfig, globalConfig }) =>
      generateLivePreviewUrl({ data, collectionConfig }),
    collections: ['pages', 'services', 'posts', 'service-areas'],
    globals: ['header', 'footer', 'site-settings'],
  },
},
```

- [ ] **Step 3: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add payload.config.ts
git commit -m "feat: add live preview config with dynamic URL resolver"
```

---

## Chunk 4: Preview Routes

### Task 10: Create preview route (enable draft mode)

**Files:**
- Create: `src/app/(frontend)/preview/route.ts`

- [ ] **Step 1: Create the preview route**

Create `src/app/(frontend)/preview/route.ts`:

```ts
import type { CollectionSlug } from 'payload'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'

export async function GET(request: Request): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(request.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path || !collection || !slug) {
    return new Response('Missing required search params', { status: 404 })
  }

  if (!path.startsWith('/')) {
    return new Response('This endpoint can only be used for relative previews', { status: 500 })
  }

  let user

  try {
    const authResult = await payload.auth({ headers: request.headers })
    user = authResult.user
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  draft.enable()
  redirect(path)
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(frontend\)/preview/route.ts
git commit -m "feat: add preview route to enable Next.js draft mode"
```

---

### Task 11: Create exit preview route

**Files:**
- Create: `src/app/(frontend)/preview/exit/route.ts`

- [ ] **Step 1: Create the exit route**

Create `src/app/(frontend)/preview/exit/route.ts`:

```ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request): Promise<Response> {
  const draft = await draftMode()
  draft.disable()

  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || '/'

  redirect(path)
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(frontend\)/preview/exit/route.ts
git commit -m "feat: add exit preview route to disable draft mode"
```

---

## Chunk 5: Frontend Components

### Task 12: Create the PreviewBanner component

**Files:**
- Create: `src/components/PreviewBanner.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/PreviewBanner.tsx`:

```tsx
import React from 'react'

export function PreviewBanner({ currentPath }: { currentPath: string }) {
  const exitUrl = `/preview/exit?path=${encodeURIComponent(currentPath)}`

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-amber-500 text-black px-4 py-2 text-center text-sm font-medium">
      Viewing Draft{' '}
      <a href={exitUrl} className="underline font-bold ml-2">
        Exit Preview
      </a>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PreviewBanner.tsx
git commit -m "feat: add PreviewBanner component for draft mode indication"
```

---

### Task 13: Create the LivePreviewWrapper client component

**Files:**
- Create: `src/components/LivePreviewWrapper.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/LivePreviewWrapper.tsx`:

```tsx
'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

interface LivePreviewWrapperProps<T> {
  initialData: T
  serverURL: string
  children: (data: T) => React.ReactNode
}

export function LivePreviewWrapper<T>({
  initialData,
  serverURL,
  children,
}: LivePreviewWrapperProps<T>) {
  const { data } = useLivePreview<T>({
    initialData,
    serverURL,
    depth: 2,
  })

  return <>{children(data)}</>
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LivePreviewWrapper.tsx
git commit -m "feat: add LivePreviewWrapper client component with useLivePreview hook"
```

---

## Chunk 6: Update Frontend Routes (Draft-Aware + Live Preview)

### Task 14: Update home page route

**Files:**
- Modify: `src/app/(frontend)/page.tsx`

- [ ] **Step 1: Update the home page**

The home page needs:
1. Import `draftMode` from `next/headers`
2. Pass `draft` param to query helpers
3. Pass `draft: true` to `payload.find()` when in draft mode
4. Wrap content in `LivePreviewWrapper`
5. Show `PreviewBanner` when in draft mode
6. Update `generateMetadata` to also call `draftMode()` and pass `isDraft` to query helpers so draft pages get correct metadata during preview

Update `src/app/(frontend)/page.tsx` to add draft-awareness. The key changes:

```tsx
import { draftMode } from 'next/headers'
import { LivePreviewWrapper } from '@/components/LivePreviewWrapper'
import { PreviewBanner } from '@/components/PreviewBanner'
```

In the page function:
```tsx
const { isEnabled: isDraft } = await draftMode()
```

Update the Payload query to pass `draft: isDraft` and use `getPublishedSlugWhere('home', isDraft)`.

Wrap the page content in `LivePreviewWrapper` passing the page data as `initialData` and `process.env.NEXT_PUBLIC_SITE_URL` as `serverURL`.

Add `{isDraft && <PreviewBanner currentPath="/" />}` at the end.

- [ ] **Step 2: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/page.tsx
git commit -m "feat: make home page draft-aware with live preview support"
```

---

### Task 15: Update catch-all page route

**Files:**
- Modify: `src/app/(frontend)/[slug]/page.tsx`

- [ ] **Step 1: Update the page**

Same pattern as Task 14:
1. Import `draftMode`, `LivePreviewWrapper`, `PreviewBanner`
2. Get `isDraft` from `draftMode()`
3. Pass `isDraft` to `getPublishedSlugWhere(slug, isDraft)` and `draft: isDraft` to `payload.find()`
4. Wrap content in `LivePreviewWrapper`
5. Add `PreviewBanner` when `isDraft`
6. Update `generateMetadata` to also use `draftMode()` and pass `isDraft` to query helpers

- [ ] **Step 2: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/\[slug\]/page.tsx
git commit -m "feat: make catch-all page route draft-aware with live preview"
```

---

### Task 16: Update service detail route

**Files:**
- Modify: `src/app/(frontend)/services/[slug]/page.tsx`

- [ ] **Step 1: Update the page**

Same pattern: add `draftMode`, `LivePreviewWrapper`, `PreviewBanner`. Pass `isDraft` to query helper and `draft: isDraft` to `payload.find()`. Wrap content, add banner. Also update `generateMetadata` to use `draftMode()` and pass `isDraft` to query helpers.

- [ ] **Step 2: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/services/\[slug\]/page.tsx
git commit -m "feat: make service detail route draft-aware with live preview"
```

---

### Task 17: Update blog detail route

**Files:**
- Modify: `src/app/(frontend)/blog/[slug]/page.tsx`

- [ ] **Step 1: Update the page**

Same pattern as Task 16.

- [ ] **Step 2: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/blog/\[slug\]/page.tsx
git commit -m "feat: make blog detail route draft-aware with live preview"
```

---

### Task 18: Update service area detail route

**Files:**
- Modify: `src/app/(frontend)/service-areas/[slug]/page.tsx`

- [ ] **Step 1: Update the page**

Same pattern as Task 16.

- [ ] **Step 2: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/service-areas/\[slug\]/page.tsx
git commit -m "feat: make service area detail route draft-aware with live preview"
```

---

### Task 19: Update listing pages (services, blog, service-areas)

**Files:**
- Modify: `src/app/(frontend)/services/page.tsx`
- Modify: `src/app/(frontend)/blog/page.tsx`
- Modify: `src/app/(frontend)/service-areas/page.tsx`

Listing pages need draft-awareness (so draft items appear in lists during preview) and the preview banner, but do NOT need `LivePreviewWrapper` (they list multiple items, not a single document being edited).

- [ ] **Step 1: Update `services/page.tsx`**

1. Import `draftMode` and `PreviewBanner`
2. Get `isDraft`
3. Pass `isDraft` to `getPublishedWhere(isDraft)` and `draft: isDraft` to `payload.find()`
4. Add `{isDraft && <PreviewBanner currentPath="/services" />}`

- [ ] **Step 2: Update `blog/page.tsx`**

Same pattern with `currentPath="/blog"`.

- [ ] **Step 3: Update `service-areas/page.tsx`**

Same pattern with `currentPath="/service-areas"`.

- [ ] **Step 4: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add src/app/\(frontend\)/services/page.tsx src/app/\(frontend\)/blog/page.tsx src/app/\(frontend\)/service-areas/page.tsx
git commit -m "feat: make listing pages draft-aware with preview banner"
```

---

### Task 20: Update sitemap and BlogPreviewBlock

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/components/blocks/BlogPreviewBlock.tsx`

These files call `getPublishedWhere()` and should always pass `false` (never show drafts in sitemap or blog preview blocks on the public site).

- [ ] **Step 1: Update `sitemap.ts`**

Update all calls from `getPublishedWhere()` to `getPublishedWhere(false)`. This is technically a no-op since `false` is the default, but makes the intent explicit.

- [ ] **Step 2: Update `BlogPreviewBlock.tsx`**

Update the `getPublishedWhere()` call to `getPublishedWhere(false)`.

- [ ] **Step 3: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/components/blocks/BlogPreviewBlock.tsx
git commit -m "refactor: explicitly pass draft=false to sitemap and BlogPreviewBlock queries"
```

---

## Chunk 7: E2E Tests and Validation

### Task 21: Write E2E tests for preview routes

**Files:**
- Create: `e2e/preview.spec.ts`

- [ ] **Step 1: Write the E2E tests**

Create `e2e/preview.spec.ts`:

```ts
import { test, expect } from '@playwright/test'

test.describe('Preview routes', () => {
  test('preview route rejects missing secret', async ({ request }) => {
    const response = await request.get('/preview?path=/&collection=pages&slug=home')
    expect(response.status()).toBe(403)
  })

  test('preview route rejects invalid secret', async ({ request }) => {
    const response = await request.get(
      '/preview?path=/&collection=pages&slug=home&previewSecret=wrong'
    )
    expect(response.status()).toBe(403)
  })

  test('preview route rejects missing params', async ({ request }) => {
    const response = await request.get(
      `/preview?previewSecret=${process.env.PREVIEW_SECRET || 'dev-preview-secret'}`
    )
    expect(response.status()).toBe(404)
  })

  test('preview route rejects non-relative paths', async ({ request }) => {
    const response = await request.get(
      `/preview?path=https://evil.com&collection=pages&slug=home&previewSecret=${process.env.PREVIEW_SECRET || 'dev-preview-secret'}`
    )
    expect(response.status()).toBe(500)
  })

  test('preview route rejects unauthenticated users', async ({ request }) => {
    const response = await request.get(
      `/preview?path=/&collection=pages&slug=home&previewSecret=${process.env.PREVIEW_SECRET || 'dev-preview-secret'}`
    )
    expect(response.status()).toBe(403)
  })

  test('exit preview route redirects to path', async ({ page }) => {
    const response = await page.goto('/preview/exit?path=/services')
    // Should redirect to /services
    expect(page.url()).toContain('/services')
  })
})

test.describe('Draft visibility', () => {
  test('published page is visible to public', async ({ page }) => {
    await page.goto('/')
    expect(await page.title()).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run E2E tests**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run playwright test e2e/preview.spec.ts`
Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add e2e/preview.spec.ts
git commit -m "test: add E2E tests for preview routes and draft visibility"
```

---

### Task 22: Run full validation

- [ ] **Step 1: Run linter**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run lint`
Expected: Clean

- [ ] **Step 2: Run typecheck**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run typecheck`
Expected: Clean

- [ ] **Step 3: Run unit tests**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run vitest run`
Expected: All tests pass (existing + new)

- [ ] **Step 4: Run E2E tests**

Run: `cd /Users/yash/Desktop/coding/AI/agency-os && bun run playwright test`
Expected: All tests pass

- [ ] **Step 5: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve validation issues from full test suite"
```

---

## Chunk 8: Deployment Docs Update

### Task 23: Update deployment docs with PREVIEW_SECRET

**Files:**
- Modify: `planning/22-deployment-and-secrets.md`

- [ ] **Step 1: Add `PREVIEW_SECRET` to the deployment docs**

Add `PREVIEW_SECRET` to the required environment variables section in `planning/22-deployment-and-secrets.md`. Mark it as required for preview functionality. Include a note that it should be a random string, different per environment.

- [ ] **Step 2: Commit**

```bash
git add planning/22-deployment-and-secrets.md
git commit -m "docs: add PREVIEW_SECRET to deployment and secrets documentation"
```

---

## Post-Implementation

After all tasks are complete:
1. Run superpowers:requesting-code-review
2. Run superpowers:verification-before-completion
3. Update `planning/18-current-task.md` to mark this task as completed
