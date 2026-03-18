import { describe, it, expect } from 'vitest'
import { getPublishedWhere, getPublishedSlugWhere } from '@/lib/payload'

describe('getPublishedWhere', () => {
  it('returns published + not-archived + publishedAt filter when draft is false', () => {
    const where = getPublishedWhere(false)
    expect(where).toHaveProperty('and')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions = (where as any).and
    expect(conditions).toContainEqual({ _status: { equals: 'published' } })
    expect(conditions).toContainEqual({ archived: { equals: false } })
    // Should include publishedAt date-gating
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const publishedAtCondition = conditions.find((c: any) => c.or)
    expect(publishedAtCondition).toBeTruthy()
  })

  it('returns published + not-archived + publishedAt filter when draft is omitted', () => {
    const where = getPublishedWhere()
    expect(where).toHaveProperty('and')
  })

  it('returns empty filter when draft is true', () => {
    const where = getPublishedWhere(true)
    expect(where).toEqual({})
  })
})

describe('getPublishedSlugWhere', () => {
  it('returns slug + published filter when draft is false', () => {
    const where = getPublishedSlugWhere('about', false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions = (where as any).and
    expect(conditions).toContainEqual({ slug: { equals: 'about' } })
    expect(conditions).toContainEqual({ _status: { equals: 'published' } })
    expect(conditions).toContainEqual({ archived: { equals: false } })
  })

  it('returns slug-only filter when draft is true', () => {
    const where = getPublishedSlugWhere('about', true)
    expect(where).toEqual({
      slug: { equals: 'about' },
    })
  })
})
