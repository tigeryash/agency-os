import type { Block } from 'payload'

export const ResultHighlightsBlock: Block = {
  slug: 'resultHighlights',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'before', type: 'text' },
        { name: 'after', type: 'text' },
      ],
    },
  ],
}
