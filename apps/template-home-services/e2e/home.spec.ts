import { test, expect } from '@playwright/test'

import { isFeatureEnabledForTier, resolveTier } from '../src/lib/tiers'

const tier = resolveTier(process.env.NEXT_PUBLIC_TIER)

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/.*/)
})

test('contact page loads and has form', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.locator('h1')).toContainText('Contact')
  await expect(page.locator('form')).toBeVisible()
})

test('services page loads', async ({ page }) => {
  await page.goto('/services')
  await expect(page.locator('h1')).toContainText('Services')
})

test('service areas page loads', async ({ page }) => {
  const response = await page.goto('/service-areas')
  if (isFeatureEnabledForTier(tier, 'serviceAreas')) {
    await expect(page.locator('h1')).toContainText('Service Areas')
    expect(response?.status()).toBe(200)
    return
  }

  expect(response?.status()).toBe(404)
})

test('blog page loads', async ({ page }) => {
  const response = await page.goto('/blog')
  if (isFeatureEnabledForTier(tier, 'blog')) {
    await expect(page.locator('h1')).toContainText('Blog')
    expect(response?.status()).toBe(200)
    return
  }

  expect(response?.status()).toBe(404)
})
