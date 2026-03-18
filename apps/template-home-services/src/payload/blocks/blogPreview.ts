import type { Block } from 'payload'

export const BlogPreviewBlock: Block = {
  slug: 'blogPreview',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'count', type: 'number', defaultValue: 3 },
  ],
}
