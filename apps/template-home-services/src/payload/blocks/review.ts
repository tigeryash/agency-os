import type { Block } from 'payload'

export const ReviewBlock: Block = {
  slug: 'review',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'reviews',
      type: 'relationship',
      relationTo: 'reviews',
      hasMany: true,
    },
  ],
}
