'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export function LivePreviewListener() {
  const router = useRouter()

  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={
        typeof window !== 'undefined'
          ? `${window.location.protocol}//${window.location.host}`
          : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
      }
    />
  )
}
