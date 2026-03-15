import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const payload = await getPayloadClient()

  const [pages, services, serviceAreas, posts] = await Promise.all([
    payload.find({ collection: 'pages', where: { status: { equals: 'published' } }, limit: 1000 }),
    payload.find({ collection: 'services', where: { status: { equals: 'published' } }, limit: 1000 }),
    payload.find({ collection: 'service-areas', where: { status: { equals: 'published' } }, limit: 1000 }),
    payload.find({ collection: 'posts', where: { status: { equals: 'published' } }, limit: 1000 }),
  ])

  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/service-areas`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 },
  ]

  for (const page of pages.docs) {
    if (page.slug === 'home') continue
    entries.push({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  for (const service of services.docs) {
    entries.push({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(service.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  for (const area of serviceAreas.docs) {
    entries.push({
      url: `${siteUrl}/service-areas/${area.slug}`,
      lastModified: new Date(area.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  for (const post of posts.docs) {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return entries
}
