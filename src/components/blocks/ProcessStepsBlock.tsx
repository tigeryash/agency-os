import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type Step = { title?: string; description?: string }

export function ProcessStepsBlock({ block }: { block: Block }) {
  const { heading, steps } = block as Block & {
    heading?: string
    steps?: Step[]
  }

  return (
    <Section>
      <Container>
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps?.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-foreground-inverse flex items-center justify-center mx-auto font-bold">
                {i + 1}
              </div>
              {step.title && <Heading level={4} className="mt-4">{step.title}</Heading>}
              {step.description && <p className="mt-2 text-foreground-muted">{step.description}</p>}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
