import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
          inverse: 'var(--color-surface-inverse)',
        },
        foreground: {
          DEFAULT: 'var(--color-foreground)',
          muted: 'var(--color-foreground-muted)',
          inverse: 'var(--color-foreground-inverse)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-heading)'],
      },
      fontSize: {
        display: ['var(--text-display)', { lineHeight: '1.1' }],
        h1: ['var(--text-h1)', { lineHeight: '1.2' }],
        h2: ['var(--text-h2)', { lineHeight: '1.25' }],
        h3: ['var(--text-h3)', { lineHeight: '1.3' }],
        h4: ['var(--text-h4)', { lineHeight: '1.35' }],
        body: ['var(--text-body)', { lineHeight: '1.6' }],
        small: ['var(--text-small)', { lineHeight: '1.5' }],
      },
      spacing: {
        section: 'var(--spacing-section)',
        'section-sm': 'var(--spacing-section-sm)',
      },
      maxWidth: {
        container: 'var(--container-max)',
        content: 'var(--content-max)',
      },
      borderRadius: {
        brand: 'var(--radius)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
