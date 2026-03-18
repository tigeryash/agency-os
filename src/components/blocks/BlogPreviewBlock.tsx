import Link from 'next/link'
import { Section, Container, Heading } from '@/components/ui'
import { getPayloadClient, getPublishedWhere } from '@/lib/payload'
import type { Block } from './BlockRenderer'

export async function BlogPreviewBlock({ block }: { block: Block }) {
  const { heading, count } = block as Block & {
    heading?: string
    count?: number
  }

  const payload = await getPayloadClient()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: getPublishedWhere(false),
    sort: '-publishedAt',
    limit: count ?? 3,
  })

  if (posts.length === 0) return null

  return (
    <Section>
      <Container>
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block bg-surface-muted rounded-brand p-6 hover:shadow-md transition-shadow"
            >
              {post.title && <Heading level={3}>{post.title}</Heading>}
              {post.summary && <p className="mt-2 text-foreground-muted">{post.summary as string}</p>}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
