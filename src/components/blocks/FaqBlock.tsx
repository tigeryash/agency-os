import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type FaqItem = { question?: string; answer?: string }

export function FaqBlock({ block }: { block: Block }) {
  const { heading, items } = block as Block & {
    heading?: string
    items?: FaqItem[]
  }

  return (
    <Section>
      <Container size="narrow">
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="space-y-6">
          {items?.map((item, i) => (
            <details key={i} className="group border-b border-brand-100 pb-4">
              <summary className="cursor-pointer font-medium text-h4 list-none flex items-center justify-between">
                {item.question}
                <span className="text-brand-600 group-open:rotate-45 transition-transform">+</span>
              </summary>
              {item.answer && <p className="mt-3 text-foreground-muted">{item.answer}</p>}
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
