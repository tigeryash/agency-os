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
    title: 'Blog',
    description: 'Read posts, updates, and local service advice from the starter site.',
    path: '/blog',
  })
}

export default async function BlogPage() {
  if (!isFeatureEnabled('blog')) notFound()

  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayloadClient()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: getPublishedWhere(isDraft),
    draft: isDraft,
    sort: '-publishedAt',
  })

  return (
    <main>
      <Section>
        <Container>
          <Heading level={1}>Blog</Heading>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-surface-muted rounded-brand p-6 hover:shadow-md transition-shadow"
              >
                <Heading level={3}>{post.title}</Heading>
                {post.summary && (
                  <p className="mt-2 text-foreground-muted">{post.summary as string}</p>
                )}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      {isDraft && <PreviewBanner currentPath="/blog" />}
    </main>
  )
}
