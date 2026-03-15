import { notFound } from 'next/navigation'

import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { BlockRenderer } from '@/components/blocks'

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

  return buildMetadata({
    title: (page?.meta as { title?: string } | undefined)?.title ?? page?.title,
    description: (page?.meta as { description?: string } | undefined)?.description,
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
