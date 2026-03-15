# Starter Skeleton

Approved folder structure and config boundaries for the monolithic Next.js + Payload CMS starter repository.

## Folder Tree

```
agency-starter/
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   ├── page.tsx
│   │   │   ├── contact/
│   │   │   ├── services/
│   │   │   ├── service-areas/
│   │   │   └── blog/
│   │   └── (payload)/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── blocks/
│   │   └── sections/
│   │
│   ├── features/
│   │   ├── services/
│   │   ├── service-areas/
│   │   └── reviews/
│   │
│   ├── lib/
│   ├── styles/
│   │
│   ├── payload/
│   │   ├── collections/
│   │   ├── globals/
│   │   ├── blocks/
│   │   ├── fields/
│   │   ├── hooks/
│   │   ├── access/
│   │   └── utilities/
│   │
│   └── tests/
│
├── e2e/
├── public/
│
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── tailwind.config.ts
├── playwright.config.ts
├── next.config.ts
├── payload.config.ts
├── package.json
└── README.md
```

## Package Manager

Bun

## Base Config Surface

| Config | Tool | Purpose |
|---|---|---|
| `tsconfig.json` | TypeScript | Strict mode, path aliases (`@/`) |
| `.eslintrc.js` | ESLint | Next.js + Payload linting rules |
| `.prettierrc` | Prettier | Consistent formatting |
| `next.config.ts` | Next.js | Images, redirects, env exposure |
| `payload.config.ts` | Payload | DB adapter, admin, collection and global registration |
| `tailwind.config.ts` | Tailwind | Token-driven theme, content paths |
| `playwright.config.ts` | Playwright | E2E test config, base URL |
| `.env.example` | dotenv | Template for required env vars |
| `package.json` scripts | bun | dev, build, start, lint, typecheck, test, test:e2e |

## Deferrals

- Feature flags and tier gating logic
- CI/CD pipeline

## Future Considerations

- `@mcp-b/react-webmcp` — browser-side MCP hooks to let AI assistants interact with the live frontend UI (e.g., helping clients navigate the site, assisting editors in the admin dashboard). Complementary to the existing server-side MCP at `/api/mcp`.
