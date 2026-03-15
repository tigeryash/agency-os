import { Section, Container, Heading, Button } from '@/components/ui'
import type { Block } from './BlockRenderer'

export function HeroBlock({ block }: { block: Block }) {
  const { heading, subheading, ctaLabel, ctaUrl } = block as Block & {
    heading?: string
    subheading?: string
    ctaLabel?: string
    ctaUrl?: string
  }

  return (
    <Section background="default" spacing="default">
      <Container>
        <div className="text-center max-w-content mx-auto">
          {heading && <Heading level={1} className="text-display">{heading}</Heading>}
          {subheading && <p className="mt-6 text-foreground-muted text-h4">{subheading}</p>}
          {ctaLabel && ctaUrl && (
            <div className="mt-8">
              <Button size="lg">{ctaLabel}</Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
