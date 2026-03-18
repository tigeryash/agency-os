'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Container, Section, Heading, RichText } from '@/components/ui'

interface PostLivePreviewProps {
  initialData: Record<string, unknown>
  serverURL: string
}

export function PostLivePreview({ initialData, serverURL }: PostLivePreviewProps) {
  const { data } = useLivePreview<Record<string, unknown>>({
    initialData,
    serverURL,
    depth: 2,
  })

  return (
    <Section>
      <Container size="narrow">
        <Heading level={1}>{String(data.title)}</Heading>
        {data.content ? (
          <RichText data={data.content as SerializedEditorState} className="mt-8" />
        ) : null}
      </Container>
    </Section>
  )
}
