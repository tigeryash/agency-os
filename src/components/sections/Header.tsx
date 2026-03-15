import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { Container, Button } from '@/components/ui'

type NavItem = {
  label: string
  url: string
  children?: { label: string; url: string }[]
}

type HeaderData = {
  navItems?: NavItem[]
  cta?: { label?: string; url?: string }
}

export async function Header() {
  const payload = await getPayloadClient()
  const header = (await payload.findGlobal({ slug: 'header' })) as HeaderData
  const navItems = header?.navItems ?? []
  const cta = header?.cta

  return (
    <header className="border-b bg-surface">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-heading font-bold text-h4">
            Agency
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <div key={i} className="relative group">
                <Link
                  href={item.url}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-10">
                    <div className="bg-surface rounded-brand shadow-lg border p-2 min-w-[180px]">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
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
                <Button size="sm">{cta.label}</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}
