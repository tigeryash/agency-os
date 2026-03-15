# Current Task

This file is the small, high-signal handoff for the active implementation step.

## Active Task
CI/CD pipeline hardening, deployment/secrets documentation, and final schema cleanup.

## Goal
Make the project CI-ready with proper E2E infrastructure, document deployment requirements and secret handling, and complete the remaining low-priority schema items.

## Read Only These Files First
1. `CLAUDE.md`
2. `18-current-task.md`
3. `planning/22-deployment-and-secrets.md`
4. `planning/21-payload-schema-reconciliation.md`

## Completed This Session

### CI/CD Pipeline
1. Improved `.github/workflows/ci.yml` with dependency caching, Playwright browser caching, job timeouts, artifact uploads, and a Postgres service container for E2E
2. Fixed `playwright.config.ts` to use `bun run start` in CI (after build) instead of `bun run dev`
3. Hoisted shared env vars (PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_TIER) to workflow-level
4. Added database seeding step before E2E tests

### Deployment and Secrets
1. Created `planning/22-deployment-and-secrets.md` covering required/optional env vars, secret handling rules, CI secrets, pre-launch checklist, and environment isolation

### Schema Cleanup
1. Added `Opportunities` collection matching the approved field group in `planning/20-shared-business-schema.md`
2. Removed legacy `ContactSubmissions` from Payload config (file retained for reference, collection no longer registered)
3. Confirmed Reviews as a lighter exception to the publication group — no `publishedAt` in V1, documented in reconciliation report
4. Surfaced `tagline` from SiteSettings in Header and Footer frontend components

## Validation
- Lint: clean
- Typecheck: clean
- Unit tests: 15/15 passed

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
1. Push to main and verify CI pipeline runs green
2. Begin first client template or offer validation work
