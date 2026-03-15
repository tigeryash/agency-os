# Skills And MCP Strategy

This file explains how to use skills and MCP-style tooling in the agency operating system.

## What Skills Are

Skills are reusable instruction packs or workflows that improve how an agent performs a recurring task.

Use skills for:

1. development best practices
2. framework-specific guidance
3. testing workflows
4. review processes
5. design critique and polish

## What MCP-Style Tooling Is

MCP-style tooling exposes external tools or data sources to an agent in a structured way.

Use MCP-style tooling for:

1. codebase search and indexing
2. documentation access
3. browser automation
4. QA automation
5. CRM or external-system access

## Rule Of Use

Skills and MCPs should increase capability, not blur responsibility.

That means:

1. the operating system still defines the stages and approval gates
2. agent specs still define who is responsible for what
3. skills improve execution quality
4. MCPs improve tool access

## Already Relevant Local Skills

1. `payload`
   Best for Payload collections, hooks, access control, validation, and CMS patterns.

2. `react-doctor`
   Best used after React-heavy changes to catch security, performance, correctness, and architecture issues.

3. `find-skills`
   Use when exploring the external skills ecosystem for a new capability.

## Recommended Skill Categories For This Agency

1. Next.js best practices
2. Playwright testing
3. security review
4. prompt safety and review
5. Payload-specific patterns
6. frontend design refinement

## Useful Skills Found So Far

### Next.js

1. `wshobson/agents@nextjs-app-router-patterns`
2. `sickn33/antigravity-awesome-skills@nextjs-best-practices`

### Security

1. `supercent-io/skills-template@security-best-practices`
2. `wshobson/agents@security-requirement-extraction`
3. `affaan-m/everything-claude-code@security-review`

### Playwright

1. `currents-dev/playwright-best-practices-skill@playwright-best-practices`
2. `github/awesome-copilot@playwright-generate-test`
3. `microsoft/playwright-cli@playwright-cli`

### Prompt / Review

1. `github/awesome-copilot@ai-prompt-engineering-safety-review`

## Recommended Adoption Policy

Adopt a skill if:

1. it improves a recurring task
2. it makes outputs easier to review
3. it does not conflict with the business model or architecture rules

Do not adopt a skill if:

1. it adds noise without measurable value
2. it tries to replace the operating-system logic
3. it pushes the project toward overly generic abstractions

## MCP Adoption Policy

Adopt an MCP or tool integration if:

1. it exposes a capability the agents truly need
2. access can be bounded safely
3. the benefit is clear and recurring

High-value MCP-style categories for later:

1. browser automation and QA
2. CRM and pipeline access
3. analytics and reporting access
4. code intelligence and search

Lower-priority for now:

1. wide-open web browsing access for every agent
2. production system write access for non-human-reviewed stages

## Practical Rule Of Thumb

Use skills for judgment support and reusable workflows.

Use MCP-style tooling for structured access to real tools and systems.