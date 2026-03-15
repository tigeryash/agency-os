# Starter Architecture

This file defines the V1 starter architecture for the first niche: home services in the Greater Toronto Area.

The goal is to create a repeatable Next.js + Payload foundation that supports the Launch, Growth, and Premium tiers without becoming a one-off custom build.

## Architecture Goal

The starter should make it fast to launch high-quality home-service websites with:

1. a strong trust-oriented information architecture
2. clear lead-capture paths
3. reusable content blocks
4. editable CMS-managed content
5. controlled customization by tier

## V1 Principles

1. one strong template family first
2. one reusable design-token system
3. one reusable block library
4. package-based feature boundaries
5. clean default SEO and analytics baseline
6. no unnecessary abstraction before the first real delivery

## Core Stack

1. Next.js for frontend routing, rendering, and deployment
2. Payload CMS for admin, content models, and block-driven page editing
3. one shared component and token system for all initial templates
4. one deployment baseline suitable for brochure and lead-gen sites

## V1 Site Shape

The initial template family should support these default page types:

1. Home
2. About
3. Services overview
4. Individual service page
5. Service area page
6. Contact
7. FAQ or trust page
8. Blog or resource page for Growth and above

## V1 Core Blocks

The initial block library should include:

1. hero
2. primary CTA band
3. service grid
4. service-detail section
5. testimonials / reviews
6. trust indicators / credentials
7. process or how-it-works
8. before-and-after or result highlights
9. FAQ
10. service-area coverage section
11. contact / estimate-request form
12. sticky CTA or repeated lead-capture section
13. team / company credibility section
14. blog preview
15. emergency or priority callout block if relevant

## Design System Requirements

The design-token system should define:

1. typography scale
2. spacing scale
3. color roles
4. surface and section treatments
5. CTA and button variants
6. card and list patterns
7. responsive layout rules
8. motion rules for subtle polish

The system should optimize for trust, legibility, and clear calls to action.

## CMS Model Requirements

Payload should support at least:

1. Pages collection with block-based content
2. Global site settings
3. Navigation and footer settings
4. Testimonials or reviews collection
5. Service categories or services collection
6. Service areas collection
7. Blog posts or articles collection
8. Media handling
9. SEO fields

## Tier Mapping

### Launch Tier

Should support:

1. core pages only
2. essential blocks only
3. one primary lead form flow
4. simpler navigation and content structure

### Growth Tier

Should add:

1. dedicated service pages
2. service-area pages
3. blog or resource support
4. more conversion-oriented CTA repetition
5. stronger analytics and lead-capture options

### Premium Tier

Should add:

1. approved custom sections
2. expanded page structures
3. more tailored layout tuning
4. approved advanced integrations or workflows

## Feature Flags Or Configuration Boundaries

The starter should support simple package-based toggles for:

1. blog enabled or disabled
2. service areas enabled or disabled
3. extra lead-form variants enabled or disabled
4. premium blocks enabled or disabled
5. advanced integrations enabled or disabled

## Required Non-Visual Baseline

Every generated project should include:

1. metadata and SEO baseline
2. analytics baseline
3. form submission handling
4. image optimization approach
5. sitemap and robots support
6. responsive layout baseline
7. accessibility-conscious defaults

## What Not To Build Yet

Do not add yet:

1. highly abstract multi-theme architecture
2. fully generic cross-industry templates
3. complex client portals
4. heavy workflow automation inside the starter
5. advanced CRM sync inside the base template

## Deliverables For The Starter Build Phase

The starter-architecture phase is complete when it includes:

1. one home-services template family
2. one working design-token system
3. one working block library
4. Payload content structures for the core page types
5. tier-aware feature boundaries
6. a path to generate a real project for Launch and Growth at minimum

## Dependencies On Other Planning Files

This architecture depends on:

1. `01-business-model.md` for package structure
2. `10-front-office-workflow.md` for the shape of the intake and tier mapping
3. agent specs for Content, Design Planning, Build, QA, and PM

## Next Architecture Decisions

The next technical planning steps should be:

1. choose the exact project structure for Next.js + Payload
2. define the initial Payload collections and globals
3. define the initial block inventory and page templates
4. define the design-token system and visual rules