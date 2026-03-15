import { getPayloadClient } from '@/lib/payload'

export async function getPublishedServices() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { status: { equals: 'published' } },
    sort: 'title',
    limit: 100,
  })
  return docs
}

export async function getServiceBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
}
