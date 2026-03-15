# Payload Schema Reconciliation

This file audits the currently implemented Payload collections and globals against the approved shared schema in `planning/20-shared-business-schema.md`.

This is an audit artifact only. It does not implement the changes.

## Resolved In Code Since This Audit

1. V1 now uses a canonical `leads` collection for inbound form capture instead of keeping `contact-submissions` as the primary record.
2. Contact form submissions now map directly into the approved lead ownership boundary with implementation-specific `inquiryMessage` retained for inbound context.
3. Header CTA and footer contact info now have explicit inherit-versus-override controls relative to SiteSettings.
4. A one-off migration script now exists to import legacy `contact-submissions` rows into `leads` without duplicating already-migrated records.
5. Legacy `contact-submissions` collection removed from Payload config. The migration script and collection file are retained in the repo for reference but the collection is no longer registered.
6. Canonical `opportunities` collection added, matching the approved Opportunity field group in `planning/20-shared-business-schema.md`.
7. Reviews confirmed as a lighter exception to the publication group: no `publishedAt` field in V1. Reviews are not individually routable and use `status` (draft/published/archived) plus `featured` flag for display control. Adding `publishedAt` is deferred until scheduled review publishing is needed.
8. Tagline from SiteSettings is now surfaced in the Header and Footer frontend components.

## Confirmed Scope Summary

Compared:

1. all implemented Payload collections
2. all implemented Payload globals
3. shared field groups, publication conventions, slug conventions, and front-office entity boundaries

Out of scope:

1. implementing the changes
2. changing CRM or orchestration decisions
3. changing pricing, branding, or marketing direction
4. block implementation details beyond schema surface mismatches

## Collection Audit

### Pages

Current state:

1. has `title`, `slug`, `layout`, `meta`, `publishedAt`, and `status`
2. aligns partially with slug, SEO, and publication field groups

Gaps:

1. `meta` uses nested `title`, `description`, and `image` instead of shared names like `metaTitle`, `metaDescription`, and `ogImage`
2. missing `noIndex`, `canonicalUrl`, and `structuredDataType`
3. missing `slugLock`
4. status options only support `draft` and `published`; shared schema also requires `archived`
5. no explicit rule in the schema implementation yet for `publishedAt` gating on scheduled publication

Action:

1. expand the SEO group to match the approved shared schema
2. add `slugLock`
3. add `archived` to public-content status options
4. decide whether the current nested `meta` group stays canonical or is renamed to shared field names during implementation

### Services

Current state:

1. has `title`, `slug`, `summary`, `image`, `content`, `meta`, and `status`
2. aligns partially with slug and SEO groups

Gaps:

1. missing `publishedAt`
2. missing `slugLock`
3. status options only support `draft` and `published`; shared schema also requires `archived`
4. `meta` uses current nested names rather than the shared SEO field names
5. missing `noIndex`, `canonicalUrl`, and `structuredDataType`
6. shared schema expects service-to-service-area linkage via `servedAreas`, but the current collection has no direct area relationship

Action:

1. add the full publication field group, including `publishedAt`
2. add `slugLock`
3. add direct service-area linkage or explicitly document that the reverse relationship on service areas is the canonical V1 implementation
4. align the SEO field group surface with the approved schema

### ServiceAreas

Current state:

1. has `title`, `slug`, `description`, `services`, `content`, `meta`, and `status`
2. partially aligns with slug, SEO, and service-area concepts

Gaps:

1. missing `publishedAt`
2. missing `slugLock`
3. status options only support `draft` and `published`; shared schema also requires `archived`
4. missing the approved location-specific fields: `areaType`, `parentArea`, `latitude`, `longitude`, `radiusKm`, and `geoModifier`
5. `title` currently acts like `areaName`, but that naming choice is not reconciled with the shared schema yet
6. `services` is the inverse of the schema’s `servedAreas` linkage model rather than the exact shared naming
7. SEO group still uses the current nested `meta` shape instead of the approved shared field names

Action:

1. add the missing location field group
2. add the full publication field group
3. resolve whether `title` remains the canonical display name for service areas or whether `areaName` should be introduced
4. align SEO field names and slug controls with the shared schema

### Posts

Current state:

1. has `title`, `slug`, `summary`, `featuredImage`, `content`, `meta`, `publishedAt`, and `status`
2. aligns partially with slug, SEO, and publication groups

Gaps:

1. missing `slugLock`
2. status options only support `draft` and `published`; shared schema also requires `archived`
3. SEO group uses current nested names rather than approved shared field names
4. missing `noIndex`, `canonicalUrl`, and `structuredDataType`
5. blog-specific fields remain minimal; this is acceptable for now but should be documented as intentionally lean rather than overlooked

Action:

1. add `slugLock`
2. add `archived` to the status vocabulary
3. align the SEO group to the approved shared field set

### Reviews

Current state:

1. has `author`, `rating`, `content`, `service`, `serviceArea`, `featured`, and `status`
2. aligns with the schema boundary that reviews are domain-specific and not individually routable in V1

Gaps:

1. status options only support `draft` and `published`; shared schema requires `archived`
2. if reviews are considered public content, the publication group is incomplete because `publishedAt` is missing
3. there is no explicit display-approval or moderation field even though the schema boundary notes review-specific approval concerns

Action:

1. add `archived` to review status values
2. decide whether reviews need `publishedAt` in V1 or whether reviews should be documented as a lighter exception to the publication group
3. consider a review approval flag only if moderation needs are expected soon

### Media

Current state:

1. has upload config and required `alt`
2. aligns with the schema boundary that media is separate from slug, SEO, and publication groups

Gaps:

1. no major shared-schema mismatch
2. focal point and richer asset metadata remain deferred, which matches the schema

Action:

1. no immediate schema-alignment action required

### ContactSubmissions

Current state:

1. stores inbound form submissions with `name`, `email`, `phone`, `service`, `message`, `source`, and `status`
2. is private and access-controlled, which is operationally sound

Gaps:

1. the shared schema defines a front-office `Lead` entity, but no Payload `Lead` collection exists
2. `contact-submissions` does not match the approved lead shape: it lacks `companyName`, `websiteUrl`, `serviceCategory`, `serviceArea`, `contactPath`, `websiteIssueSummary`, `evidenceNotes`, and `duplicateCheckStatus`
3. current `status` values (`new`, `in-progress`, `closed`) do not align with the lead schema’s `outreachStatus` or opportunity schema’s `qualificationStatus`
4. current `name` field is ambiguous between contact person and business identity

Action:

1. decide whether `contact-submissions` is a temporary intake buffer or the canonical Lead collection for V1
2. if it becomes the canonical Lead record, expand and rename fields to match the approved shared schema
3. if it remains a separate intake buffer, define a mapping step from submission to Lead

### Users

Current state:

1. supports authentication with `name` and `role`
2. is outside the shared business schema scope

Gaps:

1. none relative to the current shared schema because user-role design is explicitly deferred

Action:

1. no immediate schema-alignment action required

## Global Audit

### SiteSettings

Current state:

1. has `businessName`, `phone`, `email`, nested `address`, `primaryCTA`, and `analytics`
2. is the closest current implementation to the approved Business Identity and Contact / CTA field groups

Gaps:

1. `phone` and `email` are singular rather than shared names like `phonePrimary` and `emailPrimary`
2. missing `tagline`, `logo`, `logoAlt`, `phoneSecondary`, `addressCountry`, `googleBusinessUrl`, `licenseNumber`, and `yearEstablished`
3. `address` is nested and concise, while the shared schema currently lists flat field names; this needs one canonical direction
4. `primaryCTA` only includes `label` and `url`; missing `ctaStyle`
5. missing `contactFormRecipient`, `contactPhoneDisplay`, `contactPhoneHref`, `hoursSummary`, and `emergencyAvailable`
6. `analytics` exists in implementation but is not yet represented in the shared schema’s field-group map

Action:

1. decide whether shared field groups should stay nested for Payload ergonomics or remain flat planning aliases
2. expand SiteSettings to fully cover the approved Business Identity and Contact / CTA groups
3. add analytics as an explicit approved extension or document it as implementation-specific

### Header

Current state:

1. has `navItems` and nested `cta`
2. aligns with the schema boundary that navigation is navigation-specific

Gaps:

1. `cta` duplicates global CTA structure instead of clearly inheriting from SiteSettings
2. missing `ctaStyle` on the header CTA if visual variant matters at the schema level
3. no planning-level decision is documented for when header CTA should inherit versus override shared CTA defaults

Action:

1. document inheritance rules between SiteSettings CTA defaults and Header CTA overrides
2. align the header CTA surface with the shared CTA field group where overrides are allowed

### Footer

Current state:

1. has `navGroups`, `contactInfo`, `trustLinks`, and `copyright`
2. aligns broadly with the navigation-specific boundary in the shared schema

Gaps:

1. `contactInfo.phone` and `contactInfo.email` duplicate business/contact fields already owned by SiteSettings
2. no explicit rule is documented for whether footer contact fields are inherited or overridden
3. footer does not expose CTA configuration, which is acceptable, but the override rule should still be explicit

Action:

1. document whether Footer contact fields are direct references to SiteSettings defaults or separate overrides
2. keep footer navigation-specific, but reduce duplicate business-contact ownership where possible

## Missing Entirely

These schema entities or surfaces are approved in planning but missing from the current Payload implementation:

1. canonical Lead collection aligned to the approved shared Lead field group
2. canonical Opportunity collection aligned to the approved shared Opportunity field group
3. full shared SEO field group on public collections
4. full shared Business Identity field group on SiteSettings
5. full location field group on ServiceAreas
6. `slugLock` on routable collections
7. `archived` status support across public content

## Prioritized Action Items

### Priority 1

1. Decide the canonical field naming and grouping strategy for shared fields in Payload implementation: nested groups with camelCase subfields versus flat field names.
2. Resolve whether `contact-submissions` becomes the canonical Lead collection or maps into a new Lead collection.
3. Add missing publication-state alignment across public collections: `archived`, `publishedAt` where required, and consistent frontend query rules.

### Priority 2

1. Standardize the SEO field group across pages, services, service areas, and posts.
2. Add `slugLock` consistently to routable collections.
3. Expand SiteSettings to fully own business identity and default CTA/contact fields.

### Priority 3

1. Add the missing location-specific fields to ServiceAreas.
2. Clarify header and footer inheritance rules versus override behavior for CTA and contact info.
3. Add Lead and Opportunity collections only after the V1 ownership decision is explicit.

## Explicit Deferrals

1. exact Payload implementation changes remain deferred to the implementation task
2. CRM and orchestration choices remain deferred
3. proposal, contract, and later pipeline entities remain deferred
4. advanced block schema changes remain deferred unless required by shared-field adoption