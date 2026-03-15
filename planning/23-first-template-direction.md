# First Template Direction

This file defines the first home-services template family and the concrete demo-site brief that implementation work will execute against.

## Template Family: Local Home Services

One template family for owner-led or small-team GTA home-service businesses.

Optimized for credibility, conversion, and local SEO rather than heavy brand expression. Flexible enough to fit plumbing, HVAC, electrical, roofing, and landscaping without changing core page architecture.

### Design Intent

The template should feel:

1. trustworthy — clean layout, visible credentials, real reviews
2. fast to scan — clear hierarchy, short copy blocks, strong headings
3. lead-oriented — primary CTA visible on every page, multiple conversion touchpoints
4. strong on mobile — thumb-friendly CTAs, stacked blocks, no horizontal scrolling
5. local-service credible — area names, license numbers, real phone numbers

### Emphasis

1. primary CTA clarity — one dominant action per page
2. trust blocks near the top — indicators, licensing, years in business
3. service coverage and local area proof — service-area pages and geo-modifier content
4. review and credential visibility — featured reviews on homepage and service pages
5. straightforward service-page depth — clear scope, features, and next step per service

### Avoid

1. over-designed brand experiments before real sales feedback
2. niche-specific logic that only fits one trade
3. bespoke page architecture before real sales feedback exists
4. heavy animation or interaction patterns that slow perceived load

## Demo Business Profile

**Business name:** GTA Pro Plumbing
**Tagline:** Trusted Plumbing Experts Across the Greater Toronto Area
**Trade:** Residential and light commercial plumbing
**Location:** Single-location, serves the broader GTA
**Tier:** Growth (exercises service pages, service-area pages, reviews, FAQ, and blog capability)
**Year established:** 2015
**License:** Ontario licensed and insured (use placeholder number)
**Emergency:** Yes — 24/7 emergency plumbing line

### Why Plumbing

1. Highest lead value among common home-service trades
2. Emergency service angle exercises the emergency callout block
3. Most common home-services search category in the GTA
4. Multiple distinct services that justify individual service pages
5. Natural local SEO depth — people search "plumber in [city]"

## Site Map

### Pages (10 total — Growth tier max)

| Page | Route | Type |
|---|---|---|
| Homepage | `/` | pages collection, slug `home` |
| About | `/about` | pages collection, slug `about` |
| Services Index | `/services` | auto-generated listing |
| Drain Cleaning | `/services/drain-cleaning` | services collection |
| Water Heater Installation | `/services/water-heater-installation` | services collection |
| Pipe Repair & Replacement | `/services/pipe-repair-replacement` | services collection |
| Bathroom Plumbing | `/services/bathroom-plumbing` | services collection |
| Service Areas Index | `/service-areas` | auto-generated listing |
| Toronto | `/service-areas/toronto` | service-areas collection |
| Mississauga | `/service-areas/mississauga` | service-areas collection |
| Brampton | `/service-areas/brampton` | service-areas collection |
| Contact | `/contact` | dedicated contact route |

Blog index and posts exist at the route level but are seeded with 1-2 placeholder posts to prove the capability without heavy content investment.

## Page-by-Page Block Plan

### Homepage (`home`)

Block sequence and rationale:

| Order | Block | Content Purpose |
|---|---|---|
| 1 | hero | "GTA's Trusted Plumbing Experts" + CTA "Get a Free Estimate" |
| 2 | trustIndicators | 4 stats: Licensed & Insured, 2000+ Jobs Completed, 4.9 Rating, 24/7 Emergency |
| 3 | servicesGrid | Link to the 4 service pages with short summaries |
| 4 | processSteps | "How It Works" — 3 steps: Call/Book, We Diagnose, We Fix |
| 5 | review | 3-4 featured reviews |
| 6 | serviceAreaCoverage | "Serving the Greater Toronto Area" — link to area pages |
| 7 | emergencyCallout | "Plumbing Emergency?" + phone number + CTA |
| 8 | ctaBand | "Ready for a Free Estimate?" — final conversion push |

### About (`about`)

| Order | Block | Content Purpose |
|---|---|---|
| 1 | hero | "About GTA Pro Plumbing" + subheading about family-owned since 2015 |
| 2 | teamIntro | Owner story, team photo placeholder, values |
| 3 | trustIndicators | Licensed, insured, locally owned, background-checked techs |
| 4 | review | 2 featured reviews reinforcing trust |
| 5 | ctaBand | "Let's Talk About Your Project" |

### Service Pages (each follows the same pattern)

| Order | Block | Content Purpose |
|---|---|---|
| 1 | hero | Service-specific headline + CTA |
| 2 | serviceDetails | What's included, scope, features list |
| 3 | processSteps | Service-specific process (or reuse the general 3-step) |
| 4 | faq | 3-4 service-specific questions |
| 5 | review | 1-2 reviews relevant to that service |
| 6 | ctaBand | "Need [service]? Get a Free Estimate" |

#### Drain Cleaning
- Headline: "Professional Drain Cleaning in the GTA"
- Features: camera inspection, hydro jetting, kitchen/bath/main drains, preventive maintenance
- FAQ: how often, signs of a clog, cost range, emergency availability

#### Water Heater Installation
- Headline: "Water Heater Installation & Replacement"
- Features: tank and tankless options, same-day service, proper permits, old unit removal
- FAQ: tank vs tankless, how long installation takes, signs of failure, rebate eligibility

#### Pipe Repair & Replacement
- Headline: "Pipe Repair & Replacement You Can Trust"
- Features: burst pipe repair, repiping, leak detection, copper/PEX options
- FAQ: signs of pipe failure, repair vs replace, how long it takes, insurance coverage

#### Bathroom Plumbing
- Headline: "Complete Bathroom Plumbing Services"
- Features: fixture installation, toilet repair/replacement, shower valve work, renovation rough-in
- FAQ: renovation timeline, fixture recommendations, permit requirements, cost factors

### Service Area Pages (each follows the same pattern)

| Order | Block | Content Purpose |
|---|---|---|
| 1 | hero | "[City] Plumbing Services" + CTA |
| 2 | serviceAreaCoverage | Neighborhoods/zones served within this city |
| 3 | servicesGrid | All 4 services available in this area |
| 4 | trustIndicators | Local stats or general trust reinforcement |
| 5 | review | 1-2 reviews (ideally mentioning the area) |
| 6 | ctaBand | "Need a Plumber in [City]?" |

#### Toronto
- Geo-modifier: "in Toronto"
- Neighborhoods: Downtown, North York, Scarborough, Etobicoke

#### Mississauga
- Geo-modifier: "in Mississauga"
- Neighborhoods: Port Credit, Streetsville, Meadowvale, Erin Mills

#### Brampton
- Geo-modifier: "in Brampton"
- Neighborhoods: Bramalea, Heart Lake, Mount Pleasant, Castlemore

### Contact Page

The contact route is a dedicated page (not a pages-collection entry). It uses the ContactForm component directly with:

- Heading: "Get a Free Estimate"
- Description: "Tell us about your plumbing issue and we'll get back to you within the hour."
- Fields: name, email, phone, service (dropdown), message
- Turnstile spam protection
- Submission creates a Lead record

### Blog (minimal proof-of-capability)

Seed 2 posts:

1. "5 Signs You Need Emergency Drain Cleaning" — short, practical, links to drain cleaning service page
2. "Tank vs Tankless Water Heaters: Which Is Right for Your GTA Home?" — comparison post, links to water heater service page

## Global Settings for Demo

| Setting | Value |
|---|---|
| businessName | GTA Pro Plumbing |
| tagline | Trusted Plumbing Experts Across the Greater Toronto Area |
| phonePrimary | (416) 555-0199 |
| emailPrimary | hello@gtaproplumbing.com |
| address | 45 King St W, Toronto, ON M5H 1J8, CA |
| hoursSummary | Mon–Fri 7am–7pm, Sat 8am–4pm |
| emergencyAvailable | true |
| primaryCTA | label: "Get a Free Estimate", url: "/contact", style: "primary" |
| yearEstablished | 2015 |
| licenseNumber | ON-PLB-2015-DEMO |

## Review Content for Demo

Seed 6 reviews to have enough for homepage and per-page use:

1. Sarah M. / 5 stars — emergency drain clearing, fast response
2. James T. / 5 stars — water heater replacement, same-day
3. Maria L. / 5 stars — bathroom renovation plumbing, clean work
4. David K. / 4 stars — pipe repair, fair pricing, professional crew
5. Linda R. / 5 stars — kitchen drain unclogging, on time
6. Mike P. / 5 stars — tankless water heater install, excellent advice

## What This Proves

A completed demo at this spec proves:

1. The block library handles a real site structure without custom code
2. Growth-tier feature depth (service pages, service areas, blog, reviews) works end to end
3. The CMS content model supports realistic plumbing business content
4. Local SEO page patterns (geo-modified service-area pages) are achievable
5. The conversion path (hero CTA to contact form to Lead record) is functional
6. The system is credible enough to show in a sales conversation

## Explicit Deferrals

1. Visual polish and responsive tuning — addressed during implementation, not in this brief
2. Real photography — use placeholder images or solid color blocks
3. Blog content depth — 2 proof-of-concept posts only
4. Premium-tier blocks and patterns — not exercised in this demo
5. Booking or estimate calculator — deferred to add-on scope
6. Multi-location variants — single-location only

## Done Condition

This planning step is complete when:

1. The demo business profile is locked (GTA Pro Plumbing, Growth tier)
2. The site map is concrete (10 pages + blog)
3. Every page has a block plan that maps to existing block types
4. The content plan is specific enough to seed without improvising
5. The scope aligns with Growth-tier boundaries from `planning/01-business-model.md`

## Next Step After This

1. Update the seed script to populate the full demo content
2. Implement any missing page routes or block rendering gaps
3. Visual and responsive polish against the seeded demo
4. Use the completed demo for outreach and offer validation
