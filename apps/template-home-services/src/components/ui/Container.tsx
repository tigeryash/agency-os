import type { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow'
}

export function Container({ size = 'default', className = '', children, ...props }: ContainerProps) {
  const maxWidth = size === 'narrow' ? 'max-w-content' : 'max-w-container'
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidth} ${className}`} {...props}>
      {children}
    </div>
  )
}
