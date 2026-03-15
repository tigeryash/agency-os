# External Tooling Map

This file records where external repos, skills, and support systems fit into the agency operating system.

The goal is to avoid tool sprawl and to keep each external dependency in the right layer.

## Rule

External repos should strengthen a layer of the system, not replace the business logic defined in this planning folder.

## Current External Repos

### `superpowers`

Purpose:

An engineering workflow and development-discipline layer for coding agents.

Best uses in this agency:

1. implementation planning
2. subagent-driven execution for engineering tasks
3. code review and verification workflows
4. test discipline
5. structured finishing and review of development branches

Best-fit layers:

1. Delivery Engine
2. Control Layer

Best-fit agents:

1. Build Agent
2. QA Agent
3. PM Agent

Secondary use:

1. Proposal Agent, only for structured writing-plan discipline if proposal automation later becomes code-backed or heavily templated

Do not use it as:

1. lead-generation logic
2. CRM memory layer
3. pricing logic
4. business strategy

Recommendation:

Adopt selectively once the starter architecture build begins.

### `impeccable`

Purpose:

A frontend design and polish skill layer that improves visual quality, avoids common AI UI anti-patterns, and adds more deliberate review commands.

Best uses in this agency:

1. template refinement
2. design critique
3. typography, spacing, and color decisions
4. final polish passes
5. frontend UX writing cleanup
6. responsive and design-system alignment checks

Best-fit layers:

1. Delivery Engine
2. Control Layer

Best-fit agents:

1. Design Planning Agent
2. Content Agent
3. QA Agent

Secondary use:

1. Build Agent during final UI refinement

Do not use it as:

1. business positioning logic
2. niche selection logic
3. front-office sales workflow logic
4. backend architecture governance

Recommendation:

Adopt early when the first home-services template family is being designed, because it directly affects perceived quality.

## Agent-by-Agent Recommendation Matrix

### Strongly benefits from `superpowers`

1. Build Agent
2. PM Agent
3. QA Agent

### Some benefit from `superpowers`

1. Proposal Agent

### Strongly benefits from `impeccable`

1. Design Planning Agent
2. QA Agent
3. Content Agent

### Some benefit from `impeccable`

1. Build Agent

### Little or no direct benefit from either initially

1. Research Agent
2. Qualification Agent
3. Outreach Agent
4. Meeting Prep Agent
5. Discovery Agent
6. Retainer Agent

These agents are driven more by business rules, structured data, and evaluation than by engineering-workflow skills or frontend design skills.

## Recommended Adoption Order

1. `impeccable` when building the first home-services template family
2. `superpowers` when starting the real Next.js + Payload implementation workflow
3. expand usage only after there is a stable baseline process to improve

## Integration Rule Of Thumb

Ask this before using an external repo:

1. is this helping the agent think more clearly about a task it already owns
2. is this improving output quality in a measurable way
3. is this avoiding rework rather than adding complexity

If the answer is no, do not integrate it yet.

## Current Decision

Both repos are approved as optional support layers.

Neither repo is approved to replace:

1. the main operating-system plan
2. the business-model decisions
3. the human review gates
4. the shared memory design