import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'

import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { BlockRenderer } from '@/components/blocks'
import { LivePreviewWrapper } from '@/components/LivePreviewWrapper'
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
  const { isEnabled: isDraft } = await draftMode()
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

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode()
  const page = await getHomePage(isDraft)
  if (!page) notFound()

  const layout = (page.layout ?? []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>

  return (
    <main>
      {isDraft ? (
        <LivePreviewWrapper
          initialData={page}
          serverURL={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
        >
          {(data) => {
            const liveLayout = ((data as typeof page).layout ?? []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>
            return <BlockRenderer blocks={liveLayout} />
          }}
        </LivePreviewWrapper>
      ) : (
        <BlockRenderer blocks={layout} />
      )}
      {isDraft && <PreviewBanner currentPath="/" />}
    </main>
  )
}
