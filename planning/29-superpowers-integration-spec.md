# Superpowers Integration Spec

This file defines how the superpowers skill layer integrates with the Agency OS workflow.

Superpowers is an engineering workflow layer that provides brainstorming, spec writing, implementation planning, TDD, code review, and code simplification. It operates inside the existing control structure defined by `CLAUDE.md` and `18-current-task.md`, not as a parallel system.

## Integration Principle

Superpowers supports the operating system. It does not replace it.

`18-current-task.md` remains the single source of truth for what to work on. Superpowers skills determine how to work on it when the task type calls for structured engineering workflow.

## Mode Selection

The active task determines which superpowers mode activates:

### Planning/Validation Mode

Applies when `18-current-task.md` describes planning, research, validation, or documentation work.

Behavior:

1. Work directly per the task definition
2. Use brainstorming skill only if the scope is unclear and needs structured exploration
3. No spec, no implementation plan, no TDD
4. Output goes to the next available `planning/NN-*.md` file

### Implementation Mode

Applies when `18-current-task.md` describes building features, adding blocks, writing agent code, or other code-producing work.

Behavior:

1. Invoke brainstorming skill to scope the work and explore approaches
2. Write spec to `planning/NN-<feature>-spec.md`
3. Run spec review loop until approved, then get user approval
4. Invoke writing-plans skill to produce implementation plan
5. Write plan to `planning/NN-<feature>-plan.md` (consecutive number after spec)
6. Build using TDD — tests first, then implementation
7. After each logical chunk, run code review agent against the plan
8. Run code simplifier after review passes

### Bug Fix Mode

Applies when `18-current-task.md` describes a fix for a known issue.

Behavior:

1. Write a failing test that captures the bug
2. Fix the code until the test passes
3. Run code review agent on the fix
4. Done — no spec, no plan

### Small Change Threshold

For implementation changes scoped to a single file or under approximately 50 lines of new logic, the brainstorming and spec steps may be skipped with user approval. TDD and code review still apply.

### Mode Transitions

If a planning task produces a clear enough outcome that the user decides to start building, update `18-current-task.md` to reflect the new task type before activating implementation mode. Do not silently shift modes mid-session.

## Artifact Conventions

All superpowers-generated artifacts use the existing `planning/NN-*.md` convention.

| Artifact Type | Naming Pattern | Example |
|---|---|---|
| Feature spec | `planning/NN-<feature>-spec.md` | `planning/30-service-area-pages-spec.md` |
| Implementation plan | `planning/NN-<feature>-plan.md` | `planning/31-service-area-pages-plan.md` |
| Planning output | `planning/NN-<topic>.md` | Same as today |

Rules:

1. Specs and plans for the same feature should share a common feature slug and be close in numbering — reserve both numbers at spec creation time when possible
2. The spec is always written and approved before the plan
3. `18-current-task.md` references the active spec and plan by number during implementation
4. The CLAUDE.md file map is updated when new planning files are added
5. Agent specs remain in `planning/agents/`
6. No new folders are created

## Skill Invocation Order

When implementation mode is active, skills are invoked in this order:

1. **Brainstorming** — scope the feature, ask questions, propose approaches, produce spec
2. **Writing-plans** — after spec approval, produce implementation plan
3. **TDD** — during implementation, tests first
4. **Code review agent** — after each logical chunk of implementation
5. **Code simplifier agent** — after code review passes

## Control Surface Rules

1. `CLAUDE.md` remains the control plane — gains a Superpowers Integration section
2. `18-current-task.md` remains the active task definition and determines mode selection
3. `04-session-handoff.md` remains the session continuity surface
4. Superpowers skills operate within the scope defined by `18-current-task.md`, never independently
5. Superpowers does not override locked decisions, orchestration rules, or human approval gates
6. In orchestrated multi-agent workflows, the orchestrator determines which superpowers steps are performed by which agent, consistent with `planning/26-orchestration-policy.md` worker contracts

## Spec Review Loop

Before a spec is presented to the user for final approval, it goes through an automated review:

1. Dispatch the code-reviewer agent with the spec and its context (CLAUDE.md, related planning files)
2. The reviewer checks for: completeness, consistency with locked decisions, clarity, gaps, and unnecessary complexity
3. Issues are categorized as Critical, Important, or Minor
4. Critical and Important issues are fixed and the spec is re-submitted for review
5. Maximum 5 review iterations — if still failing, escalate to the user with the unresolved issues
6. After the review loop passes, the spec is presented to the user for approval

## CLAUDE.md Changes

Applied. See the "Superpowers Integration" section in `CLAUDE.md` and the file map entry for this spec.

## Relationship To Existing Skill References

This spec supersedes the general superpowers reference in `planning/13-engineering-quality.md`. Forward pointer applied.

## What This Does Not Change

1. Locked decisions
2. Required read order
3. Checkpoint rule
4. Orchestration rules and worker contracts
5. Human approval gates
6. File map structure (only entries are added, structure is unchanged)
7. Agent specs format and location
8. Session handoff process
