import { getPayload, type Where } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export function getPublishedWhere(): Where {
  return {
    and: [
      { status: { equals: 'published' } } as Where,
      {
        or: [
          { publishedAt: { less_than_equal: new Date().toISOString() } } as Where,
          { publishedAt: { exists: false } } as Where,
        ],
      } as Where,
    ],
  }
}

export function getPublishedSlugWhere(slug: string): Where {
  return {
    and: [
      { slug: { equals: slug } } as Where,
      getPublishedWhere(),
    ],
  }
}
