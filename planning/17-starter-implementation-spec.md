# Starter Implementation Spec

This file turns the V1 starter architecture into an implementation-ready technical plan.

It is the bridge between the planning docs and the actual Next.js + Payload starter repository.

## Goal

Define a clean, reusable technical structure for building home-services websites that can support Launch, Growth, and Premium packages without collapsing into one-off custom code.

## Recommended Project Shape

Use one monolithic application repository for V1, not a multi-package monorepo.

Reason:

1. lower setup complexity
2. easier starter reuse
3. fewer moving parts while the platform is still being proven

## High-Level Structure

Recommended top-level shape:

1. `src/app`
   App Router routes and page composition
2. `src/components/ui`
   shared presentational primitives
3. `src/components/blocks`
   Payload-rendered content blocks
4. `src/components/sections`
   optional higher-level compositions if repeated enough to justify them
5. `src/features/services`
   service-domain helpers and components
6. `src/features/service-areas`
   service-area domain helpers and components
7. `src/features/reviews`
   testimonial / review domain helpers and display helpers
8. `src/lib`
   utilities, config helpers, formatting, metadata helpers
9. `src/styles`
   tokens, globals, and design-system styling layers
10. `src/payload`
   collections, globals, fields, blocks, hooks, and Payload config support
11. `src/tests`
   unit and integration tests
12. `e2e`
   Playwright tests

## App Structure Guidance

The App Router should stay focused on composition and routing.

Recommended V1 route patterns:

1. home page
2. static pages
3. services overview page
4. individual service page route
5. service-area page route
6. blog listing and post routes for Growth and above
7. contact route

Avoid putting heavy CMS mapping logic directly inside route files.

## Payload Structure Guidance

Recommended V1 Payload folders:

1. `src/payload/collections`
2. `src/payload/globals`
3. `src/payload/blocks`
4. `src/payload/fields`
5. `src/payload/hooks`
6. `src/payload/access`
7. `src/payload/utilities`

## Initial Payload Collections

Recommended V1 collections:

1. `pages`
   block-based page content and metadata
2. `services`
   service definitions and reusable service content
3. `serviceAreas`
   location/service-area content for local SEO pages
4. `reviews`
   testimonials and review-style proof
5. `posts`
   blog or resource content for Growth and above
6. `media`
   uploaded images and assets

Optional later collection:

1. `leads` or internal admin-oriented collections only if the starter itself needs internal capture storage

## Initial Payload Globals

Recommended V1 globals:

1. `siteSettings`
   business identity, contact info, primary CTA, analytics and global settings
2. `header`
   navigation and top-level CTA
3. `footer`
   footer nav, contact details, trust links

## Initial Block Inventory

Define blocks as stable reusable content units.

Recommended V1 block set:

1. hero
2. CTA band
3. services grid
4. service details
5. process steps
6. review/testimonial block
7. trust indicators block
8. FAQ block
9. service-area coverage block
10. before-and-after / result highlights block
11. team / company intro block
12. contact form block
13. blog preview block
14. emergency or priority callout block

## Rendering Strategy

Use a block renderer that:

1. maps Payload block types to frontend components
2. keeps block components isolated and easy to test
3. avoids block-specific business logic leaking into page routes

## Design Token Strategy

V1 should define tokens for:

1. type scale
2. spacing scale
3. color roles
4. surface variants
5. radii and borders if used
6. button and CTA variants
7. container widths and section spacing

Tokens should live in one place and flow into reusable UI primitives and blocks.

## Feature Boundary Strategy

Use simple configuration boundaries rather than deep dynamic plugin-style architecture.

V1 package-aware boundaries:

1. blog enabled or disabled
2. service-area pages enabled or disabled
3. premium-only blocks enabled or disabled
4. extra CTA patterns enabled or disabled
5. approved integrations enabled or disabled

## Forms And Lead Capture

V1 should define one standard secure form pattern.

Requirements:

1. shared validation approach
2. spam protection strategy
3. consistent success and error handling UX
4. a reusable form component pattern
5. no hardcoded delivery assumptions in page-level code

## SEO And Metadata

V1 should provide:

1. page-level SEO fields
2. default metadata fallbacks
3. canonical strategy where needed
4. sitemap support
5. robots support
6. local-business schema support later if justified

## Testing Baseline

V1 minimum:

1. linting
2. typechecking
3. unit tests for core utilities and mapping logic
4. Playwright coverage for primary lead-capture flows
5. QA checklist support for manual and automated verification

Recommended smoke e2e tests:

1. home page loads
2. primary CTA flow works
3. contact or estimate form works
4. service page route works
5. service-area route works if enabled

## Security Baseline

V1 starter must include:

1. environment variable boundaries
2. safe Payload admin configuration
3. safe media handling assumptions
4. form validation and spam mitigation path
5. no secrets in source

## Recommended Build Sequence

1. project skeleton and config
2. Payload config and base collections
3. global site settings and navigation globals
4. design tokens and shared UI primitives
5. core block implementations
6. page rendering pipeline
7. forms and lead-capture baseline
8. tests and QA baseline

## Definition Of Done

This implementation spec is satisfied when the starter repository can:

1. create a Launch-tier home-services site with standard pages and blocks
2. support Growth-tier additions without restructuring the repo
3. keep core blocks and domain content reusable across future client projects
4. pass baseline lint, type, and critical-flow tests