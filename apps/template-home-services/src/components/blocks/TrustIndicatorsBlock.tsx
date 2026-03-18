import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type Indicator = { label?: string; value?: string }

export function TrustIndicatorsBlock({ block }: { block: Block }) {
  const { heading, indicators } = block as Block & {
    heading?: string
    indicators?: Indicator[]
  }

  return (
    <Section spacing="sm">
      <Container>
        {heading && <Heading level={3} className="text-center mb-8">{heading}</Heading>}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {indicators?.map((indicator, i) => (
            <div key={i} className="text-center">
              {indicator.value && <div className="text-h2 font-bold text-brand-600">{indicator.value}</div>}
              {indicator.label && <div className="text-small text-foreground-muted">{indicator.label}</div>}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
