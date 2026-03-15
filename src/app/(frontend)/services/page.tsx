import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedWhere } from '@/lib/payload'
import { Container, Section, Heading } from '@/components/ui'
import Link from 'next/link'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Services',
    description: 'Browse the home services currently offered across the Greater Toronto Area.',
    path: '/services',
  })
}

export default async function ServicesPage() {
  const payload = await getPayloadClient()
  const { docs: services } = await payload.find({
    collection: 'services',
    where: getPublishedWhere(),
    sort: 'title',
  })

  return (
    <main>
      <Section>
        <Container>
          <Heading level={1}>Our Services</Heading>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="block bg-surface-muted rounded-brand p-6 hover:shadow-md transition-shadow"
              >
                <Heading level={3}>{service.title}</Heading>
                {service.summary && (
                  <p className="mt-2 text-foreground-muted">{service.summary as string}</p>
                )}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  )
}
