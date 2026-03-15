# Security And Trust

This file defines the minimum security and trust rules for the agency operating system and all client projects.

## Core Principle

Client trust is a product feature.

Security is not only about code vulnerabilities. It also includes:

1. secrets handling
2. access control
3. client-data exposure
4. form safety
5. workflow approval boundaries
6. auditability of important actions

## Global Security Rules

1. Never store secrets in prompts, source control, or planning files.
2. Keep production credentials out of agent-accessible contexts unless strictly necessary.
3. Limit tool access by role and stage.
4. Require human approval for any action that affects live client systems.
5. Keep approval and launch steps auditable.

## Client Data Handling

1. Treat meeting transcripts, business data, form entries, and client assets as sensitive.
2. Do not send sensitive data to unnecessary third-party tools.
3. Minimize how much client data is exposed to any one agent or service.
4. Keep clear boundaries between demo/test data and real client data.

## Access Control Expectations

For the agency system:

1. separate human admin privileges from agent task privileges
2. isolate read-only versus write access where possible
3. require explicit approval for destructive or high-risk actions

For client sites:

1. use least-privilege access
2. protect admin routes and CMS access carefully
3. use strong authentication and role separation where relevant

## Form And Lead Safety

Every client project should account for:

1. spam protection
2. validation and sanitization
3. secure form handling
4. notification handling that does not expose sensitive info unnecessarily

## Infrastructure Baseline

Every production-ready client project should include:

1. environment-variable hygiene
2. controlled admin access
3. safe media and upload handling
4. dependency hygiene
5. logging and error visibility appropriate to the stack

## Agent Guardrails Related To Security

Every agent that touches code, content, or client systems should:

1. avoid exposing secrets
2. escalate uncertain security decisions
3. avoid assuming access control details
4. avoid touching live systems without explicit approval

## Security Review Expectations

Before a real client launch, review at minimum:

1. admin access setup
2. form security and spam prevention
3. data exposure risks
4. environment configuration
5. dependency and package risk
6. obvious frontend trust or phishing risks

## Skills And Tooling Recommendations

Useful support layers:

1. Payload skill for access control, hooks, auth, and secure collection patterns
2. security-review skills found through the Skills ecosystem
3. QA and review workflows that force explicit launch verification

Examples found:

1. `supercent-io/skills-template@security-best-practices`
2. `wshobson/agents@security-requirement-extraction`
3. `affaan-m/everything-claude-code@security-review`

## Definition Of Done For Security

The starter platform and any client project are not launch-ready unless:

1. secrets handling is defined
2. access boundaries are clear
3. live-system approval gates are in place
4. form and admin risks have been reviewed
5. sensitive data exposure has been considered