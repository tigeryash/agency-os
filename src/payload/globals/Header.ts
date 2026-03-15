import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'inheritFromSiteSettings',
          type: 'checkbox',
          defaultValue: true,
          label: 'Use Site Settings CTA',
        },
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
  ],
}
