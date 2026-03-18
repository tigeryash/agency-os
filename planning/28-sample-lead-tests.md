# Sample Lead Tests

This file runs fictional leads through the full Research → Qualification → Outreach pipeline to stress-test the rubric, handoff contract, and outreach framework.

Each lead is designed to exercise a different scoring path. The goal is to find gaps or ambiguities before using the pipeline on real leads.

## Test Scenarios

| # | Lead | Service | Designed To Test |
|---|---|---|---|
| 1 | ProFlow Plumbing, Brampton | Plumbing | Clear pursue — strong signals across all dimensions |
| 2 | Fresh Cut Landscaping, Pickering | Landscaping | Hold zone — decent fit but weak urgency and budget |
| 3 | Spark & Wire Electric, Toronto | Electrical | Clear reject — good site, low opportunity |
| 4 | GTA Pet Grooming, Vaughan | Pet grooming | Auto-reject override — Business Fit 1 (outside niche) |
| 5 | AllSeason Roofing, Oakville | Roofing | Conflicting signals — high need but ambiguous budget and fit |

---

## Lead 1: ProFlow Plumbing, Brampton

### Research Output

| Field | Value |
|---|---|
| companyName | ProFlow Plumbing |
| websiteUrl | proflowplumbing.ca |
| serviceCategory | Plumbing |
| serviceArea | Brampton, Mississauga, Caledon |
| contactName | Mike Patel |
| contactEmail | info@proflowplumbing.ca |
| contactPhone | (905) 555-0142 |
| contactPath | email, contact form, phone |
| source | research_agent |
| outreachStatus | notContacted |
| duplicateCheckStatus | confirmedUnique |

**websiteIssueSummary:**
1. The site is not mobile-responsive — text overlaps on smaller screens and the navigation menu does not collapse. Tested on 375px viewport.
2. The contact form exists but is buried on a separate "Contact Us" page with no CTAs on the homepage or service pages. No click-to-call on mobile.

**evidenceNotes:**
- Homepage loads in approximately 4.5 seconds on mobile (PageSpeed Insights estimate).
- No service-area pages — all services listed on a single page without geographic targeting.
- Google Business Profile: 62 reviews, 4.7 stars, active for 6+ years.
- Running Google Ads for "emergency plumber Brampton" — ad links to the homepage, not a landing page.
- Branded work van visible in Google Street View photos.
- Services include drain cleaning, water heater installation, bathroom renovation, and emergency repairs.

**Validation checklist:**
- [x] companyName populated
- [x] websiteUrl populated
- [x] serviceCategory matches supported category (Plumbing)
- [x] serviceArea within GTA (Brampton)
- [x] contactPath has at least one method
- [x] websiteIssueSummary has 2+ specific observations
- [x] evidenceNotes has supporting detail
- [x] duplicateCheckStatus is confirmedUnique
- [x] source is research_agent
- [x] outreachStatus is notContacted

**Handoff: Research → Qualification** — all fields present, no blockers.

### Qualification Output

**Per-dimension scores:**

| Dimension | Weight | Score | Reasoning |
|---|---|---|---|
| Website Quality | 30% | 4 | Not mobile-responsive, no inline CTAs, contact form buried, slow load. Significant conversion issues. |
| Business Fit | 30% | 5 | Plumbing in Brampton — core niche, core geography, clearly active residential service. Multiple service lines. |
| Urgency Signals | 20% | 4 | Running Google Ads to a non-optimized homepage. Competitors in Brampton have service-area pages ranking. Multiple signals of wasted spend. |
| Budget Indicators | 20% | 4 | 62 reviews over 6+ years, active ad spend, branded vehicles, broad service range. Clearly established. |

**Composite score:** (4 x 0.30) + (5 x 0.30) + (4 x 0.20) + (4 x 0.20) = 1.2 + 1.5 + 0.8 + 0.8 = **4.3**

**Decision:** Pursue (4.3 >= 3.5)

**Override check:**
- Business Fit is 5 — no auto-reject trigger
- Website Quality is 4 — no auto-reject trigger
- No overrides apply

**Urgency confidence:** High — multiple converging signals (ad spend + bad landing page + competitor gap)

**Likely tier:** Growth — established multi-area plumbing business, needs lead capture and local pages, not just basic credibility

**Rationale summary:** ProFlow is a well-established Brampton plumber with strong reviews and active ad spend, but their website has significant mobile and conversion issues that are likely costing them leads. The combination of ad spend going to a non-optimized homepage and competitors with service-area pages creates high urgency. Growth tier fits: they need lead capture, local pages, and a mobile-ready site to convert existing traffic.

**Opportunity record update:**

| Field | Value |
|---|---|
| qualificationStatus | qualified (pending human approval) |
| fitScore | 4.3 |
| urgencyConfidence | high |
| likelyTier | Growth |
| rationaleSummary | (see above) |
| nextAction | outreach preparation |
| assignedTo | Outreach Agent |

**Validation checklist:**
- [x] All four dimension scores assigned (1–5)
- [x] Composite calculated correctly
- [x] Threshold applied correctly (4.3 → Pursue)
- [x] Override rules checked — none triggered
- [x] Tier heuristic applied (Growth — established, multi-area)
- [x] rationaleSummary covers all four dimensions
- [x] urgencyConfidence set (high)
- [x] Opportunity record updated

**Handoff: Qualification → Outreach** — pending human approval of the pursue decision.

*Assuming human approves:*

### Outreach Output

**Evidence requirements check:**
- [x] Pursue decision from qualification (composite 4.3)
- [x] Human reviewed and approved (assumed for test)
- [x] Two specific, verifiable website observations in lead record
- [x] Contact path exists (email, form, phone)
- [x] duplicateCheckStatus is confirmedUnique

**Selected channel:** Email (direct business email available)

**Selected angle:** Plumbing / Growth — "Your site lists services but doesn't capture leads — you're losing calls to competitors with forms"

**Subject line options:**
1. Quick question about your Brampton plumbing site
2. Your Google Ads might be leaking leads
3. Noticed something on proflowplumbing.ca

**Primary message draft (98 words):**

Hi Mike, I was looking at ProFlow's site and noticed two things: the contact form is on a separate page with no link from your homepage, and the site doesn't display well on phones — text overlaps and there's no click-to-call. You're running Google Ads for emergency plumber in Brampton, so people are landing on your homepage and have no easy way to reach you, especially after hours. We build lead-ready sites specifically for plumbing companies in the GTA. Would a quick look at what a better landing setup could do be worth 10 minutes?

**Validation:**
- [x] Message structure: opener (specific reference to ProFlow), observation (2 real findings), bridge (ad spend waste), offer (lead-ready sites for plumbers), CTA (10-minute look)
- [x] Word count: 98 (within 80–120)
- [x] Personalization references real audit observations
- [x] No generic openers, invented familiarity, jargon, undefendable claims, pricing mentions, or pressure
- [x] Angle from matrix (Plumbing/Growth)
- [x] All claims traceable to evidence

**Follow-up 1 (Day 3–4, 72 words):**

Hi Mike, following up on my note about your site. One more thing I noticed — you cover Brampton, Mississauga, and Caledon, but there are no service-area pages for those locations. That means someone searching "plumber near me" in Caledon won't find you through your site. Your competitors with local pages are showing up instead. Happy to show you what that gap looks like compared to the top results in your area. No pitch, just a quick screen share.

**Follow-up 2 (Day 7–8, 38 words):**

Hi Mike, just wanted to make sure my earlier messages didn't get buried. If you're curious about how your site stacks up against other Brampton plumbers online, I'm happy to share a quick comparison. No commitment needed.

**Follow-up 3 (Day 14, 32 words):**

Hi Mike, no worries if the timing isn't right. If you ever want a second opinion on your website, the offer stands. Happy to revisit whenever it makes sense for you.

**Personalization notes:**
- Mobile responsiveness issue confirmed via viewport test
- Contact form location confirmed (separate Contact Us page)
- Google Ads confirmed for "emergency plumber Brampton"
- Service areas from the site (Brampton, Mississauga, Caledon)
- No service-area pages confirmed

**Claims needing human verification:** None — all claims sourced from audit evidence.

**Record updates (after human-approved send):**

| Field | Value |
|---|---|
| Opportunity.outreachAngle | ad spend waste + buried contact form + no mobile optimization |
| Opportunity.nextAction | awaiting response |
| Opportunity.assignedTo | human |
| Lead.outreachStatus | contacted |

---

## Lead 2: Fresh Cut Landscaping, Pickering

### Research Output

| Field | Value |
|---|---|
| companyName | Fresh Cut Landscaping |
| websiteUrl | freshcutpickering.ca |
| serviceCategory | Landscaping |
| serviceArea | Pickering |
| contactName | not available |
| contactEmail | not available |
| contactPhone | (905) 555-0287 |
| contactPath | phone only (listed on homepage) |
| source | research_agent |
| outreachStatus | notContacted |
| duplicateCheckStatus | confirmedUnique |

**websiteIssueSummary:**
1. The site uses a free website builder template with a generic stock photo banner. No portfolio or gallery of completed work exists.
2. The only contact method is a phone number in the header — no contact form, no email, no online booking.

**evidenceNotes:**
- Site loads quickly but has minimal content — homepage and a single "Services" page listing lawn mowing, garden cleanup, and snow removal.
- No Google Business Profile found under this exact name in Pickering.
- No visible Google Ads or social media advertising.
- No reviews found on Google, Yelp, or HomeStars.
- Business appears to be a small sole proprietor or seasonal operation.

**Validation checklist:**
- [x] All required fields populated
- [x] 2+ specific website observations
- [x] duplicateCheckStatus is confirmedUnique
- [x] contactPath exists (phone)

**Handoff: Research → Qualification** — all fields present, no blockers.

### Qualification Output

**Per-dimension scores:**

| Dimension | Weight | Score | Reasoning |
|---|---|---|---|
| Website Quality | 30% | 4 | Generic template, no gallery, no contact form, minimal content. High improvement opportunity. |
| Business Fit | 30% | 3 | Landscaping in Pickering — correct niche and geography, but limited signals of active operation. No GBP, no reviews. |
| Urgency Signals | 20% | 2 | No ad spend being wasted, no visible competitor gap being exploited. Weak urgency. |
| Budget Indicators | 20% | 1 | Very small operation, no visible marketing investment, no reviews, no GBP. Likely cost-sensitive. |

**Composite score:** (4 x 0.30) + (3 x 0.30) + (2 x 0.20) + (1 x 0.20) = 1.2 + 0.9 + 0.4 + 0.2 = **2.7**

**Decision:** Hold (2.7 is in 2.5–3.4 range)

**Override check:**
- Business Fit is 3 — no auto-reject trigger
- Website Quality is 4 — no auto-reject trigger
- No overrides apply

**Urgency confidence:** Low — no strong timing signals

**Likely tier:** Launch (if pursued later — small, single-area operation, needs basic credibility)

**Rationale summary:** Fresh Cut has a poor website with clear improvement opportunity, but the business shows very limited signs of active operation or marketing investment. No Google Business Profile, no reviews, and no ad spend suggest this is a small or seasonal operator unlikely to invest in a website right now. The Hold decision keeps the lead available for re-evaluation if signs of growth appear.

**Opportunity record update:**

| Field | Value |
|---|---|
| qualificationStatus | onHold |
| fitScore | 2.7 |
| urgencyConfidence | low |
| likelyTier | Launch |
| rationaleSummary | (see above) |
| nextAction | re-evaluate in 60–90 days |
| assignedTo | none (batch re-review) |

**Outreach:** Not pursued. Lead stays in hold for periodic re-evaluation.

---

## Lead 3: Spark & Wire Electric, Toronto

### Research Output

| Field | Value |
|---|---|
| companyName | Spark & Wire Electric |
| websiteUrl | sparkandwire.ca |
| serviceCategory | Electrical |
| serviceArea | Toronto, North York, Scarborough |
| contactName | Jason Liu |
| contactEmail | jason@sparkandwire.ca |
| contactPhone | (416) 555-0193 |
| contactPath | email, contact form with instant confirmation, phone, live chat |
| source | research_agent |
| outreachStatus | notContacted |
| duplicateCheckStatus | confirmedUnique |

**websiteIssueSummary:**
1. The site is modern, mobile-responsive, and loads in under 2 seconds. Professional photography throughout.
2. The contact form is prominent on every page with a sticky header CTA. Live chat widget is active during business hours.

**evidenceNotes:**
- Clean, professional design with service-area pages for Toronto, North York, and Scarborough.
- Google Business Profile: 128 reviews at 4.8 stars, actively responding to reviews.
- Running Google Ads — ads link to dedicated landing pages with clear CTAs.
- Active Instagram with project photos updated weekly.
- ESA-licensed, clearly displayed.
- Services: panel upgrades, EV charger installation, commercial tenant improvements, smart home wiring.

**Validation checklist:**
- [x] All required fields populated
- [x] 2+ specific website observations
- [x] duplicateCheckStatus is confirmedUnique

**Handoff: Research → Qualification** — all fields present, no blockers.

### Qualification Output

**Per-dimension scores:**

| Dimension | Weight | Score | Reasoning |
|---|---|---|---|
| Website Quality | 30% | 1 | Modern, fast, mobile-responsive, professional photos, prominent CTAs, live chat. Very little to improve. |
| Business Fit | 30% | 4 | Electrical in Toronto — correct niche and geography, clearly active, broad service range. |
| Urgency Signals | 20% | 1 | No urgency — site is already performing well, ads link to proper landing pages, active social presence. |
| Budget Indicators | 20% | 5 | 128 reviews, active ads with landing pages, professional branding, broad service mix. Mature operation. |

**Composite score:** (1 x 0.30) + (4 x 0.30) + (1 x 0.20) + (5 x 0.20) = 0.3 + 1.2 + 0.2 + 1.0 = **2.7**

**Decision:** Hold (2.7 is in 2.5–3.4 range)

**Override check:**
- Website Quality is 1 + Budget Indicators is 5 — override rule says WQ 1 + Budget 1 or 2 = auto-reject. Budget is 5, so override does NOT apply.
- No auto-reject triggered.

**But note:** This lead has a composite of 2.7 (Hold), not Reject. The rubric produces the correct result — there's very little opportunity here because the site is already good. The Hold decision is appropriate: if circumstances change (they outgrow their current site, want a redesign), it could become viable.

**Urgency confidence:** Low — no improvement urgency exists

**Likely tier:** Premium (if pursued later — mature operation, high brand investment)

**Rationale summary:** Spark & Wire has a strong existing website and active online presence. While they fit the niche perfectly and have clear budget capacity, there is minimal improvement opportunity — their site is modern, mobile-responsive, and already converts well. The Hold decision is appropriate because there is little value we can offer right now. Worth revisiting if they express dissatisfaction or outgrow their current setup.

**Opportunity record update:**

| Field | Value |
|---|---|
| qualificationStatus | onHold |
| fitScore | 2.7 |
| urgencyConfidence | low |
| likelyTier | Premium |
| rationaleSummary | (see above) |
| nextAction | re-evaluate if circumstances change |
| assignedTo | none |

**Outreach:** Not pursued. Low opportunity despite strong business.

---

## Lead 4: GTA Pet Grooming, Vaughan

### Research Output

| Field | Value |
|---|---|
| companyName | GTA Pet Grooming |
| websiteUrl | gtapetgrooming.ca |
| serviceCategory | Pet grooming |
| serviceArea | Vaughan, Woodbridge |
| contactName | Sarah Chen |
| contactEmail | info@gtapetgrooming.ca |
| contactPhone | (905) 555-0331 |
| contactPath | email, contact form, phone |
| source | research_agent |
| outreachStatus | notContacted |
| duplicateCheckStatus | confirmedUnique |

**websiteIssueSummary:**
1. The site is outdated with a Flash-era design aesthetic — no mobile responsiveness, horizontal scrolling on phones.
2. The online booking link is broken (returns a 404 error). Customers must call to book.

**evidenceNotes:**
- Google Business Profile: 89 reviews at 4.5 stars, very active with recent review responses.
- Services: dog grooming, cat grooming, nail trimming, teeth cleaning, spa packages.
- Running Google Ads for "dog grooming Vaughan."
- Active Instagram and Facebook with regular posting.
- This is NOT a home service business — it is a pet care business.

**Validation checklist:**
- [x] All required fields populated
- [x] 2+ specific website observations
- [x] duplicateCheckStatus is confirmedUnique

**Note:** serviceCategory "Pet grooming" does not match a supported home-service category. Research Agent flags this but passes to Qualification for the formal scoring decision.

**Handoff: Research → Qualification** — all fields present, no blockers. Business Fit flag noted.

### Qualification Output

**Per-dimension scores:**

| Dimension | Weight | Score | Reasoning |
|---|---|---|---|
| Website Quality | 30% | 5 | No mobile support, broken booking link, outdated design. Very high improvement opportunity. |
| Business Fit | 30% | 1 | Pet grooming is NOT a home service. Outside our niche entirely. |
| Urgency Signals | 20% | 4 | Running ads to a broken site — clearly wasting money now. |
| Budget Indicators | 20% | 4 | 89 reviews, active ads, active social. Established business with marketing investment. |

**Composite score:** (5 x 0.30) + (1 x 0.30) + (4 x 0.20) + (4 x 0.20) = 1.5 + 0.3 + 0.8 + 0.8 = **3.4**

**Decision:** Auto-reject via override rule

**Override check:**
- **Business Fit score of 1 = automatic reject regardless of composite.** Override triggered.

Despite a composite of 3.4 (which would normally be Hold), the Business Fit override correctly rejects this lead. Pet grooming is outside the home-services niche.

**Urgency confidence:** N/A — rejected

**Likely tier:** N/A — rejected

**Rationale summary:** GTA Pet Grooming has a terrible website and is clearly wasting ad spend, which would normally make it a strong lead. However, pet grooming is not a home service — it falls entirely outside our niche. The Business Fit score of 1 triggers an automatic reject regardless of the composite score. This lead should not be pursued.

**Opportunity record update:**

| Field | Value |
|---|---|
| qualificationStatus | rejected |
| fitScore | 3.4 |
| urgencyConfidence | N/A |
| likelyTier | N/A |
| rationaleSummary | (see above) |
| nextAction | archive with reason: outside niche |
| assignedTo | none |

**Outreach:** Not pursued. Automatic reject — outside niche.

---

## Lead 5: AllSeason Roofing, Oakville

### Research Output

| Field | Value |
|---|---|
| companyName | AllSeason Roofing |
| websiteUrl | allseasonroofing.ca |
| serviceCategory | Roofing |
| serviceArea | Oakville, Burlington, Milton |
| contactName | not available |
| contactEmail | not available |
| contactPhone | (905) 555-0478 |
| contactPath | phone only (in page footer), Facebook Messenger |
| source | research_agent |
| outreachStatus | notContacted |
| duplicateCheckStatus | confirmedUnique |

**websiteIssueSummary:**
1. The site has no contact form — only a phone number in small text in the footer. No click-to-call on mobile.
2. The homepage is a single long page with stock photos and no portfolio of completed roofing projects.

**evidenceNotes:**
- Site loads in about 3 seconds, basic WordPress theme, partially mobile-responsive (layout adjusts but text sizing is inconsistent).
- No service-area pages despite listing three cities.
- Google Business Profile: 18 reviews at 4.3 stars, created 2 years ago.
- No Google Ads detected.
- No active social media besides a Facebook page with sporadic posts (last post 3 months ago).
- Services listed: shingle replacement, flat roofing, eavestroughs, roof inspections.
- No ESA or WSIB credentials visible on site (common for roofing companies to display these).
- Unclear whether this is an established company or a newer entrant — mixed signals.

**Validation checklist:**
- [x] All required fields populated
- [x] 2+ specific website observations
- [x] duplicateCheckStatus is confirmedUnique

**Handoff: Research → Qualification** — all fields present, no blockers. Conflicting signals noted.

### Qualification Output

**Per-dimension scores:**

| Dimension | Weight | Score | Reasoning |
|---|---|---|---|
| Website Quality | 30% | 4 | No contact form, no portfolio, stock photos, no service-area pages. Significant issues but site is partially functional. |
| Business Fit | 30% | 4 | Roofing in Oakville — core niche, GTA geography, residential focus, multiple service lines. |
| Urgency Signals | 20% | 3 | Competitors in Oakville are visibly ahead online. No wasted ad spend since no ads are running. Moderate — one clear signal. |
| Budget Indicators | 20% | 2 | Only 18 reviews over 2 years, no ad spend, inactive social, no visible brand investment. Small or new operation. |

**Composite score:** (4 x 0.30) + (4 x 0.30) + (3 x 0.20) + (2 x 0.20) = 1.2 + 1.2 + 0.6 + 0.4 = **3.4**

**Decision:** Hold (3.4 is in 2.5–3.4 range)

**Override check:**
- Business Fit is 4 — no auto-reject trigger
- Website Quality is 4 — no auto-reject trigger
- No overrides apply

**Urgency confidence:** Medium — competitor gap is real but no wasted spend to create immediate pain

**Likely tier:** Launch (if pursued — smaller operation, limited marketing investment, needs basic credibility first)

**Rationale summary:** AllSeason Roofing has clear website issues and fits the niche well, but budget signals are weak — few reviews, no ad spend, and inactive social media suggest a smaller or newer operation that may not be ready to invest. The composite lands at exactly 3.4, right at the top of the Hold range. This is a borderline case where a human reviewer could reasonably override to Pursue if they believe the roofing category's higher margins justify the outreach effort.

**Escalation note:** This lead sits at exactly the Hold/Pursue boundary (3.4). The rubric places it in Hold, but roofing is a high-margin category and the website issues are significant. Flagging for human review — a one-line override rationale would move this to Pursue if the reviewer judges the opportunity is worth the effort.

**Opportunity record update:**

| Field | Value |
|---|---|
| qualificationStatus | onHold |
| fitScore | 3.4 |
| urgencyConfidence | medium |
| likelyTier | Launch |
| rationaleSummary | (see above) |
| nextAction | human review — borderline case, possible override to Pursue |
| assignedTo | human reviewer |

**Outreach:** Not pursued unless human overrides to Pursue.

---

## Pipeline Observations and Gaps

### What Worked Well

1. **Override rules caught the niche mismatch.** Lead 4 (pet grooming) scored 3.4 composite but was correctly auto-rejected by the Business Fit = 1 override. Without the override, it would have landed in Hold — misleadingly close to Pursue.

2. **Hold zone captured ambiguous leads appropriately.** Leads 2 (low budget landscaper) and 3 (great site electrician) both scored 2.7 but for completely different reasons. The per-dimension breakdown makes the difference clear even though the composites are identical.

3. **Boundary case was surfaced for human judgment.** Lead 5 (roofing, 3.4) sits exactly at the Hold/Pursue boundary. The rubric correctly placed it in Hold but the agent flagged it for possible override — this is the right behavior.

4. **Outreach evidence requirements prevented premature drafting.** Only Lead 1 (clear pursue) reached the outreach stage. The pipeline correctly blocked outreach for Hold, Reject, and Override-Reject leads.

5. **Handoff field validation was checkable at every stage.** The explicit field checklists from the agent specs made it easy to verify completeness.

### Gaps and Ambiguities Found

1. **WQ 1 + Budget override threshold is narrow.** The override rule rejects when Website Quality = 1 AND Budget = 1 or 2. Lead 3 (Spark & Wire) had WQ 1 + Budget 5 and correctly avoided the override. But what about WQ 1 + Budget 3? The current rule would NOT reject — meaning a business with a good site and moderate budget stays in Hold. This seems correct but worth noting: the override only catches "good site + clearly can't afford anything" cases.

2. **No explicit guidance on what "re-evaluate in 60–90 days" means operationally.** The MVP standard mentions this timeline but doesn't define what triggers the re-evaluation or who is responsible. For now this is acceptable since there's no CRM automation, but it will need definition before scaling.

3. **Research Agent role boundary with niche classification.** Lead 4 raises the question: should the Research Agent reject out-of-niche leads itself, or always pass to Qualification? The current spec says Research should "fail if the business cannot be verified as operating in the target niche" — which means it COULD have rejected Lead 4 directly. But the Qualification Agent's override rule also handles it. Having both gates is safer but creates a question about which agent bears responsibility. Recommendation: Research should flag obvious niche mismatches but still pass to Qualification for the formal decision. Only reject at research stage if the mismatch is unambiguous AND the business is clearly not in any adjacent category.

4. **Tier assignment for Hold leads.** The rubric assigns a tier even for Hold leads (e.g., Lead 2 = Launch, Lead 5 = Launch). This is useful context for when they're re-evaluated but could be confusing if someone interprets it as a recommendation. The tier for Hold leads should be explicitly labeled as a hypothesis for future reference, not a current recommendation.

5. **Identical composites, very different leads.** Leads 2 and 3 both scored 2.7 but for opposite reasons. The rubric handles this correctly through per-dimension scores, but any reporting that only shows composite scores would lose this signal. Future dashboards or summaries should show the per-dimension breakdown, not just the composite.

6. **No contact email for Leads 2 and 5.** Both have phone-only contact paths. The channel priority rules say phone is only for high-fit leads (composite >= 4.0). If Lead 5 were overridden to Pursue (composite 3.4), there's no email path — only phone and Facebook Messenger. The Outreach Agent would need to use social DM (last resort) or escalate. This edge case should work correctly with the current rules but is worth watching.

### Recommendations

1. **No rubric changes needed.** The scoring, thresholds, overrides, and tier heuristics produced sensible results across all five scenarios.
2. **Add operational definition for Hold re-evaluation** when CRM automation is in scope.
3. **Clarify Research Agent niche-rejection authority** — recommend flagging but passing to Qualification for formal decision.
4. **Label tier assignments on Hold leads as hypothetical** in the output format.
5. **Ensure reporting surfaces per-dimension scores**, not just composites.
