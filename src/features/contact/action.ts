'use server'

import { headers } from 'next/headers'

import { getPayloadClient } from '@/lib/payload'
import { contactSchema } from '@/lib/schemas/contact'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

export type FormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

type SubmitContactFormInput = {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  turnstileToken: string
  honeypot?: string
  source?: string
}

export async function submitContactForm(data: SubmitContactFormInput): Promise<FormState> {
  if (data.honeypot) {
    return { success: true }
  }

  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const { success: withinLimit } = await checkRateLimit(ip)
  if (!withinLimit) {
    return { success: false, error: 'Too many requests. Please try again in a minute.' }
  }

  const turnstileValid = await verifyTurnstile(data.turnstileToken)
  if (!turnstileValid) {
    return { success: false, error: 'Verification failed. Please try again.' }
  }

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

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        ...result.data,
        source: data.source ?? 'contact-page',
      },
    })
  } catch (error) {
    console.error('Failed to store contact submission', error)
    return {
      success: false,
      error: 'We could not submit your request right now. Please try again shortly.',
    }
  }

  return { success: true }
}