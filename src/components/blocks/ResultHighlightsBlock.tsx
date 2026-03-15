import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type Highlight = { label?: string; before?: string; after?: string }

export function ResultHighlightsBlock({ block }: { block: Block }) {
  const { heading, highlights } = block as Block & {
    heading?: string
    highlights?: Highlight[]
  }

  return (
    <Section>
      <Container>
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights?.map((item, i) => (
            <div key={i} className="rounded-brand border p-6 text-center">
              {item.label && <div className="font-medium mb-4">{item.label}</div>}
              <div className="flex items-center justify-center gap-4">
                {item.before && <span className="text-foreground-muted">{item.before}</span>}
                {item.before && item.after && <span className="text-brand-600 font-bold">→</span>}
                {item.after && <span className="font-bold text-brand-600">{item.after}</span>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
