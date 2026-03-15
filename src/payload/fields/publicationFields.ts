import type { Field } from 'payload'

/**
 * Shared publication status fields for all public content collections.
 * Maps to the "Publication Status" field group in planning/20-shared-business-schema.md.
 *
 * Status values: draft, published, archived.
 * Display rule: only "published" content with publishedAt in the past appears on the frontend.
 */
export const publicationFields: Field[] = [
  {
    name: 'publishedAt',
    type: 'date',
    admin: {
      position: 'sidebar',
      description: 'Date this content goes live. Leave empty to publish immediately.',
    },
  },
  {
    name: 'status',
    type: 'select',
    defaultValue: 'draft',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
      { label: 'Archived', value: 'archived' },
    ],
    admin: {
      position: 'sidebar',
    },
  },
]
