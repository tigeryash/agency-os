# Deployment Environment And Secret Handling

This file defines the deployment requirements, environment variables, and secret-handling rules for the starter platform.

## Deployment Platform Requirements

### Minimum Infrastructure

1. **Runtime:** Node.js 20+ or Bun 1.x (Bun preferred)
2. **Database:** PostgreSQL 15+ (required by Payload CMS via `@payloadcms/db-postgres`)
3. **Hosting:** Any platform that supports Next.js (Vercel, Railway, Coolify, self-hosted)
4. **Build output:** Next.js standalone or default build — no Docker required for V1

### Recommended Platforms (V1)

- **Vercel** for hosting (zero-config Next.js, preview deploys)
- **Neon** or **Supabase** for managed PostgreSQL
- **Upstash** for Redis (rate limiting)
- **Cloudflare Turnstile** for spam protection (free tier)

## Environment Variables

### Required — App Will Not Start Without These

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URI` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `PAYLOAD_SECRET` | Encryption key for Payload CMS auth and tokens. Must be at least 32 characters. | Random string — generate with `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, sitemap, and robots.txt | `https://example.com` |

### Required For Production — Gracefully Absent In Dev

| Variable | Description | Behavior When Missing |
|---|---|---|
| `PREVIEW_SECRET` | Secret token required to access the draft preview route (`/preview`). Must be a random string, unique per environment. Generate with `openssl rand -hex 32`. | Preview route returns 403 for all requests |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile widget site key | Turnstile widget does not render |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server verification key | Server-side verification is skipped |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint | Rate limiting is disabled |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token | Rate limiting is disabled |

### Optional

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_TIER` | `launch` | Feature tier: `launch`, `growth`, or `premium` |
| `MCP_AUTH_TOKEN` | _(empty — open in dev)_ | Bearer token for the MCP API route |

## Secret Handling Rules

### Never Do

1. Never commit secrets to source control — not in `.env`, code, planning files, or CI config
2. Never log secrets to stdout or error output
3. Never expose server-side secrets via `NEXT_PUBLIC_` prefix
4. Never share production credentials across environments (dev/staging/prod must have separate secrets)
5. Never use production `DATABASE_URI` in CI — use a dedicated test database or ephemeral instance

### Always Do

1. Use the platform's secret/environment variable manager (Vercel env vars, Railway variables, etc.)
2. Generate `PAYLOAD_SECRET` with `openssl rand -hex 32` — never use short or guessable values
3. Keep `.env` in `.gitignore` (already configured)
4. Keep `.env.example` updated when new variables are added — include descriptions, never values
5. Rotate secrets if they are ever exposed in logs, commits, or screenshots

### CI Secrets

The current GitHub Actions workflow is self-contained for baseline CI and does not require repository secrets.

Current behavior:

1. CI provisions its own Postgres service container for E2E
2. CI seeds the database before build and Playwright tests
3. CI uses a workflow-scoped non-production `PAYLOAD_SECRET`

Repository secrets are only needed if CI is later expanded to use external hosted services or protected integrations.

## Pre-Launch Deployment Checklist

Before any client site goes live:

- [ ] All required env vars are set in the production environment
- [ ] `PAYLOAD_SECRET` is a unique, random 32+ character string
- [ ] `DATABASE_URI` points to a production database (not dev/CI)
- [ ] `NEXT_PUBLIC_SITE_URL` matches the production domain
- [ ] `PREVIEW_SECRET` is set to a unique, random string (different from dev/staging)
- [ ] Turnstile keys are configured for the production domain
- [ ] Upstash Redis is provisioned and configured
- [ ] Admin user is created with a strong password
- [ ] Default Payload admin route (`/admin`) access is verified
- [ ] MCP route is either disabled or protected with `MCP_AUTH_TOKEN`
- [ ] DNS and SSL are configured
- [ ] Preview/staging environment is tested before production cutover

## Environment Isolation

| Environment | Database | Secrets | Tier |
|---|---|---|---|
| Local dev | Local or dev PostgreSQL | `.env` file | Any (default `launch`) |
| CI | Ephemeral Postgres service container in GitHub Actions | Workflow env plus optional GitHub secrets if future integrations require them | `growth` (tests all features) |
| Staging | Staging PostgreSQL | Platform env vars | Matches production |
| Production | Production PostgreSQL | Platform env vars | Client-specific |

## Deferred

- Docker / containerization setup — not needed for V1, revisit when self-hosting is required
- Multi-tenant secret isolation — not needed until multiple client sites share infrastructure
- Secret rotation automation — manual rotation is sufficient at current scale
