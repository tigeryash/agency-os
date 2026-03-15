import { notFound } from 'next/navigation'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { buildMetadata } from '@/lib/metadata'
import { getPayloadClient, getPublishedSlugWhere } from '@/lib/payload'
import { isFeatureEnabled } from '@/lib/tiers'
import { Container, Section, Heading, RichText } from '@/components/ui'
import type { Metadata } from 'next'

type Args = { params: Promise<{ slug: string }> }
type MetaGroup = {
  title?: string
  description?: string
  image?: string | { url?: string | null } | null
  noIndex?: boolean
  canonicalUrl?: string
}

async function getPost(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: getPublishedSlugWhere(slug),
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
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
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main>
      <Section>
        <Container size="narrow">
          <Heading level={1}>{post.title}</Heading>
          {post.content && (
            <RichText data={post.content as SerializedEditorState} className="mt-8" />
          )}
        </Container>
      </Section>
    </main>
  )
}
