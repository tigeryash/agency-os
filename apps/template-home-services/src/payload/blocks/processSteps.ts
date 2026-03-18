import type { Block } from 'payload'

export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
