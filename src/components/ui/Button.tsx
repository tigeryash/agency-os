import { forwardRef, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-brand-600 text-foreground-inverse hover:bg-brand-700',
  secondary: 'bg-surface-muted text-foreground hover:bg-brand-100',
  outline: 'border border-brand-600 text-brand-600 hover:bg-brand-50',
  ghost: 'text-foreground hover:bg-surface-muted',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-small',
  md: 'px-5 py-2.5 text-body',
  lg: 'px-7 py-3.5 text-body',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium rounded-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
