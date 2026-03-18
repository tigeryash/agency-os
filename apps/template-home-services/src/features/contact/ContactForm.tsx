'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Turnstile } from '@marsidev/react-turnstile'

import { Button } from '@/components/ui'
import { contactSchema } from '@/lib/schemas/contact'

import { submitContactForm, type FormState } from './action'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

type ContactFormProps = {
  source?: string
}

export function ContactForm({ source = 'contact-page' }: ContactFormProps) {
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
        source,
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
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      {formState?.error && (
        <div className="rounded-brand bg-red-50 p-4 text-red-700 text-small">
          {formState.error}
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <form.Field name="honeypot">
          {(field) => (
            <input
              tabIndex={-1}
              autoComplete="off"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <form.Field
          name="name"
          validators={{ onChange: contactSchema.shape.name }}
        >
          {(field) => (
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-brand border px-4 py-3"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
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
                className="w-full rounded-brand border px-4 py-3"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
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
            className="w-full rounded-brand border px-4 py-3"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>

      <form.Field name="service">
        {(field) => (
          <input
            type="text"
            placeholder="Requested service"
            className="w-full rounded-brand border px-4 py-3"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
          />
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
              className="w-full rounded-brand border px-4 py-3"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
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