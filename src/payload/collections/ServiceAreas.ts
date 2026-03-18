import type { CollectionConfig } from 'payload'
import { slugFields } from '@/payload/fields/slugFields'
import { seoFields } from '@/payload/fields/seoFields'
import { publicationFields } from '@/payload/fields/publicationFields'
import { publishedOrAuthenticated } from '@/payload/access/publishedOrAuthenticated'
import { generatePreviewUrl } from '@/lib/previewUrl'

export const ServiceAreas: CollectionConfig = {
  slug: 'service-areas',
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
    defaultColumns: ['title', 'slug', 'areaType', '_status', 'updatedAt'],
    preview: (doc) => generatePreviewUrl({ slug: doc.slug as string, collection: 'service-areas' }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for this area, e.g. "Mississauga"',
      },
    },
    ...slugFields,
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'areaType',
      type: 'select',
      options: [
        { label: 'City', value: 'city' },
        { label: 'Neighbourhood', value: 'neighbourhood' },
        { label: 'Region', value: 'region' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'parentArea',
      type: 'relationship',
      relationTo: 'service-areas',
      admin: {
        description: 'Broader area this belongs to, e.g. a neighbourhood within a city',
      },
    },
    {
      name: 'geoModifier',
      type: 'text',
      admin: {
        description: 'SEO keyword modifier, e.g. "in Mississauga" or "near Square One"',
      },
    },
    {
      name: 'location',
      type: 'group',
      admin: {
        description: 'Optional geographic coordinates for this area',
      },
      fields: [
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
        {
          name: 'radiusKm',
          type: 'number',
          admin: { description: 'Coverage radius in kilometers' },
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
    seoFields,
    ...publicationFields,
  ],
}
