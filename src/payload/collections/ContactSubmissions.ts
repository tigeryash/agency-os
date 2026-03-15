import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '@/payload/access/isAuthenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    hidden: true,
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'source', 'createdAt'],
    group: 'Internal',
  },
  access: {
    create: () => false,
    read: isAuthenticated,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'service',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}