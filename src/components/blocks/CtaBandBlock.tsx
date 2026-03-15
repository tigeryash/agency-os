import { Section, Container, Heading, Button } from '@/components/ui'
import type { Block } from './BlockRenderer'

export function CtaBandBlock({ block }: { block: Block }) {
  const { heading, description, ctaLabel, ctaUrl } = block as Block & {
    heading?: string
    description?: string
    ctaLabel?: string
    ctaUrl?: string
  }

  return (
    <Section background="inverse" spacing="sm">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            {heading && <Heading level={3} className="text-foreground-inverse">{heading}</Heading>}
            {description && <p className="mt-2 text-foreground-inverse/80">{description}</p>}
          </div>
          {ctaLabel && ctaUrl && <Button variant="secondary" size="lg">{ctaLabel}</Button>}
        </div>
      </Container>
    </Section>
  )
}
