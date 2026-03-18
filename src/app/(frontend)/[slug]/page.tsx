import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { BlockRenderer } from '@/components/blocks'
import { LayoutLivePreview } from '@/components/live-preview/LayoutLivePreview'
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
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
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

export default async function Page({ params }: Args) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const page = await getPage(slug, isDraft)
  if (!page) notFound()

  const layout = (page.layout ?? []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>

  return (
    <main>
      {isDraft ? (
        <LayoutLivePreview
          initialData={page}
          serverURL={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
        />
      ) : (
        <BlockRenderer blocks={layout} />
      )}
      {isDraft && <PreviewBanner currentPath={`/${slug}`} />}
    </main>
  )
}
