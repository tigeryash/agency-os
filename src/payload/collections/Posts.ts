import type { CollectionConfig } from 'payload'
import { slugFields } from '@/payload/fields/slugFields'
import { seoFields } from '@/payload/fields/seoFields'
import { publicationFields } from '@/payload/fields/publicationFields'
import { publishedOrAuthenticated } from '@/payload/access/publishedOrAuthenticated'
import { generatePreviewUrl } from '@/lib/previewUrl'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: publishedOrAuthenticated,
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: false,
      validate: false,
    },
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', '_status', 'updatedAt'],
    preview: (doc) => generatePreviewUrl({ slug: doc.slug as string, collection: 'posts' }),
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
