import { Container, Section, Heading } from '@/components/ui'
import { ContactForm } from './ContactForm'

export default function ContactPage() {
  return (
    <main>
      <Section>
        <Container size="narrow">
          <Heading level={1}>Contact Us</Heading>
          <p className="mt-4 text-foreground-muted">
            Get in touch for a free estimate.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </main>
  )
}
