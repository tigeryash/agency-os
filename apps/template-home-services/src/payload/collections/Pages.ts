import type { CollectionConfig } from 'payload'
import { slugFields } from '@/payload/fields/slugFields'
import { seoFields } from '@/payload/fields/seoFields'
import { publicationFields } from '@/payload/fields/publicationFields'
import { publishedOrAuthenticated } from '@/payload/access/publishedOrAuthenticated'
import { generatePreviewUrl } from '@/lib/previewUrl'
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
    preview: (doc) => generatePreviewUrl({ slug: doc.slug as string, collection: 'pages' }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugFields,
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
    seoFields,
    ...publicationFields,
  ],
}
