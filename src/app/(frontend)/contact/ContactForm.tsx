'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Turnstile } from '@marsidev/react-turnstile'
import { contactSchema } from '@/lib/schemas/contact'
import { submitContactForm, type FormState } from './action'
import { Button } from '@/components/ui'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

export function ContactForm() {
  const [formState, setFormState] = useState<FormState | null>(null)
  const [turnstileToken, setTurnstileToken] = useState('')

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      honeypot: '',
    },
    onSubmit: async ({ value }) => {
      const result = await submitContactForm({
        ...value,
        turnstileToken,
      })
      setFormState(result)
    },
  })

  if (formState?.success) {
    return (
      <div className="rounded-brand bg-brand-50 p-6 text-center">
        <p className="font-medium text-brand-700">Thank you! We&apos;ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      {formState?.error && (
        <div className="rounded-brand bg-red-50 p-4 text-red-700 text-small">
          {formState.error}
        </div>
      )}

      {/* Honeypot — hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <form.Field name="honeypot">
          {(field) => (
            <input
              tabIndex={-1}
              autoComplete="off"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field
          name="name"
          validators={{ onChange: contactSchema.shape.name }}
        >
          {(field) => (
            <div>
              <input
                type="text"
                placeholder="Name"
                className="rounded-brand border px-4 py-3 w-full"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-small text-red-600">
                  {typeof field.state.meta.errors[0] === 'string'
                    ? field.state.meta.errors[0]
                    : field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{ onChange: contactSchema.shape.email }}
        >
          {(field) => (
            <div>
              <input
                type="email"
                placeholder="Email"
                className="rounded-brand border px-4 py-3 w-full"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-small text-red-600">
                  {typeof field.state.meta.errors[0] === 'string'
                    ? field.state.meta.errors[0]
                    : field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="phone">
        {(field) => (
          <input
            type="tel"
            placeholder="Phone"
            className="rounded-brand border px-4 py-3 w-full"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      <form.Field name="service">
        {(field) => (
          <select
            className="rounded-brand border px-4 py-3 w-full"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          >
            <option value="">Select a service...</option>
          </select>
        )}
      </form.Field>

      <form.Field
        name="message"
        validators={{ onChange: contactSchema.shape.message }}
      >
        {(field) => (
          <div>
            <textarea
              placeholder="How can we help?"
              rows={4}
              className="rounded-brand border px-4 py-3 w-full"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-1 text-small text-red-600">
                {typeof field.state.meta.errors[0] === 'string'
                  ? field.state.meta.errors[0]
                  : field.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {TURNSTILE_SITE_KEY && (
        <Turnstile
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setTurnstileToken}
        />
      )}

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
