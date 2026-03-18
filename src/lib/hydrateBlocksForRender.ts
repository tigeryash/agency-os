import { getPayloadClient, getPublishedWhere } from '@/lib/payload'

type RenderBlock = {
  blockType: string
  id?: string
  count?: number
  [key: string]: unknown
}

type BlogPreviewPost = {
  id?: number | string
  slug?: string | null
  summary?: string | null
  title?: string | null
}

export async function hydrateBlocksForRender(
  blocks: RenderBlock[],
  draft: boolean,
): Promise<RenderBlock[]> {
  const hasBlogPreview = blocks.some((block) => block.blockType === 'blogPreview')

  if (!hasBlogPreview) {
    return blocks
  }

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: getPublishedWhere(draft),
    draft,
    sort: '-publishedAt',
    limit: 10,
  })

  const posts: BlogPreviewPost[] = docs.map((post) => ({
    id: post.id,
    slug: post.slug,
    summary: typeof post.summary === 'string' ? post.summary : null,
    title: post.title,
  }))

  return blocks.map((block) => {
    if (block.blockType !== 'blogPreview') {
      return block
    }

    return {
      ...block,
      posts,
    }
  })
}
