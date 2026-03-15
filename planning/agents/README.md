# Agent Specs

Use one file per agent once that agent becomes real enough to deserve its own spec.

These files are for per-agent operating details, not for repeating all global project rules.

## When To Create A Separate Agent File

Create a dedicated file when the agent has:

1. a stable role
2. defined inputs and outputs
3. a workflow worth versioning
4. measurable success criteria

Do not create separate files for imaginary future agents too early.

## Rollout Priority

All of the planned agents can exist in the operating system, but they should not all be fully built at the same time.

Build in waves:

### Wave 1: Front-office MVP

1. Research Agent
2. Qualification Agent
3. Outreach Agent
4. Discovery Agent
5. Proposal Agent

Reason:

These agents support lead generation, sales motion, and basic project intake. They help validate demand before deeper automation work.

### Wave 2: Delivery MVP

1. Content Agent
2. Design Planning Agent
3. Build Agent
4. QA Agent
5. PM Agent

Reason:

These agents help after the offer is clearer and the starter stack exists.

### Wave 3: Optimization and retention

1. Meeting Prep Agent
2. Retainer Agent

Reason:

These are valuable, but lower priority than the agents required to source leads, close work, and deliver the first projects.

## Layer Mapping

Each agent belongs to one of the business layers:

The Orchestrator Agent is a control-layer role. It coordinates work across layers but does not replace stage-specific agents.

### Front Office

- Research Agent
- Qualification Agent
- Outreach Agent
- Meeting Prep Agent
- Discovery Agent
- Proposal Agent

### Delivery Engine

- Content Agent
- Design Planning Agent
- Build Agent
- QA Agent
- PM Agent

### Retention Engine

- Retainer Agent

### Memory Layer

This is not a single agent. It is the shared record system used by all agents.

Core records:

1. Lead
2. Opportunity
3. Client Brief
4. Proposal
5. Project
6. Support Account

### Control Layer

This is also not a single agent. It is the set of global rules that govern:

1. human approval gates
2. model routing
3. escalation rules
4. exception handling
5. metrics and profitability review

When multi-agent work is active, the Orchestrator Agent is the operational owner of this layer for the current task wave. Detailed execution rules live in `planning/26-orchestration-policy.md`.

## Recommended Agent File Format

Each agent file should include:

1. purpose
2. stage in the operating system
3. allowed inputs
4. required context
5. allowed change surface when it edits code or planning artifacts
6. required validation
7. output format
8. failure rules
9. human review requirements
10. metrics
11. current prompt or instructions

## What Belongs In Agent Files vs Top-Level Files

Put in top-level files:

1. business-wide decisions
2. phase-level Definition of Done
3. shared metrics
4. experiment log
5. operating-system-wide control rules

Put in individual agent files:

1. exact responsibility
2. stage and layer placement
3. inputs and outputs
4. tool access
5. allowed change surface and forbidden surfaces when relevant
6. validation obligations
7. failure and escalation rules
8. human review points for that specific agent
9. agent-specific success metrics
10. current instruction set or linked prompt

Start with the template in `_agent-template.md`.