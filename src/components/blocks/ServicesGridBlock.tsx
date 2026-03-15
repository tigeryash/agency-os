import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type ServiceItem = { title?: string; description?: string; url?: string }

export function ServicesGridBlock({ block }: { block: Block }) {
  const { heading, services } = block as Block & {
    heading?: string
    services?: ServiceItem[]
  }

  return (
    <Section background="muted">
      <Container>
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, i) => (
            <div key={i} className="bg-surface rounded-brand p-6 shadow-sm">
              {service.title && <Heading level={3}>{service.title}</Heading>}
              {service.description && <p className="mt-2 text-foreground-muted">{service.description}</p>}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
