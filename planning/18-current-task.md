# Current Task

This file is the small, high-signal handoff for the active implementation step.

## Active Task
Implement the highest-priority reconciliation actions to align Payload collections and globals with the approved shared schema.

## Goal
Apply the most important schema-alignment changes from `planning/21-payload-schema-reconciliation.md` without drifting into CRM selection, pricing decisions, or unrelated refactors.

## Read Only These Files First
1. `CLAUDE.md`
2. `18-current-task.md`
3. `planning/20-shared-business-schema.md`
4. `planning/21-payload-schema-reconciliation.md`
5. `planning/17-starter-implementation-spec.md`

## In Scope
- Implement the agreed naming and grouping direction for shared fields
- Align the highest-priority public-content status and SEO gaps
- Resolve the near-term ownership decision for contact submissions versus Lead records if that decision is approved in-session
- Update affected planning docs only where implementation changes require it

## Out Of Scope
- Block implementation details
- CRM / orchestration tool selection
- Pricing, branding, or marketing decisions
- Advanced automation behavior
- Full front-office CRM design beyond the approved schema boundary

## Expected Output
1. Summary of implemented reconciliation changes
2. Any remaining gaps that were intentionally deferred
3. Validation results
4. Explicit deferrals

## Done Condition
This task is complete when:

1. The highest-priority mismatches from the reconciliation report are addressed in code
2. Public collections and globals are materially closer to the approved shared schema
3. Validation is run for the touched code paths
4. The result does not drift into unrelated refactors or unresolved CRM decisions

## Previous Tasks (Completed)
1. Define the shared business schema boundaries — completed in `planning/20-shared-business-schema.md`
2. Reconcile implemented Payload collections and globals against the shared schema — completed in `planning/21-payload-schema-reconciliation.md`

## Next Task After This
Complete the deferred reconciliation items or move into CI / deployment hardening once schema alignment is stable.