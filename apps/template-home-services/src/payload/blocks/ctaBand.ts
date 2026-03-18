import type { Block } from 'payload'

export const CtaBandBlock: Block = {
  slug: 'ctaBand',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
  ],
}
