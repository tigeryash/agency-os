import type { Block } from 'payload'

export const ServiceAreaCoverageBlock: Block = {
  slug: 'serviceAreaCoverage',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'text' },
    {
      name: 'areas',
      type: 'relationship',
      relationTo: 'service-areas',
      hasMany: true,
    },
  ],
}
