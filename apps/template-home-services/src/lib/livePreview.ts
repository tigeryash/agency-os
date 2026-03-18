export const LIVE_PREVIEW_PARAM = 'livePreview'

type SearchParamValue = string | string[] | undefined

export function appendLivePreviewParam(path: string): string {
  const url = new URL(path, 'http://preview.local')
  url.searchParams.set(LIVE_PREVIEW_PARAM, 'true')

  return `${url.pathname}${url.search}`
}

export function isLivePreviewEnabled(
  searchParams?: Record<string, SearchParamValue>,
): boolean {
  const value = searchParams?.[LIVE_PREVIEW_PARAM]

  if (Array.isArray(value)) {
    return value.includes('true')
  }

  return value === 'true'
}
