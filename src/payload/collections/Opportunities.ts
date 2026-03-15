import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '@/payload/access/isAuthenticated'

export const Opportunities: CollectionConfig = {
  slug: 'opportunities',
  admin: {
    useAsTitle: 'rationaleSummary',
    defaultColumns: [
      'leadReference',
      'qualificationStatus',
      'likelyTier',
      'responseStatus',
      'updatedAt',
    ],
    group: 'Internal',
  },
  access: {
    create: isAuthenticated,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'leadReference',
      type: 'relationship',
      relationTo: 'leads',
      required: true,
    },
    {
      name: 'qualificationStatus',
      type: 'select',
      defaultValue: 'unqualified',
      options: [
        { label: 'Unqualified', value: 'unqualified' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'On Hold', value: 'onHold' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'fitScore',
      type: 'number',
      admin: {
        description: 'Numeric quality indicator for lead fit',
      },
    },
    {
      name: 'urgencyConfidence',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'likelyTier',
      type: 'select',
      options: [
        { label: 'Launch', value: 'launch' },
        { label: 'Growth', value: 'growth' },
        { label: 'Premium', value: 'premium' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'rationaleSummary',
      type: 'textarea',
      admin: {
        description: 'Why this score and tier were assigned',
      },
    },
    {
      name: 'nextAction',
      type: 'text',
      admin: {
        description: 'Recommended follow-up step',
      },
    },
    {
      name: 'outreachAngle',
      type: 'text',
      admin: {
        description: 'Selected messaging approach',
      },
    },
    {
      name: 'responseStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Positive', value: 'positive' },
        { label: 'Negative', value: 'negative' },
        { label: 'No Response', value: 'noResponse' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'assignedTo',
      type: 'text',
      admin: {
        description: 'Who owns follow-up (human or agent role)',
      },
    },
  ],
}
