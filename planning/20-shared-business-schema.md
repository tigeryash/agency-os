# Shared Business Schema

This file defines the reusable field groups, entity boundaries, status conventions, and reuse rules that apply across the starter and future client projects.

It is a planning-level artifact. It does not prescribe exact Payload implementation details.

## Confirmed Scope

In scope:

1. Shared business identity fields
2. Shared contact and primary CTA fields
3. Shared SEO and metadata field groups
4. Publication and status conventions for public content
5. Shared location and service-area field boundaries
6. Shared lead and opportunity field boundaries at the planning level
7. Boundary notes on what stays separate
8. Explicit deferrals

Out of scope:

1. Exact Payload collection or global implementation
2. Block implementation details
3. CRM or orchestration tool selection
4. Pricing, branding, or marketing decisions

## Field Group Map

### 1. Business Identity

Purpose: single source of truth for the client business. Lives in a global, not per-collection.

Fields:

- businessName — legal or DBA name
- tagline — short positioning line
- logo — primary logo asset reference
- logoAlt — secondary or dark-mode variant if needed
- phonePrimary — main business phone
- phoneSecondary — optional second line
- emailPrimary — main business email
- addressStreet — street address
- addressCity
- addressProvince — province or state
- addressPostalCode
- addressCountry — default "CA"
- googleBusinessUrl — optional link to Google Business Profile
- licenseNumber — optional trade license for trust display
- yearEstablished — optional for trust display

Reuse rule: every page, block, or component that needs business name, phone, or address must read from this group. Never hardcode business identity in templates.

### 2. Contact and Primary CTA

Purpose: define the primary call-to-action and contact paths used site-wide.

Fields:

- ctaLabel — button text, e.g. "Get a Free Estimate"
- ctaUrl — target URL or anchor
- ctaStyle — visual variant key (primary, secondary, emergency)
- contactFormRecipient — abstract delivery target placeholder for form submissions
- contactPhoneDisplay — formatted phone for display
- contactPhoneHref — tel: link value
- hoursSummary — short text, e.g. "Mon–Fri 8am–6pm"
- emergencyAvailable — boolean flag for 24/7 or emergency service messaging

Reuse rule: header, footer, hero, and CTA blocks must pull CTA config from this group. Page-level CTA overrides are allowed but the default must come from here.

### 3. SEO and Metadata

Purpose: provide consistent metadata fields across all public content types.

Fields:

- metaTitle — page title override
- metaDescription — description override
- ogImage — social sharing image reference
- noIndex — boolean, exclude from search indexing
- canonicalUrl — optional canonical override
- structuredDataType — optional hint for JSON-LD type (LocalBusiness, Service, Article, FAQPage)

Reuse rule: every public-facing collection (pages, services, serviceAreas, posts) must include this field group. Title and description overrides are optional. Defaults cascade from global site settings when page-level values are empty.

Fallback order:

1. Page-level SEO fields
2. Auto-generated from page title and content summary
3. Global site settings defaults

### 4. Publication Status

Purpose: define consistent content lifecycle states for all public content.

Status values:

- draft — not visible on the frontend
- published — live and publicly accessible
- archived — removed from public views but retained in the CMS

Fields:

- status — one of: draft, published, archived
- publishedAt — date when content went live or should go live
- updatedAt — CMS-managed last update timestamp; do not add a second custom field with the same meaning

Reuse rule: every collection that renders public content must use these exact status values and field names. No collection should invent its own status vocabulary.

Display rule: only content with status "published" appears on the frontend. If publishedAt exists, it must be in the past before content is visible. Archived content is hidden from public queries but remains accessible in the admin panel.

### 5. Slug and URL

Purpose: consistent URL generation across all routable content.

Fields:

- slug — URL-safe identifier, unique within its collection
- slugLock — boolean, prevents auto-regeneration from title changes once manually set

Reuse rule: every routable collection must include this group. Slug auto-generation from title is the default. Manual override is always available.

### 6. Location and Service Area

Purpose: define geographic targeting for local SEO pages and service coverage.

Fields for service-area entities:

- areaName — display name, e.g. "Mississauga"
- areaType — city, neighbourhood, or region
- parentArea — optional reference to a broader area for hierarchy
- latitude — optional center point
- longitude — optional center point
- radiusKm — optional coverage radius
- geoModifier — SEO keyword modifier, e.g. "in Mississauga" or "near Square One"

Fields for service entities (service-area linkage):

- servedAreas — references to service-area entities this service covers

Reuse rule: location data lives in the serviceAreas collection. Services and pages reference service areas rather than storing location data inline. This prevents duplication and inconsistency when the same area appears on multiple pages.

Boundary note: detailed mapping, polygon boundaries, and driving-distance logic are out of scope. Simple center-point and radius are sufficient for V1.

### 7. Lead (Front-Office)

Purpose: capture inbound and outbound prospect data for the sales workflow.

Fields:

- companyName
- websiteUrl
- serviceCategory — what type of home service they provide
- serviceArea — geographic area they serve
- contactName — person name if known
- contactEmail
- contactPhone
- contactPath — how we found or would reach them (web form, cold outreach, referral)
- websiteIssueSummary — key problems noted during audit
- evidenceNotes — supporting observations
- duplicateCheckStatus — new, possibleDuplicate, confirmedUnique
- outreachStatus — notContacted, contacted, responded, noResponse
- source — inbound_form, research_agent, manual_entry, referral
- createdAt
- updatedAt

Reuse rule: all lead intake paths (inbound contact form, research agent output, manual entry) must write to the same field structure. No path should create leads with a different shape.

Boundary note: this is the planning-level field set. Whether leads live in Payload, an external CRM, or both is a separate implementation decision.

### 8. Opportunity (Front-Office)

Purpose: track qualification and pursuit state for leads that pass initial review.

Fields:

- leadReference — link to the originating lead
- qualificationStatus — unqualified, qualified, rejected, onHold
- fitScore — numeric or categorical quality indicator
- urgencyConfidence — low, medium, high
- likelyTier — Launch, Growth, or Premium
- rationaleSummary — why this score and tier were assigned
- nextAction — recommended follow-up step
- outreachAngle — selected messaging approach
- responseStatus — pending, positive, negative, noResponse
- assignedTo — who owns follow-up (human or agent role)
- createdAt
- updatedAt

Reuse rule: opportunities are always linked to a lead. Standalone opportunities without a lead reference are not allowed.

Boundary note: opportunity progression into proposals, contracts, and project records is deferred. This schema covers research through outreach only.

## Entities That Do NOT Share a Field Group

These entities have fields specific to their domain and should not be forced into shared groups:

1. **Posts / blog content** — body content structure, author, category, and tags are blog-specific. Posts share SEO, publication status, and slug groups but nothing else from above.

2. **Reviews / testimonials** — reviewer name, rating, review text, service reference, and display approval are review-specific. Reviews share publication status but not SEO (they are not individually routable in V1).

3. **Media / assets** — alt text, focal point, file metadata are media-specific. Media does not use publication status, SEO, or slug groups.

4. **Blocks** — block configuration fields are block-specific. Blocks are embedded in collections, not standalone entities with their own status or SEO.

5. **Navigation (header/footer)** — link structure, menu hierarchy, and CTA placement are navigation-specific. Navigation globals pull from business identity and CTA groups but do not share other field groups.

## Status and Convention Summary

| Convention | Rule |
|---|---|
| Publication status | draft / published / archived — no other values |
| Slug format | lowercase, hyphen-separated, auto-generated from title, manually overridable |
| Date fields | ISO 8601, UTC storage, local display |
| Phone fields | store as E.164 format, display formatted |
| SEO field group | metaTitle and metaDescription overrides available on all public collections |
| CTA default | global CTA is the fallback; page-level override is optional |
| Lead source tracking | every lead must have a source value |
| Opportunity linkage | every opportunity must reference a lead |

## Explicit Deferrals

1. **Payload collection and global implementation** — deferred to next task (reconcile implemented collections against this schema)
2. **Block field definitions** — deferred to block implementation phase
3. **CRM integration schema** — deferred until CRM tool is selected
4. **Proposal and contract entities** — deferred until sales pipeline extends past outreach
5. **Multi-location schema** — V1 assumes single-location businesses; multi-location support is deferred
6. **Review aggregation and import schema** — deferred until review sourcing strategy is decided
7. **Structured data / JSON-LD field mapping** — deferred to SEO implementation phase
8. **Notification and delivery schema for leads** — deferred to lead delivery implementation, but required before leads feature is considered complete
9. **User roles and permissions schema** — deferred to security implementation phase
