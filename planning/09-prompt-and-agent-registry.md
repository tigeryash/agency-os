# Prompt And Agent Registry

This file is the index of active prompts, agent roles, and workflow instructions.

Use it to avoid prompt sprawl and duplicate agent roles.

## How To Use

For each active agent or workflow prompt, record:

1. name
2. purpose
3. current version
4. owner
5. linked spec file
6. input shape
7. output shape
8. success criteria
9. required human review
10. external skill or repo support if applicable

## Active Registry

### Research Agent

- Purpose: find and audit potential local business leads
- Version: v0
- Layer: Front Office
- Priority wave: 1
- Owner: pending
- Linked spec: `agents/research-agent.md`
- External support: none required initially
- Status: spec drafted

### Qualification Agent

- Purpose: score leads and assign likely service fit
- Version: v0
- Layer: Front Office
- Priority wave: 1
- Owner: pending
- Linked spec: `agents/qualification-agent.md`
- External support: none required initially
- Status: spec drafted

### Outreach Agent

- Purpose: draft personalized outreach and follow-ups
- Version: v0
- Layer: Front Office
- Priority wave: 1
- Owner: pending
- Linked spec: `agents/outreach-agent.md`
- External support: none required initially
- Status: spec drafted

### Meeting Prep Agent

- Purpose: prepare pre-call dossiers and talking points
- Version: v0
- Layer: Front Office
- Priority wave: 3
- Owner: pending
- Linked spec: `agents/meeting-prep-agent.md`
- External support: none required initially
- Status: planned

### Discovery Agent

- Purpose: convert meeting transcripts into structured client briefs
- Version: v0
- Layer: Front Office
- Priority wave: 1
- Owner: pending
- Linked spec: `agents/discovery-agent.md`
- External support: none required initially
- Status: spec drafted

### Proposal Agent

- Purpose: produce draft package recommendations, scope, exclusions, pricing options, and timeline
- Version: v0
- Layer: Front Office
- Priority wave: 1
- Owner: pending
- Linked spec: `agents/proposal-agent.md`
- External support: none required initially
- Status: spec drafted

### Content Agent

- Purpose: draft sitemap, page structure, content prompts, and CTA strategy
- Version: v0
- Owner: pending
- Linked spec: `agents/content-agent.md`
- Layer: Delivery Engine
- Priority wave: 2
- External support: `impeccable` useful for UX writing, clarity, and refinement passes on landing-page structure and copy presentation
- Status: spec drafted

### Design Planning Agent

- Purpose: choose template family, block plan, and visual direction constraints
- Version: v0
- Owner: pending
- Linked spec: `agents/design-planning-agent.md`
- Layer: Delivery Engine
- Priority wave: 2
- External support: `impeccable` strongly recommended for design critique, anti-pattern avoidance, polish, and frontend-design steering
- Status: spec drafted

### Build Agent

- Purpose: bootstrap and configure projects from the starter stack
- Version: v0
- Layer: Delivery Engine
- Priority wave: 2
- Owner: pending
- Linked spec: `agents/build-agent.md`
- External support: `superpowers` recommended for planning, subagent execution discipline, TDD, code review, and verification
- Status: spec drafted

### QA Agent

- Purpose: run structured launch-readiness checks
- Version: v0
- Layer: Delivery Engine
- Priority wave: 2
- Owner: pending
- Linked spec: `agents/qa-agent.md`
- External support: `impeccable` useful for frontend audit and polish, `superpowers` useful for verification and systematic review workflow
- Status: spec drafted

### PM Agent

- Purpose: manage checklists, milestone tracking, client updates, and launch readiness
- Version: v0
- Owner: pending
- Linked spec: `agents/pm-agent.md`
- Layer: Delivery Engine
- Priority wave: 2
- External support: `superpowers` useful for plan-writing, execution checkpoints, and review discipline
- Status: spec drafted

### Retainer Agent

- Purpose: support maintenance reporting, support triage, and upsell identification
- Version: v0
- Layer: Retention Engine
- Priority wave: 3
- Owner: pending
- Linked spec: `agents/retainer-agent.md`
- External support: none required initially
- Status: planned

## Versioning Rule

If a prompt or agent changes in a meaningful way, update its version and record the change in `07-experiments.md` or `05-decision-log.md` depending on whether it is an experiment or a permanent decision.