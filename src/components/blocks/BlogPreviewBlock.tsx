import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type PostPreview = { title?: string; summary?: string; url?: string }

export function BlogPreviewBlock({ block }: { block: Block }) {
  const { heading, posts } = block as Block & {
    heading?: string
    posts?: PostPreview[]
  }

  return (
    <Section>
      <Container>
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts?.map((post, i) => (
            <article key={i} className="bg-surface-muted rounded-brand p-6">
              {post.title && <Heading level={3}>{post.title}</Heading>}
              {post.summary && <p className="mt-2 text-foreground-muted">{post.summary}</p>}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
