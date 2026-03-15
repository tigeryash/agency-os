import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { isFeatureEnabled } from '@/lib/tiers'
import { Container, Section, Heading, RichText } from '@/components/ui'
import type { Metadata } from 'next'

type Args = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const meta = post.meta as { title?: string; description?: string } | undefined
  return {
    title: meta?.title ?? post.title,
    description: meta?.description ?? (post.summary as string | undefined),
  }
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
            <RichText data={post.content as any} className="mt-8" />
          )}
        </Container>
      </Section>
    </main>
  )
}
