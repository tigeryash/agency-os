import { Section, Container, Heading, Button } from '@/components/ui'
import type { Block } from './BlockRenderer'

export function ContactFormBlock({ block }: { block: Block }) {
  const { heading, description } = block as Block & {
    heading?: string
    description?: string
  }

  return (
    <Section background="muted">
      <Container size="narrow">
        {heading && <Heading level={2} className="text-center">{heading}</Heading>}
        {description && <p className="mt-2 text-center text-foreground-muted">{description}</p>}
        <form className="mt-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="rounded-brand border px-4 py-3 w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rounded-brand border px-4 py-3 w-full"
              required
            />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="rounded-brand border px-4 py-3 w-full"
          />
          <textarea
            name="message"
            placeholder="How can we help?"
            rows={4}
            className="rounded-brand border px-4 py-3 w-full"
            required
          />
          <div className="text-center">
            <Button type="submit" size="lg">Send Message</Button>
          </div>
        </form>
      </Container>
    </Section>
  )
}
