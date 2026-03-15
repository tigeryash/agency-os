# Agency OS Planning Folder

This folder is the persistent working plan for building an agent-assisted web agency.

Use this folder in future conversations so planning stays consistent even when chat context changes.

Suggested workflow:

1. Start a new conversation by pointing to this folder.
2. Ask to review the current decisions before making changes.
3. Update only the files affected by the current step.
4. Keep implementation work tied back to the roadmap and scope rules here.

Recommended prompt to reuse:

"Review the files in `agency-os-plan` and continue from the current plan. Before building anything new, confirm what stage we are in, what decisions are already locked, and what the next concrete task should be."

File guide:

- `00-master-plan.md`: condensed overview of the business and build strategy
- `01-business-model.md`: niche, offers, tiers, pricing logic, and scope rules
- `02-operating-system.md`: agent roles, stages, human gates, systems, and data flow
- `03-roadmap.md`: phased execution plan with 30/60/90-day framing
- `04-session-handoff.md`: current status, next tasks, and how to continue cleanly
- `05-decision-log.md`: durable record of major decisions and reversals
- `06-definition-of-done.md`: completion criteria for phases and workflows
- `07-experiments.md`: controlled test log for prompts, workflows, and heuristics
- `08-metrics.md`: business and agent quality metrics to track
- `09-prompt-and-agent-registry.md`: index of active agent roles, prompts, and versions
- `10-front-office-workflow.md`: current workflow map for Research, Qualification, and Outreach handoffs
- `11-external-tooling-map.md`: where external repos and tools fit into the operating system
- `12-starter-architecture.md`: concrete V1 architecture for the home-services template system
- `13-engineering-quality.md`: clean-code, architecture, testing, and reuse standards for the starter and future projects
- `14-security-and-trust.md`: security, access, secrets, data handling, and launch safety requirements
- `15-skills-and-mcp-strategy.md`: how to use skills and MCP-style tooling without losing control of the system
- `16-marketing-and-social.md`: decision framework for marketing and social-media automation
- `17-starter-implementation-spec.md`: implementation-ready technical structure for the Next.js + Payload starter
- `agents/`: separate per-agent specs once an agent role becomes stable enough to warrant its own file

Rules for future work:

1. Do not broaden the niche set until the first niche has a repeatable template and sales motion.
2. Do not automate a business step before the manual version works.
3. Do not treat prompt libraries as the operating system.
4. Keep human approval on outreach, proposals, design direction, pricing, and launch.
5. Prefer a stable starter architecture over one-off custom builds.