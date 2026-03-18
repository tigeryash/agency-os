import { buildMetadata } from '@/lib/metadata'
import { Container, Section, Heading } from '@/components/ui'
import { ContactForm } from '@/features/contact/ContactForm'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Contact',
    description: 'Request a free estimate for your next home-services project.',
    path: '/contact',
  })
}

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
            <ContactForm source="contact-page" />
          </div>
        </Container>
      </Section>
    </main>
  )
}
