import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { isFeatureEnabled } from '@/lib/tiers'
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

async function getServiceArea(slug: string, draft: boolean = false) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'service-areas',
    where: getPublishedSlugWhere(slug, draft),
    draft,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const area = await getServiceArea(slug, isDraft)
  if (!area) return {}

  const meta = area.meta as MetaGroup | undefined
  return buildMetadata({
    title: meta?.title ?? area.title,
    description: meta?.description ?? (area.description as string | undefined),
    image: meta?.image,
    canonicalUrl: meta?.canonicalUrl,
    noIndex: meta?.noIndex,
    path: `/service-areas/${slug}`,
  })
}

export default async function ServiceAreaPage({ params }: Args) {
  if (!isFeatureEnabled('serviceAreas')) notFound()
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const area = await getServiceArea(slug, isDraft)
  if (!area) notFound()

  const areaContent = (
    <Section>
      <Container size="narrow">
        <Heading level={1}>{area.title}</Heading>
        {area.description && (
          <p className="mt-4 text-foreground-muted">{area.description as string}</p>
        )}
        {area.content && (
          <RichText data={area.content as SerializedEditorState} className="mt-8" />
        )}
      </Container>
    </Section>
  )

  return (
    <main>
      {isDraft ? (
        <LivePreviewWrapper
          initialData={area}
          serverURL={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
        >
          {(data) => {
            const live = data as typeof area
            return (
              <Section>
                <Container size="narrow">
                  <Heading level={1}>{live.title}</Heading>
                  {live.description && (
                    <p className="mt-4 text-foreground-muted">{live.description as string}</p>
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
        areaContent
      )}
      {isDraft && <PreviewBanner currentPath={`/service-areas/${slug}`} />}
    </main>
  )
}
