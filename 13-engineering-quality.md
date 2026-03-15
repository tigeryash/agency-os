# Engineering Quality

This file defines the non-negotiable code-quality rules for the starter platform and all future client projects.

The goal is not only to make the current project clean, but to make future projects easier to generate, review, and maintain.

## Core Principle

The starter architecture is a product, not just a project scaffold.

That means code quality must optimize for:

1. reuse
2. readability
3. testability
4. low-friction extension
5. low-friction review

## Architecture Rules

1. Prefer clear feature and domain boundaries over convenience-based file dumping.
2. Keep app-level composition separate from reusable UI primitives and reusable content blocks.
3. Do not mix CMS schema logic, presentation logic, and utility logic in the same files without strong reason.
4. Keep starter-level abstractions small and justified.
5. Build for the next 3 to 10 similar projects, not for every imaginable industry.

## Reuse Rules

1. Reuse via design tokens, blocks, utilities, and page patterns.
2. Do not duplicate section-level UI if it can be a block or variant.
3. Do not generalize prematurely; only extract reusable pieces after seeing a stable pattern.
4. Prefer parameterized composition over deep inheritance or highly abstract config systems.

## Component Rules

1. Components should have one clear responsibility.
2. Keep presentational components simple and composable.
3. Avoid giant multi-purpose components with too many conditional branches.
4. Separate data-fetching concerns from reusable display components where practical.
5. Keep props explicit and predictable.

## File Architecture Rules

The codebase should aim for a structure that clearly separates:

1. app routes and page composition
2. shared UI primitives
3. CMS blocks
4. domain entities like services, reviews, and service areas
5. CMS collections and globals
6. utilities and config
7. tests

## Testing Rules

Minimum quality expectations:

1. critical data shaping and core utilities should be testable
2. key business logic should have direct tests
3. major page flows and lead-capture paths should have integration or end-to-end coverage
4. the starter should support regression testing for common blocks and key routes

Suggested stack:

1. unit tests for utilities and business logic
2. Playwright for important user flows
3. linting and typechecking as required baseline checks
4. React Doctor after major React changes

## Clean Code Rules

1. Prefer simple, obvious code over clever code.
2. Use meaningful names.
3. Keep functions narrow in responsibility.
4. Remove dead code quickly.
5. Keep comments rare and useful.
6. Avoid hidden coupling between CMS structures and frontend blocks.

## Code Review Rules

Every meaningful implementation should be reviewed against:

1. architecture fit
2. package-boundary compliance
3. reusability for future client projects
4. test coverage of risky logic
5. visual quality and consistency

## Skills And Tooling Recommendations

Useful support layers:

1. `superpowers` for implementation planning, review flow, and verification discipline
2. local `react-doctor` workflow after React-heavy changes
3. Payload skill for collection design, access rules, hooks, and CMS correctness

## MCP / Tooling Guidance

If MCP-style tools are added later, use them for:

1. code search and indexing
2. design-system inspection
3. QA automation
4. structured test tooling

Do not rely on them to replace architecture judgment.

## Definition Of Done For Engineering Quality

The starter platform is not ready if it cannot be:

1. understood by another engineer quickly
2. extended for a new home-services client without messy rewrites
3. tested on core flows
4. reviewed for architecture and security with low ambiguity