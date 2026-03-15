import { getPayloadClient } from '@/lib/payload'

export async function getFeaturedReviews(limit = 6) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'reviews',
    where: {
      and: [
        { status: { equals: 'published' } },
        { featured: { equals: true } },
      ],
    },
    limit,
  })
  return docs
}

export async function getReviewsForService(serviceId: string, limit = 10) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'reviews',
    where: {
      and: [
        { status: { equals: 'published' } },
        { service: { equals: serviceId } },
      ],
    },
    limit,
  })
  return docs
}
