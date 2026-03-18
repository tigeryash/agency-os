import { ContactForm } from '@/features/contact/ContactForm'
import { Section, Container, Heading } from '@/components/ui'
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
        <div className="mt-8">
          <ContactForm source="contact-block" />
        </div>
      </Container>
    </Section>
  )
}
