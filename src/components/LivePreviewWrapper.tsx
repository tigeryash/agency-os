'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

interface LivePreviewWrapperProps<T extends Record<string, unknown>> {
  initialData: T
  serverURL: string
  children: (data: T) => React.ReactNode
}

export function LivePreviewWrapper<T extends Record<string, unknown>>({
  initialData,
  serverURL,
  children,
}: LivePreviewWrapperProps<T>) {
  const { data } = useLivePreview<T>({
    initialData,
    serverURL,
    depth: 2,
  })

  return <>{children(data)}</>
}
