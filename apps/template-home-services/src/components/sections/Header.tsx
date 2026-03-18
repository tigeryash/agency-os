import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { isFeatureEnabled } from '@/lib/tiers'
import { Container, Button } from '@/components/ui'

type NavItem = {
  label: string
  url: string
  children?: { label: string; url: string }[]
}

type HeaderData = {
  navItems?: NavItem[]
  cta?: {
    inheritFromSiteSettings?: boolean
    label?: string
    url?: string
    style?: 'primary' | 'secondary' | 'emergency'
  }
}

type SiteSettingsData = {
  businessName?: string
  tagline?: string
  primaryCTA?: { label?: string; url?: string; style?: 'primary' | 'secondary' | 'emergency' }
}

export async function Header() {
  const payload = await getPayloadClient()
  const [header, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'header' }) as Promise<HeaderData>,
    payload.findGlobal({ slug: 'site-settings' }) as Promise<SiteSettingsData>,
  ])
  const gatedRoutes: Record<string, Parameters<typeof isFeatureEnabled>[0]> = {
    '/blog': 'blog',
    '/service-areas': 'serviceAreas',
  }

  const navItems = (header?.navItems ?? []).filter((item) => {
    const feature = gatedRoutes[item.url]
    return !feature || isFeatureEnabled(feature)
  })
  const shouldInheritCta = header?.cta?.inheritFromSiteSettings ?? true
  const cta = shouldInheritCta ? siteSettings.primaryCTA : header?.cta
  const ctaVariant = cta?.style === 'secondary' ? 'secondary' : 'primary'
  const brandName = siteSettings.businessName ?? 'Agency'

  return (
    <header className="border-b bg-surface">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col">
            <span className="font-heading font-bold text-h4">{brandName}</span>
            {siteSettings.tagline && (
              <span className="text-small text-foreground-muted leading-tight">{siteSettings.tagline}</span>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.url} className="relative group">
                <Link
                  href={item.url}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-10">
                    <div className="bg-surface rounded-brand shadow-lg border p-2 min-w-[180px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.url}
                          href={child.url}
                          className="block px-3 py-2 rounded text-small text-foreground-muted hover:bg-surface-muted hover:text-foreground transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {cta?.label && cta?.url && (
              <Link href={cta.url}>
                <Button size="sm" variant={ctaVariant}>{cta.label}</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}
