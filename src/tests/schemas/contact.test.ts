import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/lib/schemas/contact'

describe('contactSchema', () => {
  it('accepts valid data', () => {
    const result = contactSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '416-555-0100',
      message: 'I need a new roof.',
    })
    expect(result.success).toBe(true)
  })

  it('requires name', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'john@example.com',
      message: 'Hello',
    })
    expect(result.success).toBe(false)
  })

  it('requires valid email', () => {
    const result = contactSchema.safeParse({
      name: 'John',
      email: 'not-an-email',
      message: 'Hello',
    })
    expect(result.success).toBe(false)
  })

  it('requires message', () => {
    const result = contactSchema.safeParse({
      name: 'John',
      email: 'john@example.com',
      message: '',
    })
    expect(result.success).toBe(false)
  })

  it('allows optional phone and service', () => {
    const result = contactSchema.safeParse({
      name: 'John',
      email: 'john@example.com',
      message: 'Hello',
    })
    expect(result.success).toBe(true)
  })

  it('rejects message over 2000 chars', () => {
    const result = contactSchema.safeParse({
      name: 'John',
      email: 'john@example.com',
      message: 'a'.repeat(2001),
    })
    expect(result.success).toBe(false)
  })
})
