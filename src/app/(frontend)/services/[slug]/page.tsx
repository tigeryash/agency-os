import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { Container, Section, Heading, RichText } from '@/components/ui'
import { LivePreviewWrapper } from '@/components/LivePreviewWrapper'
import { PreviewBanner } from '@/components/PreviewBanner'
import type { Metadata } from 'next'

type Args = { params: Promise<{ slug: string }> }
type MetaGroup = {
  title?: string
  description?: string
  image?: string | { url?: string | null } | null
  noIndex?: boolean
  canonicalUrl?: string
}

async function getService(slug: string, draft: boolean = false) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    where: getPublishedSlugWhere(slug, draft),
    draft,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const service = await getService(slug, isDraft)
  if (!service) return {}

  const meta = service.meta as MetaGroup | undefined
  return buildMetadata({
    title: meta?.title ?? service.title,
    description: meta?.description ?? (service.summary as string | undefined),
    image: meta?.image ?? service.image,
    canonicalUrl: meta?.canonicalUrl,
    noIndex: meta?.noIndex,
    path: `/services/${slug}`,
  })
}

export default async function ServicePage({ params }: Args) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const service = await getService(slug, isDraft)
  if (!service) notFound()

  const serviceContent = (
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
  )

  return (
    <main>
      {isDraft ? (
        <LivePreviewWrapper
          initialData={service}
          serverURL={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
        >
          {(data) => {
            const live = data as typeof service
            return (
              <Section>
                <Container size="narrow">
                  <Heading level={1}>{live.title}</Heading>
                  {live.summary && (
                    <p className="mt-4 text-foreground-muted text-h4">{live.summary as string}</p>
                  )}
                  {live.content && (
                    <RichText data={live.content as SerializedEditorState} className="mt-8" />
                  )}
                </Container>
              </Section>
            )
          }}
        </LivePreviewWrapper>
      ) : (
        serviceContent
      )}
      {isDraft && <PreviewBanner currentPath={`/services/${slug}`} />}
    </main>
  )
}
