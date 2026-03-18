'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Container, Section, Heading, RichText } from '@/components/ui'

interface ServiceAreaLivePreviewProps {
  initialData: Record<string, unknown>
  serverURL: string
}

export function ServiceAreaLivePreview({ initialData, serverURL }: ServiceAreaLivePreviewProps) {
  const { data } = useLivePreview<Record<string, unknown>>({
    initialData,
    serverURL,
    depth: 2,
  })

  return (
    <Section>
      <Container size="narrow">
        <Heading level={1}>{String(data.title)}</Heading>
        {data.description ? (
          <p className="mt-4 text-foreground-muted">{String(data.description)}</p>
        ) : null}
        {data.content ? (
          <RichText data={data.content as SerializedEditorState} className="mt-8" />
        ) : null}
      </Container>
    </Section>
  )
}
