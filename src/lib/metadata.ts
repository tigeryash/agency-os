import type { Metadata } from 'next'
import { getPayloadClient } from './payload'

type SiteSettingsData = {
  businessName?: string
  primaryCTA?: { label?: string; url?: string }
}

let cachedSettings: SiteSettingsData | null = null

export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (cachedSettings) return cachedSettings
  const payload = await getPayloadClient()
  const settings = (await payload.findGlobal({ slug: 'site-settings' })) as SiteSettingsData
  cachedSettings = settings
  return settings
}

type MetaInput = {
  title?: string
  description?: string
  image?: string
  path?: string
}

export async function buildMetadata(meta: MetaInput): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const siteName = settings.businessName ?? 'Agency Starter'

  const title = meta.title ? `${meta.title} | ${siteName}` : siteName
  const description = meta.description ?? `${siteName} — Professional home services in the Greater Toronto Area.`
  const canonical = meta.path ? `${siteUrl}${meta.path}` : undefined

  return {
    title,
    description,
    ...(canonical && {
      alternates: { canonical },
    }),
    openGraph: {
      title,
      description,
      siteName,
      type: 'website',
      ...(meta.image && { images: [{ url: meta.image }] }),
    },
  }
}
