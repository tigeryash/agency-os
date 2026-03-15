import { notFound } from 'next/navigation'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { Container, Section, Heading, RichText } from '@/components/ui'
import type { Metadata } from 'next'

type Args = { params: Promise<{ slug: string }> }

async function getService(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    where: getPublishedSlugWhere(slug),
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}

  const meta = service.meta as { title?: string; description?: string } | undefined
  return {
    title: meta?.title ?? service.title,
    description: meta?.description ?? (service.summary as string | undefined),
  }
}

export default async function ServicePage({ params }: Args) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  return (
    <main>
      <Section>
        <Container size="narrow">
          <Heading level={1}>{service.title}</Heading>
          {service.summary && (
            <p className="mt-4 text-foreground-muted text-h4">{service.summary as string}</p>
          )}
          {service.content && (
            <RichText data={service.content as SerializedEditorState} className="mt-8" />
          )}
        </Container>
      </Section>
    </main>
  )
}
