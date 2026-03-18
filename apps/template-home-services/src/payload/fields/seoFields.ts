import type { Field } from 'payload'

/**
 * Shared SEO field group for all public-facing collections.
 * Maps to the "SEO and Metadata" field group in planning/20-shared-business-schema.md.
 *
 * Kept as a nested `meta` group for Payload admin ergonomics.
 * Planning aliases: metaTitle → meta.title, metaDescription → meta.description, etc.
 */
export const seoFields: Field = {
  name: 'meta',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', label: 'Meta Title' },
    { name: 'description', type: 'textarea', label: 'Meta Description' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'OG Image' },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      label: 'No Index',
      admin: {
        description: 'Exclude this page from search engine indexing',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL',
      admin: {
        description: 'Override the canonical URL if this content exists elsewhere',
      },
    },
    {
      name: 'structuredDataType',
      type: 'select',
      label: 'Structured Data Type',
      options: [
        { label: 'Local Business', value: 'LocalBusiness' },
        { label: 'Service', value: 'Service' },
        { label: 'Article', value: 'Article' },
        { label: 'FAQ Page', value: 'FAQPage' },
      ],
      admin: {
        description: 'Hint for JSON-LD structured data generation',
      },
    },
  ],
}
