import type { Block } from 'payload'

export const EmergencyCalloutBlock: Block = {
  slug: 'emergencyCallout',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
  ],
}
