import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { BlockRenderer } from '@/components/blocks'
import type { Metadata } from 'next'

type Args = { params: Promise<{ slug: string }> }
type MetaGroup = {
  title?: string
  description?: string
  image?: string | { url?: string | null } | null
  noIndex?: boolean
  canonicalUrl?: string
}

async function getPage(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: getPublishedSlugWhere(slug),
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
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
  const page = await getPage(slug)
  if (!page) notFound()

  const layout = (page.layout ?? []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>

  return (
    <main>
      <BlockRenderer blocks={layout} />
    </main>
  )
}
