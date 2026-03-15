import { getPayloadClient } from '@/lib/payload'
import { BlockRenderer } from '@/components/blocks'

async function getHomePage() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

export default async function HomePage() {
  const page = await getHomePage()
  const layout = (page?.layout ?? []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>

  return (
    <main>
      <BlockRenderer blocks={layout} />
    </main>
  )
}
