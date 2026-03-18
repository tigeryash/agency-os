import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  transpilePackages: ['@agency-os/ui', '@agency-os/shared'],
}

export default withPayload(nextConfig)
