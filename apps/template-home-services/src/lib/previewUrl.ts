import { appendLivePreviewParam } from '@/lib/livePreview'
import { getPreviewSecret } from '@/lib/previewSecret'

const collectionPathMap: Record<string, (slug: string) => string> = {
  pages: (slug) => (slug === 'home' ? '/' : `/${slug}`),
  services: (slug) => `/services/${slug}`,
  posts: (slug) => `/blog/${slug}`,
  'service-areas': (slug) => `/service-areas/${slug}`,
}

export function generatePreviewUrl({
  slug,
  collection,
}: {
  slug: string
  collection: string
}): string {
  const pathFn = collectionPathMap[collection]
  const path = pathFn ? pathFn(slug) : `/${slug}`

  const params = new URLSearchParams({
    slug,
    collection,
    path,
    previewSecret: getPreviewSecret() || '',
  })

  return `/preview?${params.toString()}`
}

export function generateLivePreviewUrl({
  data,
  collectionConfig,
  globalConfig,
}: {
  data: Record<string, unknown>
  collectionConfig?: { slug: string } | null
  globalConfig?: { slug: string } | null
}): string {
  const path = collectionConfig
    ? (collectionPathMap[collectionConfig.slug]?.(data.slug as string) ?? '/')
    : '/'

  const params = new URLSearchParams({
    path: appendLivePreviewParam(path),
    previewSecret: getPreviewSecret() || '',
  })

  if (collectionConfig) {
    params.set('collection', collectionConfig.slug)
    params.set('slug', String(data.slug ?? ''))
  }

  if (globalConfig) {
    params.set('global', globalConfig.slug)
  }

  return `/preview?${params.toString()}`
}
