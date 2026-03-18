import type { Field } from 'payload'
import { slugFromTitle } from '@/payload/hooks/slugFromTitle'

/**
 * Shared slug fields for all routable collections.
 * Maps to the "Slug and URL" field group in planning/20-shared-business-schema.md.
 *
 * slugLock prevents auto-regeneration from title changes once manually set.
 */
export const slugFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    hooks: { beforeValidate: [slugFromTitle] },
    admin: {
      position: 'sidebar',
    },
  },
  {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      position: 'sidebar',
      description: 'Lock the slug to prevent auto-regeneration from title changes',
    },
  },
]
