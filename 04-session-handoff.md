# Session Handoff

## Start Here

For a fresh session:

1. read `README.md`
2. read this file fully
3. read `17-starter-implementation-spec.md`
4. confirm the locked decisions before proposing changes
5. work only on the next scoped implementation step unless the user explicitly changes direction

## Current State

This project is still in planning and architecture mode.

The business direction is becoming clear, but the system has not been implemented yet.

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

"Review the `agency-os-plan` folder and help me continue from the current plan. Confirm the locked decisions, identify the next unresolved decision, and then help me implement only that step."

## Recommended Immediate Next Task

Start implementation planning from the technical spec: create the starter repository structure, define Payload collections and globals, and then define the shared business schema.

## Additional Global Constraints To Apply

1. engineering quality rules must be defined before the starter repo is built
2. security and secrets-handling rules must be defined before real client data is used
3. skills and MCP usage must support the operating system, not replace it

## Notes For Future Development

1. Keep the project lean until the first offer is validated.
2. Avoid building the full automation stack before real outreach starts.
3. Build the starter site system before advanced orchestration.
4. Treat prompt libraries as support tools, not as the operating system itself.