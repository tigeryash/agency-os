import { describe, it, expect } from 'vitest'
import { publishedOrAuthenticated } from '@/payload/access/publishedOrAuthenticated'

describe('publishedOrAuthenticated', () => {
  it('returns status filter when no user', () => {
    const result = publishedOrAuthenticated({ req: { user: null } } as any)
    expect(result).toEqual({ _status: { equals: 'published' } })
  })

  it('returns true when user is authenticated', () => {
    const result = publishedOrAuthenticated({ req: { user: { id: '1' } } } as any)
    expect(result).toBe(true)
  })
})
