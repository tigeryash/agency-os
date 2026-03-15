# Agency OS Plan

Agent-first, human-approved web agency for home services in the Greater Toronto Area.

## Current Stage
Implemented starter with active planning for unresolved business and architecture decisions. Do not assume the repo is planning-only.

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
See `planning/18-current-task.md` for the active task. Do not infer a broader task from older planning files.

## Out Of Scope For This Session
Follow `planning/18-current-task.md` for the active session scope. Do not use this section as a broader override when the current-task file is more specific.

## Required Read Order
1. Read this file first.
2. Read `planning/18-current-task.md` second.
3. Read only the files named in `planning/18-current-task.md`.
4. Read another file only if there is a real conflict, missing dependency, or ambiguity.

## Checkpoint Rule
After the required reads, stop and confirm all of the following before doing more work:

1. Locked decisions still in force
2. Current task
3. Out-of-scope items
4. Proposed next action

Do not broaden scope without explicit approval.
Do not treat backlog items as active work unless `planning/18-current-task.md` says they are active.

## Constraints
- Engineering quality rules must be defined before the starter repo is built
- Security and secrets-handling rules must be defined before real client data is used
- Keep the system lean until the first offer is validated
- Build the starter site system before advanced orchestration
- Skills and MCP usage must support the operating system, not replace it

## Orchestration Rules

Use an orchestration-first workflow when multiple agents are active.

The goal is to maximize development speed without creating overlap, skipped validation, hidden conflicts, or security regressions.

Keep this file as the control-plane summary. Put detailed orchestration procedures, task-packet templates, and merge checklists in `planning/26-orchestration-policy.md` so they are loaded only when multi-agent coordination is actually in scope.

### Control Model

1. One orchestrator owns planning, task partitioning, sequencing, and merge decisions.
2. Worker agents only execute bounded tasks with explicit scope.
3. The orchestrator is the only agent allowed to change the active-task definition, handoff direction, or control-plane guidance unless explicitly approved.
4. Human approval remains required at the existing trust and scope gates.

### Parallel Work Rules

Parallel work is allowed only when scopes are independent and mergeable.

Allowed parallel work:

1. read-only research on different topics
2. planning work in separate files with no shared ownership
3. implementation in separate feature areas with no overlapping files
4. audit or review passes that do not mutate the same surface

Do not run agents in parallel when:

1. they edit the same file or folder subtree
2. they mutate the same business record or planning artifact
3. one task depends on unfinished output from another task
4. one task is planning and the other is implementation for the same scope
5. the task is underspecified enough that workers would improvise incompatible assumptions

### Single-Owner Control Surfaces

The following surfaces should have single-agent ownership unless the user explicitly approves otherwise:

1. `CLAUDE.md`
2. `planning/18-current-task.md`
3. `planning/04-session-handoff.md`
4. shared schema and Payload config surfaces
5. security, deployment, and validation rules

### Worker Contract

Every worker task must define:

1. exact goal
2. files or records it may touch
3. files or records it must not touch
4. dependencies
5. required validation
6. expected output artifact

Every worker result must report:

1. scope completed
2. files touched
3. assumptions made
4. validation run
5. unresolved issues or merge risks

### Merge And Validation Rules

1. No worker output is considered complete until required validation has run or been explicitly deferred.
2. The orchestrator must check for overlapping edits before merging work.
3. If two outputs conflict, prefer sequential resolution over parallel patching.
4. Security-sensitive, schema-sensitive, and control-plane changes should be merged conservatively even when development speed is a priority.
5. Fast execution is preferred, but never at the cost of skipped validation, weakened security boundaries, or scope drift.

### Escalation Rules

Escalate instead of continuing in parallel when:

1. file ownership becomes unclear
2. task boundaries start overlapping
3. a worker needs to broaden scope to finish
4. a change affects pricing, CRM selection, positioning, secrets, or approval policy
5. a worker cannot validate its result confidently

### Practical Default

When in doubt:

1. use one primary agent per stage
2. use helper agents only for bounded subproblems
3. keep planning and implementation separated when the target is still moving
4. optimize for clean handoffs and validated merges, not raw agent count

## Done Condition For Current Task
This step is complete when:

1. The requirements in `planning/18-current-task.md` are satisfied
2. Validation listed for that task has been run or explicitly deferred
3. The result does not broaden scope beyond the active task without approval

## Preferred Output Shape
For planning tasks, prefer concise outputs in this order:

1. Confirmed constraints
2. Recommended next action
3. Proposed artifact for the current step
4. Explicit deferrals

## File Map
Read these only when needed for the current task.

- `planning/18-current-task.md` — active task, scope, read list, and completion target for the current session
- `planning/00-master-plan.md` — business strategy overview
- `planning/01-business-model.md` — niches, offers, tiers, pricing logic
- `planning/02-operating-system.md` — agent roles, stages, human gates
- `planning/03-roadmap.md` — 30/60/90 day execution plan
- `planning/04-session-handoff.md` — current status and next-task handoff
- `planning/05-decision-log.md` — major decisions and reversals
- `planning/06-definition-of-done.md` — completion criteria
- `planning/07-experiments.md` — test log for prompts and workflows
- `planning/08-metrics.md` — business and agent quality metrics
- `planning/09-prompt-and-agent-registry.md` — agent roles and prompt versions
- `planning/10-front-office-workflow.md` — research, qualification, and outreach workflow
- `planning/11-external-tooling-map.md` — external repos and tools
- `planning/12-starter-architecture.md` — V1 architecture spec
- `planning/13-engineering-quality.md` — code, testing, and reuse standards
- `planning/14-security-and-trust.md` — security and data-handling rules
- `planning/15-skills-and-mcp-strategy.md` — skills and MCP tooling strategy
- `planning/16-marketing-and-social.md` — marketing automation framework
- `planning/17-starter-implementation-spec.md` — technical spec for the Next.js and Payload starter
- `planning/19-starter-skeleton.md` — approved repo skeleton and config boundaries
- `planning/20-shared-business-schema.md` — shared field groups, entity boundaries, status conventions, and reuse rules
- `planning/22-deployment-and-secrets.md` — deployment requirements, environment variables, and secret-handling rules
- `planning/23-first-template-direction.md` — first home-services template-family direction and initial demo-site brief
- `planning/24-front-office-mvp.md` — front-office MVP scope, rubric, outreach-framework target, and handoff requirements
- `planning/25-front-office-mvp-standard.md` — operational qualification rubric, outreach framework, and handoff contract for Research → Qualification → Outreach
- `planning/26-orchestration-policy.md` — detailed multi-agent execution policy, worker task packet, merge checklist, and escalation protocol
- `planning/27-orchestrated-test-wave.md` — first bounded orchestration wave for testing multi-agent coordination on Wave 1 agent specs
- `planning/agents/` — per-agent specs
