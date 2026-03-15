import type { CollectionConfig } from 'payload'
import {
  HeroBlock,
  CtaBandBlock,
  ServicesGridBlock,
  ServiceDetailsBlock,
  ProcessStepsBlock,
  ReviewBlock,
  TrustIndicatorsBlock,
  FaqBlock,
  ServiceAreaCoverageBlock,
  ResultHighlightsBlock,
  TeamIntroBlock,
  ContactFormBlock,
  BlogPreviewBlock,
  EmergencyCalloutBlock,
} from '@/payload/blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        CtaBandBlock,
        ServicesGridBlock,
        ServiceDetailsBlock,
        ProcessStepsBlock,
        ReviewBlock,
        TrustIndicatorsBlock,
        FaqBlock,
        ServiceAreaCoverageBlock,
        ResultHighlightsBlock,
        TeamIntroBlock,
        ContactFormBlock,
        BlogPreviewBlock,
        EmergencyCalloutBlock,
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
