import { Section, Container, Heading, RichText } from '@/components/ui'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Block } from './BlockRenderer'

export function TeamIntroBlock({ block }: { block: Block }) {
  const { heading, description } = block as Block & {
    heading?: string
    description?: SerializedEditorState
  }

  return (
    <Section>
      <Container size="narrow">
        {heading && <Heading level={2}>{heading}</Heading>}
        {description && <RichText data={description} className="mt-4 text-foreground-muted" />}
      </Container>
    </Section>
  )
}
