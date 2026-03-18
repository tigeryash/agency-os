'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { BlockRenderer } from '@/components/blocks'

interface LayoutLivePreviewProps {
  initialData: Record<string, unknown>
  serverURL: string
}

export function LayoutLivePreview({ initialData, serverURL }: LayoutLivePreviewProps) {
  const { data } = useLivePreview<Record<string, unknown>>({
    initialData,
    serverURL,
    depth: 2,
  })

  const layout = (data.layout ?? []) as Array<{
    blockType: string
    id?: string
    [key: string]: unknown
  }>

  return <BlockRenderer blocks={layout} />
}
