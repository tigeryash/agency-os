# Front-Office MVP

This file defines the next concrete agent-side planning step outside the website template implementation work.

The goal is to make the first front-office agent workflow concrete enough to run with consistent human review instead of remaining a high-level operating-system outline.

## Why This Is The Next Agent Task

The operating-system layer is mostly planned, but not yet actionable enough for repeated use.

What already exists:

1. agent roles are defined
2. front-office stages are mapped
3. lead and opportunity records exist in the shared schema and Payload
4. individual agent specs exist for Research, Qualification, Outreach, Discovery, and Proposal

What is still missing for a usable front-office MVP:

1. a qualification rubric that different agents or humans can apply consistently
2. an outreach framework by tier and service category
3. an explicit handoff contract from Research to Qualification to Outreach

Without those three pieces, the agent layer stays descriptive instead of operational.

## Recommended Scope

This step should define the Wave 1 front-office MVP only.

In scope:

1. qualification rubric
2. pursue / hold / reject rules
3. package-fit heuristics for Launch, Growth, and Premium
4. outreach angle framework by service category and likely tier
5. required evidence threshold before outreach is allowed
6. human review checkpoints and approval criteria
7. exact Lead and Opportunity field updates at each handoff stage

Out of scope:

1. CRM vendor selection
2. full automation orchestration
3. meeting-prep or retainer workflows
4. proposal generation details beyond the front-office handoff boundary
5. implementation of actual automation code or external integrations

## Recommended Deliverables

Produce these artifacts:

1. Qualification rubric document
2. Outreach framework document
3. Front-office handoff contract document or consolidated section that defines record updates, approval gates, and failure rules

## Success Criteria

This step is successful when:

1. a researched lead can be scored consistently by the Qualification Agent
2. a human reviewer can quickly approve or reject that score using clear rules
3. the Outreach Agent has enough structure to produce specific, non-generic drafts
4. record updates between Research, Qualification, and Outreach are explicit rather than implied
5. future automation work can reference one front-office MVP standard instead of improvising the workflow

## Recommended Follow-Up After This

1. test the rubric and outreach framework on a small batch of sample leads
2. revise weak parts based on human review friction
3. only then consider implementing more front-office automation or moving deeper into Discovery / Proposal workflows