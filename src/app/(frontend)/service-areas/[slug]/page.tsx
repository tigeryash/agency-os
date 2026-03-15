import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { Container, Section, Heading, RichText } from '@/components/ui'
import type { Metadata } from 'next'

type Args = { params: Promise<{ slug: string }> }

async function getServiceArea(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'service-areas',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const area = await getServiceArea(slug)
  if (!area) return {}

  const meta = area.meta as { title?: string; description?: string } | undefined
  return {
    title: meta?.title ?? area.title,
    description: meta?.description ?? (area.description as string | undefined),
  }
}

export default async function ServiceAreaPage({ params }: Args) {
  const { slug } = await params
  const area = await getServiceArea(slug)
  if (!area) notFound()

  return (
    <main>
      <Section>
        <Container size="narrow">
          <Heading level={1}>{area.title}</Heading>
          {area.description && (
            <p className="mt-4 text-foreground-muted">{area.description as string}</p>
          )}
          {area.content && (
            <RichText data={area.content as any} className="mt-8" />
          )}
        </Container>
      </Section>
    </main>
  )
}
