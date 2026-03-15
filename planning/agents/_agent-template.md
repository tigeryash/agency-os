# Agent Template

## Name

Agent name here.

## Purpose

What exact job this agent is responsible for.

## Stage

Which operating-system stage this agent belongs to.

## Layer

Which business layer this agent belongs to:

- Front Office
- Delivery Engine
- Retention Engine

## Inputs

- required input 1
- required input 2

## Context Required

- what records or supporting data the agent needs

## Allowed Change Surface

- list the files, folders, records, or systems this agent may update when assigned a write task

## Forbidden Surface

- list control-plane, security-sensitive, or unrelated surfaces this agent must not change

## Tools And Access

- what tools or systems the agent is allowed to use
- what data it is not allowed to access

## External Skill Support

- note any external repo, skill, or support layer that improves this agent
- describe how it should be used and what it must not override

## Outputs

- exact expected output 1
- exact expected output 2

## Validation Required

- list the checks this agent must run before calling the task complete
- if validation is optional, state the explicit deferral rule

## Output Format

Describe the required structure of the output so it is easy to review or pass to another stage.

## Workflow

1. step one
2. step two
3. step three

## Guardrails

- what the agent must not do
- where it must escalate
- what it is not allowed to assume

For multi-agent execution, reference `planning/26-orchestration-policy.md` instead of re-writing the global coordination rules here.

## Failure And Escalation Rules

- what counts as a failed run
- when the agent should stop and ask for human review
- what to do if required inputs are missing or contradictory

## Human Review Required

Describe when a human must approve before the output is used.

## Success Metrics

- metric 1
- metric 2

## Definition Of Done

Describe what must be true for this agent's output to count as complete for the current stage.

## Current Prompt / Instructions

Place the working instruction set here or link to it if it becomes large.