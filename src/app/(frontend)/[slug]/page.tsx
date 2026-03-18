import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { PageLivePreview } from '@/components/PageLivePreview'
import { buildMetadata } from '@/lib/metadata'
import { hydrateBlocksForRender } from '@/lib/hydrateBlocksForRender'
import { isLivePreviewEnabled } from '@/lib/livePreview'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { BlockRenderer } from '@/components/blocks'
import { PreviewBanner } from '@/components/PreviewBanner'
import type { Metadata } from 'next'

type Args = { params: Promise<{ slug: string }> }
type MetaGroup = {
  title?: string
  description?: string
  image?: string | { url?: string | null } | null
  noIndex?: boolean
  canonicalUrl?: string
}

async function getPage(slug: string, draft: boolean = false) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: getPublishedSlugWhere(slug, draft),
    draft,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const [{ slug }, { isEnabled: isDraft }] = await Promise.all([params, draftMode()])
  const page = await getPage(slug, isDraft)
  if (!page) return {}

  const meta = page.meta as MetaGroup | undefined
  return buildMetadata({
    title: meta?.title ?? page.title,
    description: meta?.description,
    image: meta?.image,
    canonicalUrl: meta?.canonicalUrl,
    noIndex: meta?.noIndex,
    path: `/${slug}`,
  })
}

export default async function Page({
  params,
  searchParams,
}: Args & {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const [{ slug }, { isEnabled: isDraft }, resolvedSearchParams] = await Promise.all([
    params,
    draftMode(),
    searchParams ?? Promise.resolve(undefined),
  ])
  const isLivePreview = isLivePreviewEnabled(resolvedSearchParams)
  const page = await getPage(slug, isDraft)
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
      {isDraft && <PreviewBanner currentPath={`/${slug}`} />}
    </main>
  )
}
