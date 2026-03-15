# Payload Schema Reconciliation

This file records the current reconciliation status between the implemented Payload schema and the approved shared schema in `planning/20-shared-business-schema.md`.

It replaces the earlier mismatch audit with the current repo-aligned status so future agents are not working from stale gaps that have already been resolved.

## Current Status

The highest-priority reconciliation work is complete in the current repo.

Implemented and verified:

1. public collections use shared slug controls, shared SEO fields, and shared publication status support where applicable
2. frontend queries gate published content correctly, including `publishedAt` handling for routable public content
3. `site-settings` owns the shared business identity and primary CTA baseline for V1
4. `services` use direct `servedAreas` linkage
5. `service-areas` include the approved location fields needed for V1
6. `leads` is the canonical inbound lead record
7. `opportunities` exists as the canonical opportunity record linked to leads
8. header CTA and footer contact info have explicit inherit-versus-override behavior relative to `site-settings`
9. `tagline` is surfaced in the Header and Footer frontend components

## Resolved Decisions

### Shared Field Strategy

Payload uses nested groups where they improve CMS ergonomics.

Current canonical direction:

1. shared SEO remains a nested `meta` group in Payload
2. business identity and CTA defaults live in `site-settings`
3. planning field names remain the conceptual contract, while Payload may use grouped implementations that map cleanly to that contract

### Lead Ownership

V1 uses `leads` as the canonical lead collection.

Implementation notes:

1. contact form submissions write directly to `leads`
2. legacy `contact-submissions` is retained in the repo only as an unregistered reference shape
3. the one-off migration script remains available for importing old records into `leads` if needed

### Reviews Publication Exception

Reviews are a documented lighter exception to the full publication group in V1.

Current rule:

1. reviews use `status` plus `featured`
2. reviews do not include `publishedAt` in V1
3. adding scheduled publication for reviews is deferred until there is a real product need

## Current Collection Status

### Pages

Status: aligned for V1.

Implemented:

1. shared slug fields including `slugLock`
2. shared SEO field group
3. shared publication fields including `archived`

### Services

Status: aligned for V1.

Implemented:

1. shared slug fields including `slugLock`
2. shared SEO field group
3. shared publication fields
4. direct `servedAreas` relationship

### ServiceAreas

Status: aligned for V1.

Implemented:

1. shared slug fields including `slugLock`
2. shared SEO field group
3. shared publication fields
4. `areaType`, `parentArea`, `geoModifier`, and location coordinates for V1

Boundary note:

1. `title` remains the routable display name in implementation rather than introducing a separate `areaName` field

### Posts

Status: aligned for V1.

Implemented:

1. shared slug fields including `slugLock`
2. shared SEO field group
3. shared publication fields including `archived`

### Reviews

Status: intentionally lighter exception in V1.

Implemented:

1. `draft`, `published`, `archived`
2. `featured` flag for display emphasis

Deferred:

1. `publishedAt`
2. moderation-specific approval fields unless review operations become more complex

### Leads

Status: aligned as the canonical V1 lead record.

Implemented:

1. shared inbound lead ownership surface for contact-form capture
2. source tracking
3. duplicate and outreach status tracking

Implementation note:

1. `inquiryMessage` is retained as an implementation-specific inbound form field

### Opportunities

Status: aligned for V1.

Implemented:

1. required `leadReference`
2. qualification, fit, urgency, likely tier, rationale, next action, outreach angle, response status, and assignment fields

Implementation note:

1. stored `likelyTier` values are normalized as lowercase enum values (`launch`, `growth`, `premium`) while labels remain `Launch`, `Growth`, and `Premium`

## Global Status

### SiteSettings

Status: aligned for V1.

Implemented:

1. business identity fields including `tagline`, `logo`, `logoAlt`, primary and secondary contact fields, address country, and trust fields
2. primary CTA defaults including style
3. contact form recipient, hours summary, and emergency availability
4. default SEO fallback fields
5. analytics as an implementation-specific extension

### Header

Status: aligned for V1.

Implemented:

1. navigation-specific fields remain separate
2. CTA supports explicit inheritance from `site-settings` or local override

### Footer

Status: aligned for V1.

Implemented:

1. navigation-specific fields remain separate
2. contact info supports explicit inheritance from `site-settings` or local override

## Remaining Intentional Deferrals

1. CRM and orchestration tool selection
2. proposal, contract, and later sales-pipeline entities
3. advanced block schema changes unrelated to shared-field adoption
4. review scheduling and richer moderation controls
5. multi-location schema beyond the current V1 boundary

## Next Recommended Focus

The next step after this reconciliation work is not additional schema churn by default.

Recommended order:

1. verify GitHub CI runs green with the current workflow
2. keep deployment and environment docs aligned with real runtime assumptions
3. move into first-template or offer-validation work only after CI is stable