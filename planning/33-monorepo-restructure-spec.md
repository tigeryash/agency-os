# Monorepo Restructure Spec

## Goal

Convert the current single-app repo into a bun workspaces monorepo with three independent apps and two shared packages. Enable parallel development across multiple Claude Code instances.

## Target Structure

```
agency-os/
├── apps/
│   ├── template-home-services/   ← current app, moved as-is
│   ├── agency-site/              ← new plain Next.js app
│   └── agent-dashboard/          ← new plain Next.js app
├── packages/
│   ├── ui/                       ← shared React components
│   └── shared/                   ← shared utilities
├── planning/                     ← unchanged, stays at root
├── CLAUDE.md                     ← unchanged, stays at root
├── .github/                      ← stays at root, CI updated per app
├── .gitignore                    ← stays at root
├── package.json                  ← workspace root
├── tsconfig.base.json            ← shared TS config
└── bun.lock                      ← single lockfile
```

## Locked Decisions

1. Bun workspaces, no Turborepo or Nx.
2. Payload stays only inside template apps that need CMS editing.
3. Agency site is plain Next.js, no Payload.
4. Agent dashboard is plain Next.js, no Payload.
5. No `packages/payload-core` until a second Payload template exists.
6. Collections, blocks, and niche-specific code stay local to the template. No premature extraction.

## Step 1: Workspace Root

Create a new root `package.json`:

```json
{
  "name": "agency-os",
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

Create `tsconfig.base.json` at root with shared compiler options. Each app extends it.

```json
// tsconfig.base.json — shared options only
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true
  }
}
```

Per-app `tsconfig.json` files keep their own: `jsx`, `plugins`, `paths`, `include`, `exclude`, `incremental`. These are app-specific and should not be shared.

Root-level files that stay:
- `CLAUDE.md`
- `planning/`
- `.github/`
- `.gitignore` (updated for monorepo paths)
- `.prettierrc`

Root-level files that move into `apps/template-home-services/`:
- `payload.config.ts`
- `next.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`
- `vitest.config.ts`
- `playwright.config.ts`
- `.eslintrc.js`
- `.env.example`
- `next-env.d.ts`
- `package.json` (becomes the template's own package.json)
- `tsconfig.json` (updated to extend root base)
- `src/` (entire directory)
- `e2e/`
- `public/`

## Step 2: Move Current App to `apps/template-home-services/`

Move the entire current application into `apps/template-home-services/` with minimal changes.

### What moves as-is

Everything in `src/`:
- `src/app/` (frontend routes, payload admin, API routes)
- `src/components/` (blocks, sections, ui, preview components)
- `src/features/` (contact, reviews, services, service-areas)
- `src/lib/` (all utilities including mcp, seed, tiers, preview, etc.)
- `src/payload/` (collections, globals, blocks, fields, access, hooks)
- `src/styles/`
- `src/tests/`

All config files listed in Step 1.

### Minimal refactoring required

1. Update `tsconfig.json` to extend `../../tsconfig.base.json`
2. Update `@/*` path alias in `tsconfig.json` — still points to `./src/*` (relative, so unchanged)
3. Update `@payload-config` path alias in both `tsconfig.json` and `vitest.config.ts` — still points to `./payload.config.ts` relative to app root (unchanged since both files move with the app, but verify after move)
4. Update `package.json` name to `@agency-os/template-home-services`
5. `payload.config.ts` path resolution uses `import.meta.url` which is self-adjusting — do not modify the `dirname`, `importMap.baseDir`, or `typescript.outputFile` computations
6. `.env` is not committed — document that each app needs its own `.env`
7. Add `transpilePackages: ['@agency-os/ui', '@agency-os/shared']` to `next.config.ts`
8. Update `tailwind.config.ts` content paths to include the shared packages: add `'../../packages/ui/src/**/*.{ts,tsx}'` so Tailwind scans shared component class names

### What stays in the template (no extraction)

- All Payload collections including Leads and Opportunities
- All blocks (payload block definitions and React block components)
- MCP server
- All lib utilities
- All features

Rationale: These encode the niche, routes, block contracts, and business workflow. Extracting them before a second template exists creates wrong abstractions.

### Opportunities collection

Stays in the template for now. The agent dashboard will build its own data model when needed. No premature duplication.

## Step 3: Create `apps/agency-site/`

Plain Next.js app for the agency's public marketing website.

```
apps/agency-site/
├── src/
│   └── app/
│       ├── layout.tsx
│       └── page.tsx
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

Dependencies: `next`, `react`, `react-dom`, `tailwindcss`, `typescript`.

No Payload, no CMS. Pages are coded directly.

Add `transpilePackages: ['@agency-os/ui', '@agency-os/shared']` to `next.config.ts` when consuming shared packages. Include `.env.example` if the app needs environment variables.

`package.json` name: `@agency-os/agency-site`

## Step 4: Create `apps/agent-dashboard/`

Plain Next.js app for agency operations — agent management, lead pipeline, approvals.

```
apps/agent-dashboard/
├── src/
│   └── app/
│       ├── layout.tsx
│       └── page.tsx
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

Dependencies: `next`, `react`, `react-dom`, `tailwindcss`, `typescript`.

No Payload. This is an internal ops tool, not a CMS.

Add `transpilePackages: ['@agency-os/ui', '@agency-os/shared']` to `next.config.ts` when consuming shared packages. Include `.env.example` if the app needs environment variables.

`package.json` name: `@agency-os/agent-dashboard`

## Step 5: Create `packages/ui/`

Shared React components that multiple apps may use.

```
packages/ui/
├── src/
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── Heading.tsx
│   ├── Section.tsx
│   └── index.ts
├── package.json
└── tsconfig.json
```

These are extracted from `src/components/ui/` in the current app. They are generic presentational components with no Payload or niche dependency.

**`RichText.tsx` stays in the template.** It imports from `@payloadcms/richtext-lexical` and cannot move to a Payload-free shared package. It remains at `apps/template-home-services/src/components/ui/RichText.tsx`.

`package.json` name: `@agency-os/ui`

```json
{
  "name": "@agency-os/ui",
  "private": true,
  "exports": { ".": "./src/index.ts" }
}
```

`tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "paths": {}
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

Packages export raw TypeScript — no build step. Consuming apps must add `transpilePackages: ['@agency-os/ui', '@agency-os/shared']` to their `next.config.ts`.

Apps import via: `import { Button } from '@agency-os/ui'`

The template's `src/components/ui/` keeps `RichText.tsx` locally but replaces the other components with imports from `@agency-os/ui`.

## Step 6: Create `packages/shared/`

Shared utilities used across multiple apps.

```
packages/shared/
├── src/
│   ├── metadata.ts
│   ├── rate-limit.ts
│   ├── turnstile.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

Candidates for extraction (only move if a second app actually needs them):
- `metadata.ts` — SEO metadata helpers
- `rate-limit.ts` — Upstash rate limiting
- `turnstile.ts` — Turnstile verification

`package.json` name: `@agency-os/shared`

```json
{
  "name": "@agency-os/shared",
  "private": true,
  "exports": { ".": "./src/index.ts" }
}
```

`tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "paths": {}
  },
  "include": ["src/**/*.ts"]
}
```

Packages export raw TypeScript — no build step. Same `transpilePackages` rule applies in consuming apps.

### Extraction rule

Only extract a utility into `packages/shared/` when a second app imports it. Until then, it stays local to the template. The initial shared package may start nearly empty.

## Step 7: Update `.gitignore`

Update the root `.gitignore` for monorepo paths:

- Change `src/payload-types.ts` to `**/payload-types.ts`
- `.next/` already matches at any depth — no change needed
- Add `apps/*/.env` pattern (each app has its own `.env`)
- `test-results/` and `playwright-report/` already match at any depth — no change needed

## Step 8: Update CI

Update `.github/workflows/ci.yml` to handle the monorepo:

1. Install dependencies at root (`bun install` at workspace root)
2. Run template-specific checks with `working-directory: apps/template-home-services`:
   - `bun run lint`
   - `bun run typecheck`
   - `bun run test`
   - `bun run build`
   - `bun run seed` (requires `working-directory` so `PAYLOAD_CONFIG_PATH=./payload.config.ts` resolves correctly)
   - `bun run test:e2e`
3. Update artifact upload paths to include the app prefix (e.g., `apps/template-home-services/playwright-report/`)
4. Add placeholder jobs for agency-site and agent-dashboard (build only, no tests yet)
5. Use `working-directory` per job step, not global `cd`

## Bun Lockfile

The existing `bun.lock` should be deleted and regenerated after setting up workspaces. Run `rm bun.lock && bun install` at the workspace root to get a clean lockfile.

## What Does NOT Happen

1. No `packages/payload-core` — wait for a second Payload template
2. No shared block library — blocks stay in the template
3. No shared collections package — collections stay local
4. No extracting features, services, or niche-specific code
5. No changes to the template's functionality — this is a structural move only
6. No database changes — each app manages its own database independently

## Validation

After the restructure:

1. `bun install` at root succeeds
2. `apps/template-home-services/`: lint, typecheck, test, build all pass
3. `apps/agency-site/`: build passes
4. `apps/agent-dashboard/`: build passes
5. `packages/ui/`: typecheck passes
6. `packages/shared/`: typecheck passes
7. No import errors across workspace boundaries
8. Git history is preserved (use `git mv` where possible)

## Done Condition

1. All three apps exist and build independently
2. `packages/ui` contains the shared UI components
3. `packages/shared` exists (may be minimal)
4. Workspace root is configured and `bun install` works
5. CI passes for the template app
6. No functionality changes to the template
7. Planning files and CLAUDE.md remain at root and accessible
