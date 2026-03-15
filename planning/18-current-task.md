# Current Task

This file is the small, high-signal handoff for the active implementation step.

## Active Task
Decide next step after completing the first orchestrated test wave.

## Goal
Choose and scope the next bounded task: sample-lead testing with the rubric, further agent spec iteration, or return to starter site implementation.

## Read Only These Files First
1. `CLAUDE.md`
2. `18-current-task.md`
3. `planning/04-session-handoff.md`

## Already Completed

### Front-Office MVP Standard
1. Defined the qualification rubric in `planning/25-front-office-mvp-standard.md` Part 1
2. Defined the outreach framework in `planning/25-front-office-mvp-standard.md` Part 2
3. Defined the handoff contract in `planning/25-front-office-mvp-standard.md` Part 3

### Orchestration Layer
1. Added control-plane orchestration guardrails to `CLAUDE.md`
2. Added detailed multi-agent execution policy in `planning/26-orchestration-policy.md`
3. Added the Orchestrator Agent spec in `planning/agents/orchestrator-agent.md`
4. Updated the agent template, registry, and handoff docs to reflect the new control model
5. Executed the first orchestrated test wave: retrofitted Research, Qualification, and Outreach agent specs to the stronger template with Allowed Change Surface, Forbidden Surface, Validation Required, and External Skill Support sections
6. Validated orchestration model: clean ownership boundaries, no overlapping edits, no scope drift, explicit merge discipline

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
Pending user direction. Options:

1. Test the front-office qualification rubric on sample leads
2. Iterate on Wave 1 agent specs if gaps appear during sample testing
3. Return to starter site implementation work

## Out Of Scope
1. Reworking CI or deployment docs unless a new failure appears
2. Reopening completed schema reconciliation without a concrete bug or requirement
3. Pricing, CRM selection, branding, or marketing-direction decisions unless explicitly requested
4. Building automation code or external integrations in this planning step

## Explicit Deferrals
1. Docker / containerization — not needed for V1
2. ESLint flat config migration — flagged as deprecation warning, not blocking
3. Reviews `publishedAt` — deferred until scheduled review publishing is needed
4. ContactSubmissions data preservation — migration script exists in repo for importing legacy records to Leads
5. CRM vendor selection — deferred until the front-office MVP workflow is clearer

## Previous Tasks (Completed)
1. Define the shared business schema boundaries — completed in `planning/20-shared-business-schema.md`
2. Reconcile implemented Payload collections and globals against the shared schema — completed in `planning/21-payload-schema-reconciliation.md`
3. Implement highest-priority reconciliation actions — completed (status alignment, lead ownership, CTA inheritance, SEO fields)
4. Define and run the first orchestrated test wave — completed. Research, Qualification, and Outreach agent specs retrofitted to the orchestration-aware template with clean ownership boundaries and no scope drift.

## Next Task After This
1. Test the front-office qualification rubric on sample leads, or
2. Iterate on agent specs if gaps appear, or
3. Return to starter site implementation
