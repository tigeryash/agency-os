import { defineConfig } from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: isCI ? 'bun run start' : 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !isCI,
  },
})
