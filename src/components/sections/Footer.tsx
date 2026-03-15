import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { Container } from '@/components/ui'

type NavGroup = {
  title?: string
  items?: { label: string; url: string }[]
}

type FooterData = {
  navGroups?: NavGroup[]
  contactInfo?: { phone?: string; email?: string }
  trustLinks?: { label: string; url: string }[]
  copyright?: string
}

export async function Footer() {
  const payload = await getPayloadClient()
  const footer = (await payload.findGlobal({ slug: 'footer' })) as FooterData
  const navGroups = footer?.navGroups ?? []
  const contactInfo = footer?.contactInfo
  const trustLinks = footer?.trustLinks ?? []
  const copyright = footer?.copyright

  return (
    <footer className="bg-surface-inverse text-foreground-inverse py-section-sm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {navGroups.map((group, i) => (
            <div key={i}>
              {group.title && (
                <h3 className="font-heading font-semibold mb-3">{group.title}</h3>
              )}
              {group.items && (
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={item.url}
                        className="text-foreground-inverse/70 hover:text-foreground-inverse transition-colors text-small"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div>
            {contactInfo?.phone && (
              <p className="text-small">
                <span className="text-foreground-inverse/70">Phone: </span>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-brand-300">
                  {contactInfo.phone}
                </a>
              </p>
            )}
            {contactInfo?.email && (
              <p className="text-small mt-1">
                <span className="text-foreground-inverse/70">Email: </span>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-brand-300">
                  {contactInfo.email}
                </a>
              </p>
            )}
          </div>
        </div>

        {(trustLinks.length > 0 || copyright) && (
          <div className="mt-8 pt-6 border-t border-foreground-inverse/10 flex flex-col md:flex-row items-center justify-between gap-4 text-small text-foreground-inverse/50">
            {copyright && <p>{copyright}</p>}
            {trustLinks.length > 0 && (
              <div className="flex gap-4">
                {trustLinks.map((link, i) => (
                  <Link key={i} href={link.url} className="hover:text-foreground-inverse transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </footer>
  )
}
