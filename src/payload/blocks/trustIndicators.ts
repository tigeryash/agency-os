import type { Block } from 'payload'

export const TrustIndicatorsBlock: Block = {
  slug: 'trustIndicators',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'indicators',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
