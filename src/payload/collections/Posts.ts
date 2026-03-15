import type { CollectionConfig } from 'payload'
import { slugFields } from '@/payload/fields/slugFields'
import { seoFields } from '@/payload/fields/seoFields'
import { publicationFields } from '@/payload/fields/publicationFields'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', 'status', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugFields,
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    seoFields,
    ...publicationFields,
  ],
}
