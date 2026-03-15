import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface RichTextProps {
  data: SerializedEditorState | null | undefined
  className?: string
}

export function RichText({ data, className = '' }: RichTextProps) {
  if (!data) return null

  return (
    <div className={`prose prose-brand max-w-none ${className}`}>
      <PayloadRichText data={data} />
    </div>
  )
}
