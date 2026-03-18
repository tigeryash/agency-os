import { test, expect } from '@playwright/test'

test.describe('Preview routes', () => {
  test('preview route rejects missing secret', async ({ request }) => {
    const response = await request.get('/preview?path=/&collection=pages&slug=home')
    expect(response.status()).toBe(403)
  })

  test('preview route rejects invalid secret', async ({ request }) => {
    const response = await request.get(
      '/preview?path=/&collection=pages&slug=home&previewSecret=wrong'
    )
    expect(response.status()).toBe(403)
  })

  test('preview route rejects missing params', async ({ request }) => {
    const response = await request.get(
      `/preview?previewSecret=${process.env.PREVIEW_SECRET || 'dev-preview-secret'}`
    )
    expect(response.status()).toBe(404)
  })

  test('preview route rejects non-relative paths', async ({ request }) => {
    const response = await request.get(
      `/preview?path=https://evil.com&collection=pages&slug=home&previewSecret=${process.env.PREVIEW_SECRET || 'dev-preview-secret'}`
    )
    expect(response.status()).toBe(500)
  })

  test('preview route rejects unauthenticated users', async ({ request }) => {
    const response = await request.get(
      `/preview?path=/&collection=pages&slug=home&previewSecret=${process.env.PREVIEW_SECRET || 'dev-preview-secret'}`
    )
    expect(response.status()).toBe(403)
  })

  test('exit preview route redirects to path', async ({ page }) => {
    await page.goto('/preview/exit?path=/services')
    // Should redirect to /services
    expect(page.url()).toContain('/services')
  })
})

test.describe('Draft visibility', () => {
  test('published page is visible to public', async ({ page }) => {
    await page.goto('/')
    expect(await page.title()).toBeTruthy()
  })
})
