import Link from 'next/link'
import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type ServiceDoc = {
  id?: string
  title?: string
  summary?: string
  slug?: string
}

export function ServicesGridBlock({ block }: { block: Block }) {
  const { heading, services } = block as Block & {
    heading?: string
    services?: ServiceDoc[]
  }

  return (
    <Section background="muted">
      <Container>
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, i) => {
            const content = (
              <>
                {service.title && <Heading level={3}>{service.title}</Heading>}
                {service.summary && <p className="mt-2 text-foreground-muted">{service.summary}</p>}
              </>
            )

            return service.slug ? (
              <Link
                key={service.id ?? i}
                href={`/services/${service.slug}`}
                className="block bg-surface rounded-brand p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {content}
              </Link>
            ) : (
              <div key={service.id ?? i} className="bg-surface rounded-brand p-6 shadow-sm">
                {content}
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
