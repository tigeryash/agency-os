import { getPayloadClient, getPublishedSlugWhere, getPublishedWhere } from '@/lib/payload'

export async function getPublishedServices() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: getPublishedWhere(),
    sort: 'title',
    limit: 100,
  })
  return docs
}

export async function getServiceBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: getPublishedSlugWhere(slug),
    limit: 1,
  })
  return docs[0] ?? null
}
