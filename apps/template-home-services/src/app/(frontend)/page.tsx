import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'

import { PageLivePreview } from '@/components/PageLivePreview'
import { buildMetadata } from '@/lib/metadata'
import { hydrateBlocksForRender } from '@/lib/hydrateBlocksForRender'
import { isLivePreviewEnabled } from '@/lib/livePreview'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { BlockRenderer } from '@/components/blocks'
import { PreviewBanner } from '@/components/PreviewBanner'

type MetaGroup = {
  title?: string
  description?: string
  image?: string | { url?: string | null } | null
  noIndex?: boolean
  canonicalUrl?: string
}

async function getHomePage(draft: boolean = false) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: getPublishedSlugWhere('home', draft),
    draft,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata() {
  const [{ isEnabled: isDraft }] = await Promise.all([draftMode()])
  const page = await getHomePage(isDraft)
  const meta = page?.meta as MetaGroup | undefined

  return buildMetadata({
    title: meta?.title ?? page?.title,
    description: meta?.description,
    image: meta?.image,
    canonicalUrl: meta?.canonicalUrl,
    noIndex: meta?.noIndex,
    path: '/',
  })
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const [{ isEnabled: isDraft }, resolvedSearchParams] = await Promise.all([
    draftMode(),
    searchParams ?? Promise.resolve(undefined),
  ])
  const isLivePreview = isLivePreviewEnabled(resolvedSearchParams)
  const page = await getHomePage(isDraft)
  if (!page) notFound()

  const layout = await hydrateBlocksForRender(
    (page.layout ?? []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>,
    isDraft,
  )

  const pageWithLayout = {
    ...page,
    layout,
  }

  return (
    <main>
      {isLivePreview ? <PageLivePreview page={pageWithLayout} /> : <BlockRenderer blocks={layout} />}
      {isDraft && <PreviewBanner currentPath="/" />}
    </main>
  )
}
