# Agency OS Plan

Agent-first, human-approved web agency for home services in the Greater Toronto Area.

## Current Stage
Planning and architecture only. Do not assume implementation has started unless the current task explicitly says so.

## Locked Decisions
Do not change these without explicit approval.

1. Agent-first, human-approved model
2. First market: home services, Greater Toronto Area
3. Stack: Next.js + Payload CMS
4. Productized tiers: Launch, Growth, Premium
5. No uncontrolled multi-agent swarms
6. Dedicated design tools for visual exploration

## Not Yet Locked
- Pricing model
- CRM and orchestration tools
- First template family direction
- Brand name and positioning language
- Shared schema implementation details
- Starter architecture details beyond what is already approved
- Marketing and social-media operating scope

## Current Task
See `18-current-task.md` for the active task. Do not infer a broader task from older planning files.

## Out Of Scope For This Session
- Payload collections and globals
- Shared business schema
- Pricing model decisions
- CRM and orchestration tool choices
- Brand naming or positioning changes
- Marketing scope changes
- Advanced automation or orchestration design

## Required Read Order
1. Read this file first.
2. Read `18-current-task.md` second.
3. Read only the files named in `18-current-task.md`.
4. Read another file only if there is a real conflict, missing dependency, or ambiguity.

## Checkpoint Rule
After the required reads, stop and confirm all of the following before doing more work:

1. Locked decisions still in force
2. Current task
3. Out-of-scope items
4. Proposed next action

Do not broaden scope without explicit approval.
Do not treat backlog items as active work unless `18-current-task.md` says they are active.

## Constraints
- Engineering quality rules must be defined before the starter repo is built
- Security and secrets-handling rules must be defined before real client data is used
- Keep the system lean until the first offer is validated
- Build the starter site system before advanced orchestration
- Skills and MCP usage must support the operating system, not replace it

## Done Condition For Current Task
This step is complete when:

1. The monolithic starter repo structure is defined
2. Folder boundaries are clear
3. Base config surface is identified
4. Payload schema design is explicitly deferred
5. The result supports Launch now without blocking Growth later

## Preferred Output Shape
For planning tasks, prefer concise outputs in this order:

1. Confirmed constraints
2. Recommended next action
3. Proposed artifact for the current step
4. Explicit deferrals

## File Map
Read these only when needed for the current task.

- `18-current-task.md` — active task, scope, read list, and completion target for the current session
- `00-master-plan.md` — business strategy overview
- `01-business-model.md` — niches, offers, tiers, pricing logic
- `02-operating-system.md` — agent roles, stages, human gates
- `03-roadmap.md` — 30/60/90 day execution plan
- `04-session-handoff.md` — current status and next-task handoff
- `05-decision-log.md` — major decisions and reversals
- `06-definition-of-done.md` — completion criteria
- `07-experiments.md` — test log for prompts and workflows
- `08-metrics.md` — business and agent quality metrics
- `09-prompt-and-agent-registry.md` — agent roles and prompt versions
- `10-front-office-workflow.md` — research, qualification, and outreach workflow
- `11-external-tooling-map.md` — external repos and tools
- `12-starter-architecture.md` — V1 architecture spec
- `13-engineering-quality.md` — code, testing, and reuse standards
- `14-security-and-trust.md` — security and data-handling rules
- `15-skills-and-mcp-strategy.md` — skills and MCP tooling strategy
- `16-marketing-and-social.md` — marketing automation framework
- `17-starter-implementation-spec.md` — technical spec for the Next.js and Payload starter
- `agents/` — per-agent specs
