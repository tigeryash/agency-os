import { getPayload, type Where } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export function getPublishedSlugWhere(slug: string): Where {
  return {
    and: [
      { slug: { equals: slug } } as Where,
      { status: { equals: 'published' } } as Where,
    ],
  }
}
