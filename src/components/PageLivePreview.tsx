'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { BlockRenderer, type Block } from '@/components/blocks'

type LivePreviewPageData = {
  layout?: Block[]
  [key: string]: unknown
}

function getServerURL(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export function PageLivePreview({ page }: { page: LivePreviewPageData }) {
  const { data } = useLivePreview<LivePreviewPageData>({
    initialData: page,
    serverURL: getServerURL(),
    depth: 2,
  })

  const layout = Array.isArray(data.layout) ? data.layout : []

  return <BlockRenderer blocks={layout} />
}
