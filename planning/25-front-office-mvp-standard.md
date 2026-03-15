# Front-Office MVP Standard

This file defines the operational standard for the first front-office workflow: Research → Qualification → Outreach.

It contains the qualification rubric, outreach framework, and handoff contract that make the agent layer actionable with consistent human review.

## Part 1: Qualification Rubric

### Scoring Dimensions

Each researched lead is scored across four dimensions. Each dimension is rated 1–5.

#### 1. Website Quality (weight: 30%)

What to evaluate:

- Is the site mobile-responsive?
- Does it load in under 3 seconds?
- Is there a clear contact path (form, phone, or both)?
- Is the design outdated or broken?
- Are there obvious conversion blockers?

| Score | Meaning |
|---|---|
| 1 | Modern, fast, well-structured site — low improvement opportunity |
| 2 | Decent site with minor issues — limited value proposition |
| 3 | Noticeable problems — outdated design, weak CTAs, or slow load |
| 4 | Significant issues — missing contact paths, broken layout, no mobile support |
| 5 | No site, placeholder page, or fundamentally unusable — high opportunity |

Note: a score of 1 means there is little for us to improve. High scores indicate high opportunity.

#### 2. Business Fit (weight: 30%)

What to evaluate:

- Is this a home service business in the GTA?
- Does the service category match our niche (plumbing, HVAC, electrical, roofing, landscaping, cleaning, pest control, general contracting, etc.)?
- Is the business currently operating and verifiable?
- Does the business appear to serve residential or light commercial customers?

| Score | Meaning |
|---|---|
| 1 | Outside niche, outside GTA, or not verifiable |
| 2 | Tangentially related or edge-case fit |
| 3 | Correct niche and geography but limited signals of active operation |
| 4 | Clear niche fit, active business, serves appropriate customer base |
| 5 | Strong niche fit, established operation, multiple service lines or areas |

#### 3. Urgency Signals (weight: 20%)

What to evaluate:

- Is the current site clearly hurting the business (broken forms, no mobile, no local SEO)?
- Are there signs of active marketing spend (Google Ads, social ads) that a bad site wastes?
- Is there seasonal timing relevance (e.g., HVAC before summer/winter)?
- Are competitors in the same area visibly ahead online?

| Score | Meaning |
|---|---|
| 1 | No urgency signals detected |
| 2 | Weak or speculative urgency |
| 3 | Moderate — one clear signal (e.g., competitors ahead, seasonal timing) |
| 4 | Strong — multiple signals (e.g., running ads with a bad site) |
| 5 | Critical — obvious money being lost now (broken forms + active ad spend, etc.) |

#### 4. Budget Indicators (weight: 20%)

What to evaluate:

- Does the business appear established (years in operation, team size, service breadth)?
- Are there signs of existing marketing investment (ads, branded vehicles, professional photos)?
- Does the Google Business Profile show volume (review count, response activity)?
- Is this a premium service category (e.g., roofing, HVAC tend to have higher margins than cleaning)?

| Score | Meaning |
|---|---|
| 1 | Very small or new operation, no visible investment |
| 2 | Small operation with minimal marketing evidence |
| 3 | Established small business, some marketing investment visible |
| 4 | Clearly established, multiple signals of marketing spend |
| 5 | Mature operation, strong review volume, visible brand investment |

### Composite Score Calculation

Composite = (Website Quality × 0.30) + (Business Fit × 0.30) + (Urgency × 0.20) + (Budget × 0.20)

Range: 1.0 – 5.0

### Decision Thresholds

| Composite Score | Decision | Action |
|---|---|---|
| 3.5 – 5.0 | **Pursue** | Move to outreach preparation immediately |
| 2.5 – 3.4 | **Hold** | Flag for periodic re-evaluation or batch review |
| 1.0 – 2.4 | **Reject** | Archive with reason; do not pursue |

### Override Rules

- A Business Fit score of 1 is an automatic reject regardless of composite.
- A Website Quality score of 1 combined with Budget Indicators of 1 or 2 is an automatic reject (good site + low budget = no opportunity).
- A human reviewer can override any automated decision. Overrides must include a one-line rationale that is recorded on the Opportunity.

### Tier-Fit Heuristics

After a pursue decision, map the lead to a likely tier:

| Signal Pattern | Likely Tier |
|---|---|
| Small operation, 1 service area, needs basic credibility and contact paths | **Launch** |
| Established business, multiple services or areas, needs lead generation and local coverage | **Growth** |
| Mature operator, higher brand expectations, complex service mix, or approved custom needs | **Premium** |

Supporting rules:

- Default to Growth when signals are ambiguous — it is the primary offer.
- Only recommend Launch when the business is clearly small-scale and cost-sensitive.
- Only recommend Premium when there is evidence of business maturity AND higher expectations (brand investment, service breadth, team size).
- Tier assignment is a hypothesis, not a commitment. Discovery refines it.

## Part 2: Outreach Framework

### Evidence Requirements Before Outreach

Outreach is not allowed unless all of the following are true:

1. The lead has a pursue decision from qualification (composite ≥ 3.5 or human override).
2. A human has reviewed and approved the qualification decision.
3. At least two specific, verifiable website observations exist in the lead record.
4. A contact path exists (email, contact form URL, phone, or social DM).
5. The lead has been checked for duplicates (duplicateCheckStatus is confirmedUnique).

If any condition is not met, the Outreach Agent must escalate rather than draft.

### Outreach Angle Selection

The outreach angle is selected based on the intersection of service category and likely tier. The angle determines the primary hook — what specific value we lead with.

#### Angle Matrix

| Service Category | Launch Angle | Growth Angle | Premium Angle |
|---|---|---|---|
| HVAC | "Your site doesn't show up for [area] HVAC — here's what's missing" | "You're running ads but your landing page has no clear booking path" | "Your competitors in [area] have service-area pages ranking — you could own more territory" |
| Plumbing | "Customers searching emergency plumber in [area] can't find you easily" | "Your site lists services but doesn't capture leads — you're losing calls to competitors with forms" | "You cover [N] areas but your site doesn't have local pages — that's a ranking gap" |
| Electrical | "Your site looks outdated and doesn't build trust for a licensed trade" | "You have good reviews but your site doesn't showcase them or drive estimate requests" | "Your service range deserves a site that matches — right now it undersells you" |
| Roofing | "Homeowners checking your site on mobile have a bad experience — that costs you jobs" | "You're investing in your brand but your site doesn't convert visitors to estimates" | "Your business has grown past what your current site can represent" |
| Landscaping | "Your site doesn't show your work — a gallery and clear contact path would change that" | "Seasonal search for [service] in [area] is peaking and your site isn't ready" | "You serve [N] areas with [N] services — your site should be working as hard as you are" |
| Cleaning | "Customers compare cleaning services online — your site doesn't make the shortlist right now" | "You have strong reviews but no way to convert website visitors to bookings" | "Your brand deserves a site that reflects the quality of your service" |
| General / Other | "Your website is the first thing potential customers see — right now it's not helping you" | "You're leaving leads on the table — your site traffic isn't converting" | "You've built a strong business — your online presence should match" |

Usage rules:

- These are starter templates, not copy-paste scripts. The Outreach Agent must personalize using actual audit evidence.
- The angle must reference at least one real observation from the website audit.
- If no angle from the matrix fits, the agent must escalate for human angle selection.

### Message Structure

Every initial outreach message must follow this structure:

1. **Opener** (1 sentence) — reference something specific about their business, not generic flattery
2. **Observation** (1–2 sentences) — one or two real findings from the audit, stated factually
3. **Bridge** (1 sentence) — connect the observation to a business outcome they care about
4. **Offer** (1 sentence) — what we can do, framed as low-commitment
5. **CTA** (1 sentence) — single, low-friction next step

Total length: 80–120 words. Shorter is better.

### What To Avoid

- Generic openers ("I came across your business...")
- Invented familiarity or false social proof
- Technical jargon the recipient won't understand
- Claims about results we can't defend
- Mentioning pricing or tier names in initial outreach
- Pressuring language or artificial urgency

### Follow-Up Cadence

| Sequence Step | Timing | Purpose |
|---|---|---|
| Initial message | Day 0 | Lead with value observation |
| Follow-up 1 | Day 3–4 | Add a second observation or angle; do not repeat the first message |
| Follow-up 2 | Day 7–8 | Shorter, lighter touch — "wanted to make sure this didn't get buried" |
| Final follow-up | Day 14 | Close the loop — "no worries if the timing isn't right, happy to revisit later" |

Rules:

- Stop immediately if the lead replies (positive or negative).
- A negative reply means mark as noResponse or negative and archive. Do not argue or re-engage.
- Each follow-up must be approved by a human before sending.
- If no response after the full sequence, move the lead to hold for re-evaluation in 60–90 days.

### Channel Priority

1. **Email** — preferred when a direct business email is available
2. **Contact form** — acceptable when no direct email exists; adapt message to form constraints
3. **Phone** — only for high-urgency, high-fit leads (composite ≥ 4.0); requires human to make the call
4. **Social DM** — last resort; only if no other path exists and the business is active on the platform

## Part 3: Handoff Contract

### Stage Transitions and Required Field Updates

#### Research → Qualification

**Trigger**: Research Agent completes a lead audit.

**Lead record must have these fields populated:**

| Field | Required | Notes |
|---|---|---|
| companyName | yes | |
| websiteUrl | yes | or explicit "no website" |
| serviceCategory | yes | |
| serviceArea | yes | |
| contactName | if available | |
| contactEmail | if available | |
| contactPhone | if available | |
| contactPath | yes | at least one contact method or path |
| websiteIssueSummary | yes | minimum 2 specific observations |
| evidenceNotes | yes | supporting detail for each observation |
| duplicateCheckStatus | yes | must be confirmedUnique or possibleDuplicate |
| source | yes | research_agent for this workflow |
| outreachStatus | yes | must be notContacted |

**Handoff blocked if:**

- websiteIssueSummary is empty or contains only generic statements
- duplicateCheckStatus is possibleDuplicate (must be resolved first)
- serviceCategory or serviceArea is missing
- no contactPath of any kind exists

**Opportunity record created at handoff with:**

| Field | Value |
|---|---|
| leadReference | link to the lead |
| qualificationStatus | unqualified |
| fitScore | null (pending) |
| urgencyConfidence | null (pending) |
| likelyTier | null (pending) |
| rationaleSummary | null (pending) |
| nextAction | "qualification review" |
| outreachAngle | null (pending) |
| responseStatus | pending |
| assignedTo | Qualification Agent |

#### Qualification → Outreach

**Trigger**: Qualification Agent completes scoring AND a human approves the pursue decision.

**Opportunity record must be updated to:**

| Field | Value |
|---|---|
| qualificationStatus | qualified |
| fitScore | composite score (1.0–5.0) |
| urgencyConfidence | low, medium, or high |
| likelyTier | Launch, Growth, or Premium |
| rationaleSummary | 2–4 sentence summary covering all four dimensions |
| nextAction | "outreach preparation" |
| assignedTo | Outreach Agent |

**Lead record must be updated to:**

| Field | Value |
|---|---|
| outreachStatus | notContacted (unchanged, confirms ready state) |

**Human approval gate:**

The human reviewer must confirm:

1. The pursue decision is reasonable given the evidence.
2. The tier hypothesis is plausible.
3. The lead is worth sales effort now.

Approval is recorded as a status change on the Opportunity (qualificationStatus → qualified). Rejection changes it to rejected or onHold with a rationale note.

**Handoff blocked if:**

- fitScore is missing
- rationaleSummary is empty
- qualificationStatus is not "qualified"
- human approval has not been recorded

#### Outreach → Post-Outreach

**Trigger**: Outreach Agent produces approved drafts AND a human approves the first message for sending.

**Opportunity record must be updated to:**

| Field | Value |
|---|---|
| outreachAngle | selected angle description |
| nextAction | "awaiting response" or specific follow-up step |
| assignedTo | human (for send and response monitoring) |

**Lead record must be updated to:**

| Field | Value |
|---|---|
| outreachStatus | contacted |

**After response received, update:**

| Field | Value |
|---|---|
| Opportunity.responseStatus | positive, negative, or noResponse |
| Opportunity.nextAction | meeting, follow-up, archive, or hold |

**Handoff blocked if:**

- The outreach draft has not been human-approved
- The message contains claims not supported by the audit evidence
- Evidence requirements from Part 2 are not met

### Failure Rules

| Failure | Handling |
|---|---|
| Research Agent cannot verify the business exists | Reject the lead. Do not pass to qualification. |
| Research Agent finds only generic website issues | Return for re-research with specific audit instructions, or reject if the site is genuinely fine. |
| Qualification Agent receives incomplete lead data | Return to Research Agent with a list of missing fields. Do not score incomplete leads. |
| Qualification signals conflict strongly | Escalate to human with the conflicting signals highlighted. Do not force a score. |
| Outreach Agent lacks sufficient personalization evidence | Escalate to human. Do not draft generic outreach. |
| Outreach contact path is invalid or bounces | Move lead to hold. Flag for re-research of contact path. |
| Lead responds negatively | Record negative response. Archive. Do not re-engage. |
| No response after full follow-up sequence | Move to hold for re-evaluation in 60–90 days. |

### Approval Gate Summary

| Gate | Who Approves | What They Check |
|---|---|---|
| Research → Qualification | Optional batch review | Lead quality and audit specificity |
| Qualification → Outreach | **Required** human review | Pursue decision, tier fit, evidence quality |
| Outreach → Send | **Required** human review | Factual accuracy, tone, compliance, CTA appropriateness |
| Each follow-up → Send | **Required** human review | Message adds value, not just repetition |

## Appendix: Sample Walkthrough

**Lead**: GTA Comfort HVAC, Mississauga

1. **Research** produces: website is 5+ years old, no mobile optimization, no contact form (only a phone number buried in footer), no service-area pages, Google Business Profile has 47 reviews at 4.6 stars, running Google Ads pointing to the homepage.

2. **Qualification** scores:
   - Website Quality: 4 (significant issues — no form, no mobile, no local pages)
   - Business Fit: 5 (HVAC in Mississauga, clearly active, residential focus)
   - Urgency: 5 (running ads to a bad landing page — actively wasting money)
   - Budget: 4 (47 reviews, active ads, established operation)
   - **Composite: 4.4 → Pursue**
   - Likely tier: **Growth** (multiple service areas likely, needs lead capture and local pages)

3. **Human approves** the pursue decision.

4. **Outreach** drafts using the HVAC/Growth angle, personalized:
   > Hi [Name], I noticed GTA Comfort's site doesn't have a booking or estimate form — customers land on your homepage from your Google Ads and the only option is to find the phone number. You're probably losing leads after hours. We build lead-ready sites specifically for HVAC companies in the GTA — would a 10-minute look at what a better landing page could do be worth your time?

5. **Human reviews**, adjusts tone, approves send.

6. **Records updated**: outreachStatus → contacted, outreachAngle → "ad spend waste + missing lead capture", responseStatus → pending.
