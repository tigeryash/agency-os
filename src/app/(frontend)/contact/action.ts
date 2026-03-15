'use server'

import { headers } from 'next/headers'
import { contactSchema } from '@/lib/schemas/contact'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

export type FormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitContactForm(
  data: {
    name: string
    email: string
    phone?: string
    service?: string
    message: string
    turnstileToken: string
    honeypot?: string
  },
): Promise<FormState> {
  // Honeypot check — bots fill hidden fields
  if (data.honeypot) {
    // Silently succeed to not tip off bots
    return { success: true }
  }

  // Rate limiting by IP
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const { success: withinLimit } = await checkRateLimit(ip)
  if (!withinLimit) {
    return { success: false, error: 'Too many requests. Please try again in a minute.' }
  }

  // Turnstile verification
  const turnstileValid = await verifyTurnstile(data.turnstileToken)
  if (!turnstileValid) {
    return { success: false, error: 'Verification failed. Please try again.' }
  }

  // Validate with Zod
  const result = contactSchema.safeParse(data)
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
      const key = String(issue.path[0])
      if (!fieldErrors[key]) fieldErrors[key] = []
      fieldErrors[key].push(issue.message)
    }
    return { success: false, error: 'Please fix the errors below.', fieldErrors }
  }

  // TODO: Deliver the lead (email, CRM, Payload collection, etc.)
  // This is intentionally left as a hook point — delivery method is per-client.

  return { success: true }
}
