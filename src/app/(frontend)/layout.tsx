import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Agency Starter',
  description: 'Home services website starter',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraft } = await draftMode()

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {isDraft && <LivePreviewListener />}
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
