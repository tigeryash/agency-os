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
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/preview?${params.toString()}`
}

export function generateLivePreviewUrl({
  data,
  collectionConfig,
}: {
  data: Record<string, any>
  collectionConfig?: { slug: string } | null
}): string {
  if (!collectionConfig) return '/'

  const pathFn = collectionPathMap[collectionConfig.slug]
  return pathFn ? pathFn(data.slug) : '/'
}
