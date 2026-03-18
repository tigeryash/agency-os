import { Section, Container, Heading, Button } from '@/components/ui'
import type { Block } from './BlockRenderer'

export function EmergencyCalloutBlock({ block }: { block: Block }) {
  const { heading, description, phone, ctaLabel } = block as Block & {
    heading?: string
    description?: string
    phone?: string
    ctaLabel?: string
  }

  return (
    <Section background="inverse" spacing="sm">
      <Container>
        <div className="text-center">
          {heading && <Heading level={3} className="text-foreground-inverse">{heading}</Heading>}
          {description && <p className="mt-2 text-foreground-inverse/80">{description}</p>}
          {phone && (
            <div className="mt-4">
              <Button variant="secondary" size="lg">{ctaLabel ?? phone}</Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
