import Link from 'next/link'
import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type AreaDoc = {
  id?: string
  title?: string
  slug?: string
}

export function ServiceAreaCoverageBlock({ block }: { block: Block }) {
  const { heading, description, areas } = block as Block & {
    heading?: string
    description?: string
    areas?: AreaDoc[]
  }

  return (
    <Section background="muted">
      <Container>
        {heading && <Heading level={2} className="text-center mb-4">{heading}</Heading>}
        {description && <p className="text-center text-foreground-muted mb-8">{description}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          {areas?.map((area, i) =>
            area.slug ? (
              <Link
                key={area.id ?? i}
                href={`/service-areas/${area.slug}`}
                className="bg-surface rounded-brand px-4 py-2 text-small font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                {area.title}
              </Link>
            ) : (
              <span key={area.id ?? i} className="bg-surface rounded-brand px-4 py-2 text-small font-medium shadow-sm">
                {area.title}
              </span>
            ),
          )}
        </div>
      </Container>
    </Section>
  )
}
