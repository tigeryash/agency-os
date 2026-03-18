# Session Handoff

## Start Here

For a fresh session:

1. read `README.md`
2. read this file fully
3. read `17-starter-implementation-spec.md`
4. confirm the locked decisions before proposing changes
5. work only on the next scoped implementation step unless the user explicitly changes direction

## Current State

This project is no longer planning-only.

The starter repository exists and implementation is underway in the Next.js plus Payload codebase.

Current verified baseline:

1. monolithic starter repo structure is in place
2. core frontend and Payload route boundaries exist
3. initial collections, globals, blocks, and supporting utilities exist
4. lead capture now stores real submissions instead of returning a fake success state
5. public slug routes enforce published-only content
6. tier-gated smoke tests, typecheck, lint, and baseline e2e now run successfully in the current repo
7. shared business schema has been defined in planning
8. Payload collections and globals have been audited against that schema in planning
9. deployment and secret-handling rules are documented
10. CI provisions its own Postgres service, seeds the app, and runs build plus e2e without relying on a GitHub `DATABASE_URI` secret
11. canonical `leads` and `opportunities` collections exist in Payload
12. front-office qualification rubric validated on 5 sample leads — no rubric changes needed
13. superpowers integration spec defined and applied to CLAUDE.md

Planning is still active for unresolved business and architecture decisions, but do not assume the codebase is unimplemented.

## Locked Decisions

1. The business will be agent-first, human-approved.
2. The first market focus will be home services in the Greater Toronto Area.
3. The stack should be Next.js + Payload CMS.
4. The business should use productized service tiers instead of broad custom work.
5. The first version should avoid uncontrolled multi-agent swarms.
6. Dedicated design tools should be used for visual exploration.
7. The initial tier structure is Launch, Growth, and Premium for home service businesses.

## Not Yet Locked

1. pricing model
2. CRM / orchestration tool choices
3. first template family direction
4. business brand name and positioning language
5. shared schema implementation details
6. starter architecture details
7. marketing and social-media operating scope

## Recommended Next Conversation Prompt

"Continue with the active task in 18-current-task.md. The current task is implementing Payload live preview and draft workflow using the full superpowers ceremony."

## Recommended Immediate Next Task

Implement Payload live preview and draft workflow. This is the first implementation task using the full superpowers ceremony (brainstorming → spec → plan → TDD → code review).

## Backlog

See `planning/backlog.md` for queued tasks:

1. Payload live preview and draft workflow (current)
2. Analytics baseline (events, attribution fields on leads, admin dashboard)

## Superpowers Integration

The repo now has a superpowers integration spec (`planning/29-superpowers-integration-spec.md`) that defines three workflow modes:

1. Planning/validation work → work directly, no ceremony
2. Implementation work → brainstorming → spec → plan → TDD → code review
3. Bug fixes → TDD + code review

All specs and plans go in `planning/NN-*.md` using the existing numbered convention.

## Multi-Agent Coordination Status

The repo now has a two-level orchestration model:

1. `CLAUDE.md` holds the mandatory control-plane summary and non-negotiable guardrails
2. `planning/26-orchestration-policy.md` holds the detailed worker-packet, merge, and escalation procedure for parallel execution

If running multiple agents, load both before assigning work packets.

The first orchestrated test wave (`planning/27-orchestrated-test-wave.md`) has been executed:

1. Research, Qualification, and Outreach agent specs retrofitted to the stronger template
2. All three specs now include Allowed Change Surface, Forbidden Surface, Validation Required, and External Skill Support
3. Handoff contract fields, rubric encoding, and evidence requirements are aligned with `planning/25-front-office-mvp-standard.md`
4. Orchestration model validated: clean ownership boundaries, no overlapping edits, no scope drift, explicit validation

Key learning: subagent write permissions were the main friction point. Packet design, overlap avoidance, and merge discipline worked as intended.

## Additional Global Constraints To Apply

1. engineering quality rules must be defined before the starter repo is built
2. security and secrets-handling rules must be defined before real client data is used
3. skills and MCP usage must support the operating system, not replace it

## Notes For Future Development

1. Keep the project lean until the first offer is validated.
2. Avoid building the full automation stack before real outreach starts.
3. Build the starter site system before advanced orchestration.
4. Treat prompt libraries as support tools, not as the operating system itself.
5. Require validation commands for agent-generated code, not just editor silence.
6. Treat fake user-facing success states and draft-content exposure as release blockers.
7. Verify feature-gated behavior in both enabled and disabled states.
