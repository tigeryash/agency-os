import type { Field } from 'payload'

/**
 * Publication Status field group.
 * Maps to the "Publication Status" group in planning/20-shared-business-schema.md.
 * The `_status` field (draft/published) is managed by Payload's drafts system automatically.
 * The `archived` boolean hides content from the frontend without removing it from version history.
 */
export const publicationFields: Field[] = [
  {
    name: 'publishedAt',
    type: 'date',
    admin: {
      position: 'sidebar',
      date: {
        pickerAppearance: 'dayAndTime',
      },
      description: 'Date this content goes live. Leave empty to publish immediately.',
    },
  },
  {
    name: 'archived',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      position: 'sidebar',
      description: 'Archived content is hidden from the frontend but remains published in the version history.',
    },
  },
]
