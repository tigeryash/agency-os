import type { CollectionConfig } from 'payload'
import { slugFields } from '@/payload/fields/slugFields'
import { seoFields } from '@/payload/fields/seoFields'
import { publicationFields } from '@/payload/fields/publicationFields'
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
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
