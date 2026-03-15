import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { isFeatureEnabled } from '@/lib/tiers'
import { Container, Section, Heading } from '@/components/ui'
import Link from 'next/link'

export default async function BlogPage() {
  if (!isFeatureEnabled('blog')) notFound()

  const payload = await getPayloadClient()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
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
    </main>
  )
}
