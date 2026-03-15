import { test, expect } from '@playwright/test'

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
  await page.goto('/service-areas')
  await expect(page.locator('h1')).toContainText('Service Areas')
})

test('blog page loads', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.locator('h1')).toContainText('Blog')
})
