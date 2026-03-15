import type { Block } from 'payload'

export const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
  ],
}
