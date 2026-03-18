import Link from 'next/link'
import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type BlogPreviewPost = {
  id?: number | string
  slug?: string | null
  summary?: string | null
  title?: string | null
}

export function BlogPreviewBlock({ block }: { block: Block }) {
  const { heading, count, posts = [] } = block as Block & {
    heading?: string
    count?: number
    posts?: BlogPreviewPost[]
  }

  const visiblePosts = posts.slice(0, count ?? 3).filter((post) => post.slug)

  if (visiblePosts.length === 0) return null

  return (
    <Section>
      <Container>
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <Link
              key={post.id ?? post.slug}
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
