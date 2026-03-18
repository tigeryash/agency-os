import { getPayload, type Where } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export function getPublishedWhere(draft: boolean = false): Where {
  if (draft) return {}
  return {
    and: [
      { _status: { equals: 'published' } } as Where,
      { archived: { equals: false } } as Where,
      {
        or: [
          { publishedAt: { less_than_equal: new Date().toISOString() } } as Where,
          { publishedAt: { exists: false } } as Where,
        ],
      } as Where,
    ],
  }
}

export function getPublishedSlugWhere(slug: string, draft: boolean = false): Where {
  if (draft) {
    return { slug: { equals: slug } }
  }
  return {
    and: [
      { slug: { equals: slug } } as Where,
      ...((getPublishedWhere(false) as any).and || []),
    ],
  }
}
