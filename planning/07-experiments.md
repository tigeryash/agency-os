# Experiments

Use this file to track controlled experiments. This is the safe place for testing workflow changes before treating them as standard operating procedure.

## Rules

1. Change one meaningful variable at a time when possible.
2. Record the current baseline before testing.
3. Do not promote a new prompt or workflow without evidence.
4. Prefer offline or low-risk evaluation before live client-facing use.

## Experiment Template

### Experiment Name

- Date:
- Owner:
- Area: outreach, qualification, proposal, discovery, QA, design brief, or other
- Hypothesis:
- Current baseline:
- Change being tested:
- Sample size:
- Success metric:
- Secondary metrics:
- Result:
- Decision: adopt, reject, retest
- Notes:

## Suggested First Experiments

1. outreach subject line variants for home services
2. proposal framing variants for Growth tier
3. discovery summary structure for fewer missed requirements
4. qualification scoring rubric quality
5. QA checklist false-positive reduction

## Suggested Engineering Workflow Experiments

1. agent implementation prompt with mandatory verification gates for lint, typecheck, unit tests, and e2e smoke tests
2. review checklist that explicitly checks fake success states, draft-content exposure, and tier-gated route behavior
3. shared-query helper pattern for published-only public content lookups versus per-route inline queries
4. startup-config checklist for Tailwind, ESLint, and Playwright so toolchain failures are caught before feature work is considered done