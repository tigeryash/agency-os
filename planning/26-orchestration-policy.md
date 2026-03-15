# Orchestration Policy

This file defines the detailed execution policy for running multiple agents in parallel without weakening quality, security, or planning control.

It supplements `CLAUDE.md`. If there is a conflict, `CLAUDE.md` wins.

## Purpose

Use this file when parallel agent work is being planned, assigned, merged, or reviewed.

Do not load it by default for single-agent execution or narrow implementation tasks that do not require coordination.

## When To Use This File

Load this file when any of the following are true:

1. more than one agent will be active in the same session or delivery wave
2. the orchestrator is assigning bounded tasks to worker agents
3. merge order or ownership boundaries need to be decided
4. a task touches a control surface, schema surface, or security-sensitive area
5. there is uncertainty about whether work is safe to parallelize

## Control Plane

### Orchestrator Responsibilities

The orchestrator owns:

1. task selection against the active planning scope
2. partitioning work into non-overlapping packets
3. sequencing dependent tasks
4. choosing which work is parallel versus sequential
5. checking validation before accepting worker output
6. resolving merge order and escalation

The orchestrator does not:

1. widen scope without user approval
2. delegate ambiguous tasks that require workers to improvise business decisions
3. allow workers to change control-plane files unless explicitly assigned

### Worker Responsibilities

Workers execute a bounded task packet and report results.

Workers must not:

1. edit files outside their allowed set
2. redefine the active task
3. silently skip validation that was required in the task packet
4. make pricing, branding, CRM, security, or approval-policy decisions unless the packet explicitly says to do so

## Task Packet Standard

Every worker assignment should include all of the following.

### Required Fields

1. exact goal
2. why this task matters now
3. files or folders allowed to change
4. files or folders explicitly forbidden
5. dependencies or prerequisite outputs
6. required reads
7. required validation
8. expected output artifact
9. escalation trigger conditions

### Packet Template

Use this shape when assigning work.

```md
Task: <short task name>

Goal:
<exact outcome>

Allowed to touch:
- <file or folder>

Must not touch:
- <file or folder>

Dependencies:
- <dependency>

Required reads:
- <file>

Validation:
- <command or check>

Expected output:
- <artifact>

Escalate if:
- <condition>
```

## Parallelization Rules

Parallel work is allowed only when all of the following are true:

1. tasks do not edit the same file
2. tasks do not edit the same folder subtree where overlap is likely
3. one task does not depend on unfinished output from another
4. validation can be attributed to each task clearly
5. merge order is obvious before work starts

Prefer sequential execution when:

1. schema and implementation changes are tightly coupled
2. planning and implementation target the same surface
3. one task changes shared types, config, or reusable contracts
4. the blast radius is hard to predict

## Reserved Single-Owner Surfaces

These surfaces should have one owner at a time unless the user explicitly approves otherwise:

1. `CLAUDE.md`
2. `planning/18-current-task.md`
3. `planning/04-session-handoff.md`
4. `planning/26-orchestration-policy.md`
5. shared schema planning files
6. `payload.config.ts`
7. security, deployment, and validation planning files

## Merge Acceptance Checklist

Before accepting worker output, the orchestrator should verify:

1. the task stayed inside the allowed files
2. the output satisfies the stated goal
3. required validation ran or was explicitly deferred
4. no hidden overlap exists with other in-flight work
5. no control-plane or security regressions were introduced
6. assumptions and unresolved risks were reported

## Worker Result Format

Every worker result should report:

1. scope completed
2. files touched
3. validation run
4. assumptions made
5. unresolved issues or merge risks

Use this concise output shape:

```md
Completed:
- <what was done>

Files touched:
- <file>

Validation:
- <check>

Assumptions:
- <assumption>

Open risks:
- <risk or none>
```

## Escalation Triggers

Stop and escalate to the orchestrator or user when:

1. file ownership is no longer clear
2. the task requires touching forbidden files to complete correctly
3. a task packet is missing dependency or validation details
4. two worker outputs conflict semantically even if the diffs do not overlap
5. the change affects security, secrets, approval policy, pricing, CRM choice, or brand positioning
6. validation fails and the worker cannot confidently identify the root cause

## Practical Operating Pattern

For most sessions, use this default pattern:

1. one orchestrator reads the active task and selects the wave
2. one worker handles the primary implementation surface
3. optional helper workers handle bounded read-only research or isolated edits
4. the orchestrator validates and merges outputs sequentially
5. the session handoff is updated only after accepted results are reconciled

## Context Discipline

This file exists to reduce unnecessary default context load.

Rules:

1. keep `CLAUDE.md` short and normative
2. keep this file procedural and only load it when coordination is active
3. do not duplicate detailed orchestration instructions across agent specs unless the agent truly needs local overrides
4. if a rule belongs to all work, keep it in `CLAUDE.md`; if it belongs to multi-agent execution only, keep it here