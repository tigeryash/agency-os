import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Mock @payload-config so pure helpers can be unit-tested without Payload's full init
      '@payload-config': path.resolve(__dirname, 'src/tests/__mocks__/payload-config.ts'),
    },
  },
})
