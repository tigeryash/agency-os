import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    // --- Business Identity ---
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoAlt',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (Alt / Dark)',
      admin: {
        description: 'Secondary or dark-mode logo variant',
      },
    },
    {
      name: 'phonePrimary',
      type: 'text',
      label: 'Primary Phone',
    },
    {
      name: 'phoneSecondary',
      type: 'text',
      label: 'Secondary Phone',
    },
    {
      name: 'emailPrimary',
      type: 'email',
      label: 'Primary Email',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'province', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'CA' },
      ],
    },
    {
      name: 'googleBusinessUrl',
      type: 'text',
      label: 'Google Business Profile URL',
    },
    {
      name: 'licenseNumber',
      type: 'text',
      admin: {
        description: 'Trade license number for trust display',
      },
    },
    {
      name: 'yearEstablished',
      type: 'number',
      admin: {
        description: 'Year the business was established, for trust display',
      },
    },
    // --- Contact and Primary CTA ---
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Emergency', value: 'emergency' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    {
      name: 'contactFormRecipient',
      type: 'text',
      admin: {
        description: 'Delivery target for contact form submissions (email or webhook)',
      },
    },
    {
      name: 'hoursSummary',
      type: 'text',
      admin: {
        description: 'e.g. "Mon–Fri 8am–6pm"',
      },
    },
    {
      name: 'emergencyAvailable',
      type: 'checkbox',
      defaultValue: false,
      label: 'Emergency / 24-7 Service',
      admin: {
        description: 'Enable emergency or 24/7 messaging across the site',
      },
    },
    // --- Default SEO ---
    {
      name: 'defaultMeta',
      type: 'group',
      label: 'Default SEO',
      admin: {
        description: 'Fallback metadata when pages do not provide their own',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Default Meta Title' },
        { name: 'description', type: 'textarea', label: 'Default Meta Description' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Default OG Image' },
      ],
    },
    // --- Analytics ---
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'googleAnalyticsId', type: 'text' },
      ],
    },
  ],
}
