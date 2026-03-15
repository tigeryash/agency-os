# Orchestrated Test Wave

This file defines the first bounded multi-agent wave for testing the new orchestration model.

The goal is to test orchestration quality on real planning work without reopening website implementation or broadening into uncontrolled parallelism.

## Objective

Use the Orchestrator Agent to coordinate a narrow Wave 1 planning pass that upgrades the highest-priority front-office agent specs to the stronger orchestration-aware template.

This is a process test first and a documentation task second.

Success is measured by clean task partitioning, explicit validation, and safe merge discipline.

## Why This Wave

This wave is a good first test because:

1. it stays inside planning artifacts rather than touching the product codebase
2. it exercises real multi-agent coordination on meaningful files
3. it benefits directly from the new agent template and orchestration policy
4. failures are cheap to inspect and correct

## Scope

In scope:

1. retrofit the Research Agent spec to the stronger template
2. retrofit the Qualification Agent spec to the stronger template
3. retrofit the Outreach Agent spec to the stronger template
4. verify that each spec aligns with the front-office MVP standard and orchestration policy

Out of scope:

1. editing `CLAUDE.md`
2. editing `planning/26-orchestration-policy.md`
3. editing Payload or Next.js implementation files
4. changing pricing, CRM, branding, or market direction
5. adding automation code, workflows, or external integrations

## Ownership Model

Single-owner control surfaces for this wave:

1. the Orchestrator Agent owns task partitioning, merge decisions, and any updates to handoff notes
2. worker agents own only the individual spec files assigned to them
3. no worker may change shared control-plane files

## Worker Packets

### Packet A

Task: Research Agent spec retrofit

Goal:
Update the Research Agent spec so it follows the current template, names its allowed and forbidden surfaces, and aligns with the front-office MVP handoff requirements.

Allowed to touch:
- `planning/agents/research-agent.md`

Must not touch:
- `CLAUDE.md`
- `planning/18-current-task.md`
- `planning/26-orchestration-policy.md`
- `planning/27-orchestrated-test-wave.md`
- any file outside `planning/agents/research-agent.md`

Dependencies:
- `planning/25-front-office-mvp-standard.md`
- `planning/10-front-office-workflow.md`
- `planning/agents/_agent-template.md`

Required reads:
- `CLAUDE.md`
- `planning/18-current-task.md`
- `planning/25-front-office-mvp-standard.md`
- `planning/10-front-office-workflow.md`
- `planning/agents/README.md`
- `planning/agents/_agent-template.md`

Validation:
- confirm the spec includes allowed change surface, forbidden surface, validation required, and escalation logic
- confirm the spec does not contradict the front-office workflow or handoff contract

Expected output:
- updated `planning/agents/research-agent.md`

Escalate if:
- the spec needs changes to shared control documents to make sense
- the handoff rules appear to conflict with the current MVP standard

### Packet B

Task: Qualification Agent spec retrofit

Goal:
Update the Qualification Agent spec so it follows the current template, encodes the rubric and approval boundaries correctly, and remains inside front-office MVP scope.

Allowed to touch:
- `planning/agents/qualification-agent.md`

Must not touch:
- `CLAUDE.md`
- `planning/18-current-task.md`
- `planning/26-orchestration-policy.md`
- `planning/27-orchestrated-test-wave.md`
- any file outside `planning/agents/qualification-agent.md`

Dependencies:
- `planning/25-front-office-mvp-standard.md`
- `planning/10-front-office-workflow.md`
- `planning/agents/_agent-template.md`

Required reads:
- `CLAUDE.md`
- `planning/18-current-task.md`
- `planning/25-front-office-mvp-standard.md`
- `planning/10-front-office-workflow.md`
- `planning/agents/README.md`
- `planning/agents/_agent-template.md`

Validation:
- confirm the rubric, pursue-hold-reject thresholds, and human approval gate are reflected accurately
- confirm the spec includes allowed change surface, forbidden surface, validation required, and escalation logic

Expected output:
- updated `planning/agents/qualification-agent.md`

Escalate if:
- the current rubric is too ambiguous to encode without changing global planning artifacts

### Packet C

Task: Outreach Agent spec retrofit

Goal:
Update the Outreach Agent spec so it follows the current template, encodes the evidence threshold and review gates correctly, and stays within the current front-office workflow.

Allowed to touch:
- `planning/agents/outreach-agent.md`

Must not touch:
- `CLAUDE.md`
- `planning/18-current-task.md`
- `planning/26-orchestration-policy.md`
- `planning/27-orchestrated-test-wave.md`
- any file outside `planning/agents/outreach-agent.md`

Dependencies:
- `planning/25-front-office-mvp-standard.md`
- `planning/10-front-office-workflow.md`
- `planning/agents/_agent-template.md`

Required reads:
- `CLAUDE.md`
- `planning/18-current-task.md`
- `planning/25-front-office-mvp-standard.md`
- `planning/10-front-office-workflow.md`
- `planning/agents/README.md`
- `planning/agents/_agent-template.md`

Validation:
- confirm the spec reflects evidence requirements, outreach structure, follow-up constraints, and human approval rules accurately
- confirm the spec includes allowed change surface, forbidden surface, validation required, and escalation logic

Expected output:
- updated `planning/agents/outreach-agent.md`

Escalate if:
- the outreach framework needs a shared-rule change instead of a local spec update

## Merge Plan

Merge order should be:

1. Research Agent spec
2. Qualification Agent spec
3. Outreach Agent spec
4. orchestrator review pass for consistency across the three specs

If any worker output introduces a conflict with the shared MVP standard, stop and resolve sequentially before accepting the rest of the wave.

## Validation And Review

The orchestrator should accept this wave only if all of the following are true:

1. each worker touched only its assigned file
2. each updated spec follows the current agent template
3. each updated spec matches the front-office MVP standard without inventing new business rules
4. each worker reported assumptions and open risks
5. no control-plane file needed to be changed to complete the wave

## Evaluation Criteria

Judge the orchestrator on:

1. packet clarity
2. overlap avoidance
3. escalation quality
4. merge discipline
5. validation completeness

Do not judge this wave mainly on volume of output.

## Follow-Up After The Wave

If the wave succeeds:

1. use the same pattern for the next front-office spec wave or sample-lead testing wave
2. tighten weak packet fields or merge checks that caused friction

If the wave fails:

1. document the specific failure mode
2. update `planning/26-orchestration-policy.md` or the relevant agent spec template only where the failure actually occurred
3. rerun a smaller bounded wave before scaling up