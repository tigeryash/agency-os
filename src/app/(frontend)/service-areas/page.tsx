import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { isFeatureEnabled } from '@/lib/tiers'
import { Container, Section, Heading } from '@/components/ui'
import Link from 'next/link'

export default async function ServiceAreasPage() {
  if (!isFeatureEnabled('serviceAreas')) notFound()

  const payload = await getPayloadClient()
  const { docs: areas } = await payload.find({
    collection: 'service-areas',
    where: { status: { equals: 'published' } },
    sort: 'title',
  })

  return (
    <main>
      <Section>
        <Container>
          <Heading level={1}>Service Areas</Heading>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area) => (
              <Link
                key={area.id}
                href={`/service-areas/${area.slug}`}
                className="block bg-surface-muted rounded-brand p-6 hover:shadow-md transition-shadow"
              >
                <Heading level={3}>{area.title}</Heading>
                {area.description && (
                  <p className="mt-2 text-foreground-muted">{area.description as string}</p>
                )}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  )
}
