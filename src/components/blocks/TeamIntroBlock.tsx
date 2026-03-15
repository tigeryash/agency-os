import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

export function TeamIntroBlock({ block }: { block: Block }) {
  const { heading, description } = block as Block & {
    heading?: string
    description?: string
  }

  return (
    <Section>
      <Container size="narrow">
        {heading && <Heading level={2}>{heading}</Heading>}
        {description && <p className="mt-4 text-foreground-muted">{description}</p>}
      </Container>
    </Section>
  )
}
