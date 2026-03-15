import type { Block } from 'payload'

export const TeamIntroBlock: Block = {
  slug: 'teamIntro',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
