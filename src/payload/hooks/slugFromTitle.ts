import type { FieldHook } from 'payload'

function formatSlug(val: string): string {
  return val
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export const slugFromTitle: FieldHook = ({ data, operation, value }) => {
  if (operation === 'create' || !value) {
    const title = data?.title
    if (typeof title === 'string' && title.length > 0) {
      return formatSlug(title)
    }
  }
  if (typeof value === 'string') {
    return formatSlug(value)
  }
  return value
}
