# Operating System

## Purpose

The operating system is the business engine that moves a lead from first contact to launch and retention.

It is not just a prompt library.

It includes:

1. business stages
2. agent responsibilities
3. shared records
4. orchestration rules
5. human approval gates
6. evaluation and refinement loops

## Core Shared Records

Every agent should read from or write to these business objects:

1. Lead
2. Opportunity
3. Client Brief
4. Proposal
5. Project
6. Support Account

## Main Business Stages

1. Lead sourcing
2. Qualification
3. Outreach
4. Meeting prep
5. Discovery
6. Proposal
7. Project bootstrap
8. Content planning
9. Design planning
10. Build
11. QA
12. Launch
13. Retainer and support

## Initial Agent Set

### Research Agent

- finds businesses
- identifies site problems
- enriches lead records

### Qualification Agent

- scores fit
- maps lead to package tier
- flags budget or scope concerns

### Outreach Agent

- drafts personalized cold emails
- drafts follow-ups
- proposes audit-style hooks

### Meeting Prep Agent

- builds call dossiers
- summarizes business context
- suggests likely offer angles

### Discovery Agent

- turns transcripts into structured requirements
- extracts goals, pages, integrations, risks, and constraints

### Proposal Agent

- drafts package recommendation
- drafts scope, exclusions, pricing options, and timeline

### Content Agent

- drafts sitemap
- drafts page structure and messaging prompts
- produces content collection lists

### Design Planning Agent

- selects template family
- recommends block combinations
- proposes visual direction for external design tools or implementation

### Build Agent

- bootstraps the project from the starter stack
- configures Payload and page structure
- prepares implementation tasks

### QA Agent

- runs responsiveness, SEO, accessibility, form, and content checks

### PM Agent

- maintains checklists, milestone status, and handoff notes

### Retainer Agent

- prepares monthly reports
- triages support patterns
- surfaces upsell opportunities

## Human Approval Gates

Human approval is required for:

1. sending outreach
2. sending proposals
3. final pricing and scope
4. design direction selection
5. launch approval
6. major client-facing claims or changes

## Global Rule Categories

Not all rules belong inside individual agent files.

Use global planning files for:

1. engineering quality standards
2. security and data handling rules
3. approval and escalation policy
4. skills and MCP usage policy
5. marketing and social-media automation boundaries

Use agent files for the agent-specific subset of those rules.

## Orchestration Rules

1. Use one primary agent per business stage.
2. Use helper subagents only for bounded subproblems.
3. Do not start with autonomous swarms.
4. Prefer sequential stage flow with parallel work only inside a stage.
5. Route models by task type instead of using one model for everything.

Detailed multi-agent execution policy, worker packet structure, and merge discipline live in `planning/26-orchestration-policy.md`.

## Model Routing

Cheap fast models:

- extraction
- tagging
- summarization
- enrichment

Stronger reasoning models:

- proposals
- scope interpretation
- planning
- difficult synthesis

Code-focused models:

- scaffolding
- schema work
- debugging
- tests

Dedicated design tools:

- visual ideation
- layout direction
- moodboards
- style exploration

## Continuous Improvement

Use `autoresearch`-style loops only for measurable workflows such as:

1. outreach optimization
2. qualification refinement
3. discovery summary quality
4. proposal effectiveness
5. QA signal quality

Use this as an optimization layer, not the main operating system.

## External Skill Layers

Some external repositories can strengthen the operating system without replacing it.

Current recommendations:

1. `superpowers` should be used as an engineering workflow layer for planning, implementation discipline, code review, and verification.
2. `impeccable` should be used as a frontend quality layer for design refinement, UI critique, polish, and frontend QA.

These should be treated as support systems for specific agents and stages, not as the agency operating system itself.