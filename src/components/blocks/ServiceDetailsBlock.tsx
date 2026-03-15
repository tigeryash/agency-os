import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

export function ServiceDetailsBlock({ block }: { block: Block }) {
  const { heading, description, features } = block as Block & {
    heading?: string
    description?: string
    features?: string[]
  }

  return (
    <Section>
      <Container size="narrow">
        {heading && <Heading level={2}>{heading}</Heading>}
        {description && <p className="mt-4 text-foreground-muted">{description}</p>}
        {features && features.length > 0 && (
          <ul className="mt-6 space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-600 mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}
