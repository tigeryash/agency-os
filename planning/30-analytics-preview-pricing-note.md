# Analytics, Preview, And Pricing Note

This note captures three immediate business and product gaps that surfaced after the starter became functional:

1. analytics exists only as a baseline placeholder, not yet as a sellable feature
2. editorial live preview is not wired yet, even though it materially improves CMS usability
3. pricing and delivery-hour assumptions need a tighter operating model before public launch

This is an advisory note. It does not lock pricing or package changes by itself.

## Current Repo Reality

### What already exists

1. `site-settings.analytics.googleAnalyticsId` exists in Payload
2. tier feature flags include `analytics` for Growth and Premium
3. contact form submissions persist to the `leads` collection
4. lead and opportunity records already support basic sales workflow tracking
5. `licenseNumber` and `yearEstablished` already exist in `site-settings`

### What is missing

1. no defined event taxonomy for marketing or lead tracking
2. no UTM capture, attribution fields, or campaign source normalization on inbound leads
3. no call tracking or click-to-call event strategy
4. no client-facing reporting surface or admin analytics dashboard
5. no Payload live preview wiring for draft content
6. no draft/version configuration on the main page collection
7. no explicit consent/privacy layer for analytics collection
8. no ROI messaging on the future agency site that ties features to business outcomes

## Repo Audit Summary

### Analytics

Analytics is partially present in planning and schema, but not yet implemented as a real capability.

Current implementation level:

1. configuration placeholder only
2. no tracking plan
3. no instrumentation
4. no reporting UI

Conclusion:

Analytics should not yet be sold as an established feature. It should be reframed as a near-term product gap to close before client launch.

### Live Preview

There is no evidence of Payload live preview or draft preview wiring in the current collections or config.

Current implementation level:

1. preview deploy thinking exists at the hosting level
2. editorial preview inside the admin does not exist yet
3. draft workflow also appears absent from the page collection

Conclusion:

Live preview should be treated as a baseline CMS trust feature, not a premium upsell. Even low-tier clients benefit from seeing content before publishing.

### Trust And Proof Fields

The schema already includes `licenseNumber`, `yearEstablished`, and `googleBusinessUrl`, but they are not consistently surfaced in the frontend.

Conclusion:

This is a presentation gap, not a schema gap.

## Recommended Product Decisions

### 1. Make analytics baseline sellable

Recommended package framing:

1. Launch includes basic analytics and lead-source visibility
2. Growth includes conversion tracking, UTM attribution, and monthly reporting baseline
3. Premium includes deeper funnel tracking, campaign views, and optional call tracking / dashboard customization

Reasoning:

If analytics is omitted from Launch, the agency loses one of the clearest post-launch proof loops. Even small clients want to know whether the site is working.

### 2. Make live preview baseline

Recommended package framing:

1. live preview available on all tiers
2. advanced workflow controls can still vary by tier
3. preview is positioned as editorial confidence, not as a premium feature

Reasoning:

Live preview reduces publishing anxiety, lowers revision churn, and makes Payload feel like a professional CMS rather than an internal tool.

### 3. Sell outcomes, not framework choice

The business site should avoid positioning around "Next.js" versus "WordPress" as the primary value argument.

Primary ROI claims should map to:

1. more calls from mobile visitors because contact paths are clearer
2. more qualified local traffic because service and area pages are structured for search intent
3. more trust because credentials, reviews, and proof are visible earlier in the page
4. more clarity because the owner can see where leads come from
5. faster internal updates because the CMS workflow is cleaner

## Minimal Sellable Analytics Package

### Launch

Purpose:

Give the owner basic confidence that the site is generating inquiries.

Include:

1. pageview tracking
2. contact form submission tracking
3. click-to-call tracking
4. basic source tracking where available
5. simple dashboard: leads this month, top pages, top lead source

Do not promise:

1. channel-level attribution accuracy
2. ad platform reporting
3. advanced funnel analysis

### Growth

Purpose:

Show what content and channels are creating business opportunities.

Include:

1. Launch features
2. UTM capture and storage on lead records
3. landing-page CTA event tracking
4. service-page conversion comparison
5. monthly reporting baseline
6. optional call-click tracking by page

### Premium

Purpose:

Support a more mature operator who wants better reporting and iteration decisions.

Include:

1. Growth features
2. optional call tracking integration if approved
3. richer funnel reporting by page group or campaign
4. dashboard tuning for the operator's KPI priorities
5. experiment-ready instrumentation for landing-page iteration

## Recommended Tracking Model

Track only what informs real decisions.

### Initial events

1. `page_viewed`
2. `cta_clicked`
3. `phone_clicked`
4. `contact_form_started`
5. `contact_form_submitted`
6. `service_page_viewed`
7. `service_area_page_viewed`

### Lead fields to add later

1. first-touch source
2. first-touch medium
3. first-touch campaign
4. landing page
5. referring URL
6. gclid / click-id style fields only if needed

### Dashboard metrics to show in admin

1. leads this month
2. leads by source
3. leads by landing page
4. contact-form conversion rate
5. click-to-call count
6. top-performing services or service areas

## Live Preview Recommendation

Recommended implementation target:

1. enable drafts/versioning on `pages`
2. wire Payload live preview to frontend draft routes
3. use preview-safe rendering that does not expose drafts publicly
4. keep preview available to authenticated admin users only

Business rationale:

1. clients and editors can approve content faster
2. less friction in revision rounds
3. more confidence in block-based editing
4. stronger perceived value even on Launch

## Pricing And Hours Sanity Check

The proposed prices are plausible for the GTA if the work looks credible and the scope stays bounded.

Do not treat current numbers as validated market truth until real close data exists.

### Recommended way to think about time

The listed hours are best treated as mature-system target ceilings, not first-project expectations.

Suggested target ceilings after repeatability:

1. Launch: 25 to 30 hours
2. Growth: 40 to 50 hours
3. Premium: 65 to 80 hours

Suggested planning assumption for the first few client projects:

1. Launch: 35 to 45 hours
2. Growth: 50 to 65 hours
3. Premium: 80 to 100 hours

Reasoning:

The early projects will include hidden time in client communication, revision handling, QA surprises, deployment polish, copy support, and packaging mistakes.

### Are the hours too low?

Not necessarily.

Low hours are acceptable when all of the following are true:

1. the service is fixed-price and productized
2. the template and block system do most of the repeatable work
3. revisions are tightly bounded
4. discovery is scoped and disciplined
5. the client is buying the outcome, not rented hours

Low hours become dangerous when:

1. scope is still fuzzy
2. every project behaves like custom design and development
3. content is under-scoped and falls onto delivery time
4. integrations are promised too loosely

### Client perception of fast delivery

Fast delivery is not a problem by itself.

Clients generally care about:

1. whether the site looks credible
2. whether it helps them win business
3. whether edits are easy
4. whether the process feels controlled

They usually do not need an internal breakdown of how much of the system is templated or AI-assisted.

Recommended stance:

1. sell fixed-price outcomes, not time spent
2. describe the process as productized and efficient
3. do not volunteer "AI built this fast" as the pitch
4. if asked directly, answer honestly that internal tools accelerate production, but quality control and approvals remain human-owned

## Recommended Business-Site Messaging Themes

The future agency site should explicitly sell these advantages:

1. conversion-focused structure for home-service buyers
2. local SEO page architecture for services and service areas
3. trust blocks: license, years in business, reviews, proof
4. clear lead tracking and performance visibility
5. fast launch because the delivery system is repeatable, not because corners are cut

## Recommended Next Implementation Order

1. add live preview and draft workflow
2. add analytics baseline instrumentation and attribution capture
3. surface license, years in business, and proof blocks more aggressively in the template
4. build the agency site around outcome-based messaging and one strong demo
5. validate pricing with real outreach, meetings, and first-project time tracking

## Open Questions

1. Which analytics stack should be the default: GA4, Plausible, or a hybrid?
2. Should the client-facing dashboard live inside Payload admin, a custom route, or emailed monthly reports first?
3. How much reporting belongs in Launch before complexity outweighs value?
4. Should call tracking be a Premium add-on rather than a core package feature?
