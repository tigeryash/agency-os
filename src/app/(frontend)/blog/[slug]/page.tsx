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

async function getPost(slug: string, draft: boolean = false) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: getPublishedSlugWhere(slug, draft),
    draft,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const post = await getPost(slug, isDraft)
  if (!post) return {}

  const meta = post.meta as MetaGroup | undefined
  return buildMetadata({
    title: meta?.title ?? post.title,
    description: meta?.description ?? (post.summary as string | undefined),
    image: meta?.image ?? post.featuredImage,
    canonicalUrl: meta?.canonicalUrl,
    noIndex: meta?.noIndex,
    path: `/blog/${slug}`,
  })
}

export default async function PostPage({ params }: Args) {
  if (!isFeatureEnabled('blog')) notFound()
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const post = await getPost(slug, isDraft)
  if (!post) notFound()

  return (
    <main>
      <LivePreviewWrapper
        initialData={post}
        serverURL={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
      >
        {(data) => {
          const live = data as typeof post
          return (
            <Section>
              <Container size="narrow">
                <Heading level={1}>{live.title}</Heading>
                {live.content && (
                  <RichText data={live.content as SerializedEditorState} className="mt-8" />
                )}
              </Container>
            </Section>
          )
        }}
      </LivePreviewWrapper>
      {isDraft && <PreviewBanner currentPath={`/blog/${slug}`} />}
    </main>
  )
}
