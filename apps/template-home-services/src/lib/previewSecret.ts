const DEV_PREVIEW_SECRET = 'dev-preview-secret'

export function getPreviewSecret(): string | null {
  if (process.env.PREVIEW_SECRET) {
    return process.env.PREVIEW_SECRET
  }

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return DEV_PREVIEW_SECRET
}
