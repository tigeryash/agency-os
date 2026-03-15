import type { Metadata } from 'next'
import { getPayloadClient } from './payload'

type UploadValue =
  | string
  | {
      url?: string | null
    }
  | null
  | undefined

type MetaGroupData = {
  title?: string
  description?: string
  image?: UploadValue
  noIndex?: boolean
  canonicalUrl?: string
}

type SiteSettingsData = {
  businessName?: string
  phonePrimary?: string
  emailPrimary?: string
  primaryCTA?: { label?: string; url?: string }
  defaultMeta?: MetaGroupData
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
  image?: UploadValue
  path?: string
  canonicalUrl?: string
  noIndex?: boolean
}

function getUploadUrl(value: UploadValue): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return value
  return value.url ?? undefined
}

export async function buildMetadata(meta: MetaInput): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const siteName = settings.businessName ?? 'Agency Starter'
  const defaultMeta = settings.defaultMeta

  const metaTitle = meta.title ?? defaultMeta?.title
  const title = metaTitle ? `${metaTitle} | ${siteName}` : siteName
  const description = meta.description
    ?? defaultMeta?.description
    ?? `${siteName} — Professional home services in the Greater Toronto Area.`
  const canonical = meta.canonicalUrl ?? (meta.path ? `${siteUrl}${meta.path}` : undefined)
  const image = getUploadUrl(meta.image) ?? getUploadUrl(defaultMeta?.image)

  return {
    title,
    description,
    ...(meta.noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    ...(canonical && {
      alternates: { canonical },
    }),
    openGraph: {
      title,
      description,
      siteName,
      type: 'website',
      ...(image && { images: [{ url: image }] }),
    },
  }
}
