import { notFound } from 'next/navigation'

import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { BlockRenderer } from '@/components/blocks'

type MetaGroup = {
  title?: string
  description?: string
  image?: string | { url?: string | null } | null
  noIndex?: boolean
  canonicalUrl?: string
}

async function getHomePage() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: getPublishedSlugWhere('home'),
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata() {
  const page = await getHomePage()
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
  const page = await getHomePage()
  if (!page) notFound()
  const layout = (page?.layout ?? []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>

  return (
    <main>
      <BlockRenderer blocks={layout} />
    </main>
  )
}
