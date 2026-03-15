import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'text' },
  ],
}
