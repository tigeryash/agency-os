# Current Task

This file is the small, high-signal handoff for the active implementation step.

## Active Task
Define the first home-services template family direction and demo-site brief now that CI hardening, deployment documentation, and schema cleanup are stable.

## Goal
Move the project out of infrastructure-cleanup mode and into a concrete product-facing target: one credible first template family and one demo brief that future implementation work can execute against without improvising the business intent.

## Read Only These Files First
1. `CLAUDE.md`
2. `18-current-task.md`
3. `planning/04-session-handoff.md`
4. `planning/01-business-model.md`
5. `planning/03-roadmap.md`
6. `planning/17-starter-implementation-spec.md`
7. `planning/23-first-template-direction.md`

## Already Completed

### CI/CD Pipeline
1. Improved `.github/workflows/ci.yml` with dependency caching, Playwright browser caching, job timeouts, artifact uploads, and a Postgres service container for E2E
2. Fixed `playwright.config.ts` to use `bun run start` in CI (after build) instead of `bun run dev`
3. Hoisted shared env vars (PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_TIER) to workflow-level
4. Added database seeding step before E2E tests
5. GitHub CI has now been verified as green by the user

### Deployment and Secrets
1. Created `planning/22-deployment-and-secrets.md` covering required/optional env vars, secret handling rules, CI secrets, pre-launch checklist, and environment isolation

### Schema Cleanup
1. Added `Opportunities` collection matching the approved field group in `planning/20-shared-business-schema.md`
2. Removed legacy `ContactSubmissions` from Payload config (file retained for reference, collection no longer registered)
3. Confirmed Reviews as a lighter exception to the publication group — no `publishedAt` in V1, documented in reconciliation report
4. Surfaced `tagline` from SiteSettings in Header and Footer frontend components

## Local Validation
- Lint: clean
- Typecheck: clean
- Unit tests: 15/15 passed

## In Scope
1. Choose the first template family direction for the home-services niche
2. Define the first demo-site brief clearly enough to implement
3. Keep planning docs aligned with the implemented repo state

## Out Of Scope
1. Reworking CI or deployment docs unless a new failure appears
2. Reopening completed schema reconciliation without a concrete bug or requirement
3. Pricing, CRM selection, branding, or marketing-direction decisions unless explicitly requested
4. Building the demo implementation in this planning step

## Explicit Deferrals
1. Docker / containerization — not needed for V1
2. ESLint flat config migration — flagged as deprecation warning, not blocking
3. Reviews `publishedAt` — deferred until scheduled review publishing is needed
4. ContactSubmissions data preservation — migration script exists in repo for importing legacy records to Leads

## Previous Tasks (Completed)
1. Define the shared business schema boundaries — completed in `planning/20-shared-business-schema.md`
2. Reconcile implemented Payload collections and globals against the shared schema — completed in `planning/21-payload-schema-reconciliation.md`
3. Implement highest-priority reconciliation actions — completed (status alignment, lead ownership, CTA inheritance, SEO fields)

## Next Task After This
1. Implement the first demo site or demo content plan against the approved template direction
2. Keep infra and schema work incremental and issue-driven
