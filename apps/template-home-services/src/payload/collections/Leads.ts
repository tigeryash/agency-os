import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '@/payload/access/isAuthenticated'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'contactName',
    defaultColumns: ['contactName', 'contactEmail', 'serviceCategory', 'source', 'outreachStatus', 'createdAt'],
    group: 'Internal',
  },
  access: {
    create: () => false,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'legacyContactSubmissionId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Source record ID for one-off migration from legacy contact-submissions',
        position: 'sidebar',
      },
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'websiteUrl',
      type: 'text',
      admin: {
        description: 'Business website for outbound or manually entered leads',
      },
    },
    {
      name: 'serviceCategory',
      type: 'text',
      admin: {
        description: 'Requested or researched service category',
      },
    },
    {
      name: 'serviceArea',
      type: 'text',
    },
    {
      name: 'contactName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'contactPath',
      type: 'text',
      defaultValue: 'web_form',
      admin: {
        description: 'How we found or would contact this lead, e.g. web_form or referral',
      },
    },
    {
      name: 'inquiryMessage',
      type: 'textarea',
      admin: {
        description: 'Original inbound message captured from the contact form',
      },
    },
    {
      name: 'websiteIssueSummary',
      type: 'textarea',
    },
    {
      name: 'evidenceNotes',
      type: 'textarea',
    },
    {
      name: 'duplicateCheckStatus',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Possible Duplicate', value: 'possibleDuplicate' },
        { label: 'Confirmed Unique', value: 'confirmedUnique' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'outreachStatus',
      type: 'select',
      defaultValue: 'notContacted',
      options: [
        { label: 'Not Contacted', value: 'notContacted' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Responded', value: 'responded' },
        { label: 'No Response', value: 'noResponse' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'inbound_form',
      options: [
        { label: 'Inbound Form', value: 'inbound_form' },
        { label: 'Research Agent', value: 'research_agent' },
        { label: 'Manual Entry', value: 'manual_entry' },
        { label: 'Referral', value: 'referral' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}