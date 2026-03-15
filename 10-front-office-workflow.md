# Front-Office Workflow

This file maps the first end-to-end front-office workflow for:

1. Research
2. Qualification
3. Outreach

The goal is to make the first sales motion explicit before building tooling or orchestration.

## Scope

This workflow is for the home-services niche in the Greater Toronto Area.

It assumes the current offer structure is:

1. Launch
2. Growth
3. Premium

## Shared Records Used

The workflow writes to or updates:

1. Lead
2. Opportunity

The workflow may create early references used later by:

1. Client Brief
2. Proposal

## Stage 1: Research

### Purpose

Find candidate home service businesses and produce enough evidence to determine whether they are worth pursuing.

### Inputs

- target geography
- target home-service categories
- ICP rules
- exclusion rules

### Main Agent

Research Agent

### Outputs

- Lead record draft
- website audit summary
- fit notes
- risk or disqualifier notes

### Memory Updates

Lead record should include at minimum:

1. company name
2. website
3. service category
4. service area
5. contact path if available
6. key website issues
7. evidence notes
8. duplicate-check status

### Human Gate

Optional light review for batch quality if many leads are collected at once.

## Stage 2: Qualification

### Purpose

Decide whether each researched lead is worth outbound effort now.

### Inputs

- researched Lead record
- website audit summary
- tier definitions
- ICP and exclusion rules

### Main Agent

Qualification Agent

### Outputs

- fit score
- urgency estimate
- likely package fit
- pursue / hold / reject recommendation

### Memory Updates

Opportunity-related fields should include at minimum:

1. qualification status
2. fit score
3. urgency confidence
4. likely tier: Launch, Growth, or Premium
5. rationale summary
6. recommended next action

### Human Gate

Required before moving the lead into active outreach.

Human reviewer checks:

1. does the lead actually fit the business model
2. is the likely package fit reasonable
3. is this worth sales effort now

## Stage 3: Outreach

### Purpose

Create personalized, evidence-based outreach that is credible and easy to approve.

### Inputs

- approved qualified lead
- website audit evidence
- likely package hypothesis
- niche positioning
- approved outreach framing

### Main Agent

Outreach Agent

### Outputs

- initial outreach draft
- subject line options if applicable
- follow-up sequence drafts
- personalization notes

### Memory Updates

Lead / Opportunity records should include:

1. outreach status
2. message version
3. selected angle
4. human edits made before send
5. channel used
6. follow-up plan

### Human Gate

Required before every send.

Human reviewer checks:

1. factual accuracy
2. tone
3. compliance and credibility
4. whether the ask is low-friction and relevant

## Workflow Handoff Summary

Research hands off to Qualification when:

1. the business is verified
2. the audit contains evidence-based observations
3. the lead record is complete enough to score

Qualification hands off to Outreach when:

1. the lead has a pursue recommendation
2. likely package fit is identified
3. a human approves the lead for contact

Outreach hands off to later sales stages when:

1. outreach is approved and sent
2. response outcomes are recorded
3. the meeting path or follow-up path is clear

## Minimum Viable Data Fields

The first schema draft should support at least these fields.

### Lead

- company_name
- website_url
- service_category
- service_area
- contact_path
- website_issue_summary
- evidence_notes
- outreach_status

### Opportunity

- fit_score
- qualification_status
- likely_tier
- urgency_confidence
- rationale_summary
- next_action
- outreach_angle
- response_status

## Failure Modes To Design Around

1. bad or unverified lead data
2. duplicate businesses or duplicate outreach
3. qualification confidence based on weak signals
4. generic outreach that ignores the actual audit
5. outreach claims that are not defensible

## What This Workflow Needs Next

1. schema design for Lead and Opportunity
2. explicit qualification rubric
3. outreach template framework by tier and service category
4. routing rules for when a lead should be rejected instead of contacted