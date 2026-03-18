import { getPayload, type Where } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

const publishedConditions: Where[] = [
  { _status: { equals: 'published' } } as Where,
  { archived: { equals: false } } as Where,
  {
    or: [
      { publishedAt: { less_than_equal: new Date().toISOString() } } as Where,
      { publishedAt: { exists: false } } as Where,
    ],
  } as Where,
]

export function getPublishedWhere(draft: boolean = false): Where {
  if (draft) return {}
  return { and: publishedConditions }
}

export function getPublishedSlugWhere(slug: string, draft: boolean = false): Where {
  if (draft) return { slug: { equals: slug } }
  return { and: [{ slug: { equals: slug } } as Where, ...publishedConditions] }
}
