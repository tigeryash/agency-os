import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedWhere } from '@/lib/payload'
import { isFeatureEnabled } from '@/lib/tiers'
import { Container, Section, Heading } from '@/components/ui'
import { PreviewBanner } from '@/components/PreviewBanner'
import Link from 'next/link'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Service Areas',
    description: 'See the cities and neighbourhoods currently covered by the starter site.',
    path: '/service-areas',
  })
}

export default async function ServiceAreasPage() {
  if (!isFeatureEnabled('serviceAreas')) notFound()

  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayloadClient()
  const { docs: areas } = await payload.find({
    collection: 'service-areas',
    where: getPublishedWhere(isDraft),
    draft: isDraft,
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
      {isDraft && <PreviewBanner currentPath="/service-areas" />}
    </main>
  )
}
