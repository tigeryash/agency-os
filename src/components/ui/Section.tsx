import type { HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: 'default' | 'muted' | 'inverse'
  spacing?: 'default' | 'sm'
}

const bgStyles = {
  default: 'bg-surface',
  muted: 'bg-surface-muted',
  inverse: 'bg-surface-inverse text-foreground-inverse',
}

export function Section({
  background = 'default',
  spacing = 'default',
  className = '',
  children,
  ...props
}: SectionProps) {
  const py = spacing === 'sm' ? 'py-section-sm' : 'py-section'
  return (
    <section className={`${bgStyles[background]} ${py} ${className}`} {...props}>
      {children}
    </section>
  )
}
