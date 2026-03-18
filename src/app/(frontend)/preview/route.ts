import type { CollectionSlug } from 'payload'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'

export async function GET(request: Request): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(request.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const global = searchParams.get('global')
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const hasCollectionTarget = Boolean(collection && slug)
  const hasGlobalTarget = Boolean(global)

  if (!path || (!hasCollectionTarget && !hasGlobalTarget)) {
    return new Response('Missing required search params', { status: 404 })
  }

  if (!path.startsWith('/')) {
    return new Response('This endpoint can only be used for relative previews', { status: 500 })
  }

  let user

  try {
    const authResult = await payload.auth({ headers: request.headers })
    user = authResult.user
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  draft.enable()
  redirect(path)
}
