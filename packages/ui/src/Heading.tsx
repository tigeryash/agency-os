import type { HTMLAttributes, ReactNode } from 'react'

type Level = 1 | 2 | 3 | 4

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: Level
  as?: `h${1 | 2 | 3 | 4 | 5 | 6}`
  children?: ReactNode
}

const levelStyles: Record<Level, string> = {
  1: 'text-h1 font-heading font-bold',
  2: 'text-h2 font-heading font-bold',
  3: 'text-h3 font-heading font-semibold',
  4: 'text-h4 font-heading font-semibold',
}

export function Heading({ level = 2, as, className = '', children, ...props }: HeadingProps) {
  const Tag = as ?? (`h${level}` as const)
  return (
    <Tag className={`${levelStyles[level]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
