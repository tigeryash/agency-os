import type { CollectionConfig } from 'payload'
import { slugFields } from '@/payload/fields/slugFields'
import { seoFields } from '@/payload/fields/seoFields'
import { publicationFields } from '@/payload/fields/publicationFields'
import { publishedOrAuthenticated } from '@/payload/access/publishedOrAuthenticated'
import { generatePreviewUrl } from '@/lib/previewUrl'

export const Services: CollectionConfig = {
  slug: 'services',
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
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: (doc) => generatePreviewUrl({ slug: doc.slug as string, collection: 'services' }),
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'servedAreas',
      type: 'relationship',
      relationTo: 'service-areas',
      hasMany: true,
      admin: {
        description: 'Service areas this service covers',
      },
    },
    seoFields,
    ...publicationFields,
  ],
}
