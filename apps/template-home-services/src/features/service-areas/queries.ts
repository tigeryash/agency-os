import { getPayloadClient, getPublishedSlugWhere, getPublishedWhere } from '@/lib/payload'

export async function getPublishedServiceAreas() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'service-areas',
    where: getPublishedWhere(),
    sort: 'title',
    limit: 100,
  })
  return docs
}

export async function getServiceAreaBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'service-areas',
    where: getPublishedSlugWhere(slug),
    limit: 1,
  })
  return docs[0] ?? null
}
