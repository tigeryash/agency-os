import { Section, Container, Heading } from '@/components/ui'
import type { Block } from './BlockRenderer'

type Review = { author?: string; content?: string; rating?: number }

export function ReviewBlock({ block }: { block: Block }) {
  const { heading, reviews } = block as Block & {
    heading?: string
    reviews?: Review[]
  }

  return (
    <Section background="muted">
      <Container>
        {heading && <Heading level={2} className="text-center mb-12">{heading}</Heading>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews?.map((review, i) => (
            <blockquote key={i} className="bg-surface rounded-brand p-6 shadow-sm">
              {review.rating && (
                <div className="text-brand-500 mb-2">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              )}
              {review.content && <p className="text-foreground-muted">{review.content}</p>}
              {review.author && <footer className="mt-4 font-medium">{review.author}</footer>}
            </blockquote>
          ))}
        </div>
      </Container>
    </Section>
  )
}
