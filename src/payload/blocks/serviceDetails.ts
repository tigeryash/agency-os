import type { Block } from 'payload'

export const ServiceDetailsBlock: Block = {
  slug: 'serviceDetails',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
  ],
}
