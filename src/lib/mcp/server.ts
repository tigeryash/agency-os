import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { getPayload, type Payload, type Where } from 'payload'
import config from '@payload-config'

let payloadClient: Payload | null = null

async function getClient(): Promise<Payload> {
  if (!payloadClient) {
    payloadClient = await getPayload({ config })
  }
  return payloadClient
}

function buildWhere(status?: string) {
  if (!status) return undefined
  return { status: { equals: status } }
}

const globalSlugs = ['site-settings', 'header', 'footer'] as const
type ManagedGlobalSlug = typeof globalSlugs[number]

function isManagedGlobalSlug(slug: string): slug is ManagedGlobalSlug {
  return globalSlugs.includes(slug as ManagedGlobalSlug)
}

const publishableCollections = ['pages', 'services', 'service-areas', 'posts', 'reviews'] as const
type PublishableCollection = typeof publishableCollections[number]

function isPublishableCollection(collection: string): collection is PublishableCollection {
  return publishableCollections.includes(collection as PublishableCollection)
}

export function createMcpServer() {
  const server = new McpServer({
    name: 'agency-starter',
    version: '0.1.0',
  })

  // --- Resources ---

  server.resource('site-settings', 'site://settings', async (uri) => ({
    contents: [{
      uri: uri.href,
      mimeType: 'application/json',
      text: JSON.stringify(await (await getClient()).findGlobal({ slug: 'site-settings' }), null, 2),
    }],
  }))

  server.resource('header', 'site://header', async (uri) => ({
    contents: [{
      uri: uri.href,
      mimeType: 'application/json',
      text: JSON.stringify(await (await getClient()).findGlobal({ slug: 'header' }), null, 2),
    }],
  }))

  server.resource('footer', 'site://footer', async (uri) => ({
    contents: [{
      uri: uri.href,
      mimeType: 'application/json',
      text: JSON.stringify(await (await getClient()).findGlobal({ slug: 'footer' }), null, 2),
    }],
  }))

  // --- Read Tools ---

  server.tool('list-pages', 'List all pages with their slugs and titles', {
    status: z.string().optional().describe('Filter by status (draft or published)'),
  }, async ({ status }) => {
    const payload = await getClient()
    const { docs } = await payload.find({ collection: 'pages', where: buildWhere(status), limit: 100 })
    const summary = docs.map((d) => ({ id: d.id, title: d.title, slug: d.slug, status: d.status }))
    return { content: [{ type: 'text', text: JSON.stringify(summary, null, 2) }] }
  })

  server.tool('get-page', 'Get a page by slug with full layout blocks', {
    slug: z.string().describe('Page slug'),
  }, async ({ slug }) => {
    const payload = await getClient()
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
    if (!docs[0]) return { content: [{ type: 'text', text: 'Page not found' }] }
    return { content: [{ type: 'text', text: JSON.stringify(docs[0], null, 2) }] }
  })

  server.tool('list-services', 'List all services', {
    status: z.string().optional().describe('Filter by status'),
  }, async ({ status }) => {
    const payload = await getClient()
    const { docs } = await payload.find({ collection: 'services', where: buildWhere(status), limit: 100, sort: 'title' })
    const summary = docs.map((d) => ({ id: d.id, title: d.title, slug: d.slug, summary: d.summary, status: d.status }))
    return { content: [{ type: 'text', text: JSON.stringify(summary, null, 2) }] }
  })

  server.tool('get-service', 'Get a service by slug with full content', {
    slug: z.string().describe('Service slug'),
  }, async ({ slug }) => {
    const payload = await getClient()
    const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    if (!docs[0]) return { content: [{ type: 'text', text: 'Service not found' }] }
    return { content: [{ type: 'text', text: JSON.stringify(docs[0], null, 2) }] }
  })

  server.tool('list-service-areas', 'List all service areas', {
    status: z.string().optional().describe('Filter by status'),
  }, async ({ status }) => {
    const payload = await getClient()
    const { docs } = await payload.find({ collection: 'service-areas', where: buildWhere(status), limit: 100, sort: 'title' })
    const summary = docs.map((d) => ({ id: d.id, title: d.title, slug: d.slug, status: d.status }))
    return { content: [{ type: 'text', text: JSON.stringify(summary, null, 2) }] }
  })

  server.tool('list-reviews', 'List reviews, optionally filtered by featured status', {
    featured: z.boolean().optional().describe('Filter to featured reviews only'),
    limit: z.number().optional().describe('Max reviews to return (default 20)'),
  }, async ({ featured, limit }) => {
    const payload = await getClient()
    const conditions: Where[] = [{ status: { equals: 'published' } }]
    if (featured) conditions.push({ featured: { equals: true } })
    const { docs } = await payload.find({
      collection: 'reviews',
      where: { and: conditions },
      limit: limit ?? 20,
    })
    return { content: [{ type: 'text', text: JSON.stringify(docs, null, 2) }] }
  })

  server.tool('list-posts', 'List blog posts', {
    status: z.string().optional().describe('Filter by status'),
  }, async ({ status }) => {
    const payload = await getClient()
    const { docs } = await payload.find({ collection: 'posts', where: buildWhere(status), limit: 100, sort: '-publishedAt' })
    const summary = docs.map((d) => ({ id: d.id, title: d.title, slug: d.slug, summary: d.summary, status: d.status }))
    return { content: [{ type: 'text', text: JSON.stringify(summary, null, 2) }] }
  })

  server.tool('get-post', 'Get a blog post by slug with full content', {
    slug: z.string().describe('Post slug'),
  }, async ({ slug }) => {
    const payload = await getClient()
    const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    if (!docs[0]) return { content: [{ type: 'text', text: 'Post not found' }] }
    return { content: [{ type: 'text', text: JSON.stringify(docs[0], null, 2) }] }
  })

  // --- Write Tools ---

  server.tool('create-service', 'Create a new service', {
    title: z.string().describe('Service title'),
    summary: z.string().optional().describe('Short description'),
    status: z.string().optional().describe('draft or published (default: draft)'),
  }, async ({ title, summary, status }) => {
    const payload = await getClient()
    const doc = await payload.create({
      collection: 'services',
      data: { title, summary: summary ?? '', status: status ?? 'draft' },
    })
    return { content: [{ type: 'text', text: `Created service "${doc.title}" (id: ${doc.id}, slug: ${doc.slug})` }] }
  })

  server.tool('create-service-area', 'Create a new service area', {
    title: z.string().describe('Area name (e.g., "Scarborough")'),
    description: z.string().optional().describe('Short description of coverage'),
    status: z.string().optional().describe('draft or published (default: draft)'),
  }, async ({ title, description, status }) => {
    const payload = await getClient()
    const doc = await payload.create({
      collection: 'service-areas',
      data: { title, description: description ?? '', status: status ?? 'draft' },
    })
    return { content: [{ type: 'text', text: `Created service area "${doc.title}" (id: ${doc.id}, slug: ${doc.slug})` }] }
  })

  server.tool('create-post', 'Create a new blog post', {
    title: z.string().describe('Post title'),
    summary: z.string().optional().describe('Short summary'),
    status: z.string().optional().describe('draft or published (default: draft)'),
  }, async ({ title, summary, status }) => {
    const payload = await getClient()
    const doc = await payload.create({
      collection: 'posts',
      data: { title, summary: summary ?? '', status: status ?? 'draft' },
    })
    return { content: [{ type: 'text', text: `Created post "${doc.title}" (id: ${doc.id}, slug: ${doc.slug})` }] }
  })

  server.tool('update-global', 'Update a global (site-settings, header, or footer)', {
    globalSlug: z.string().describe('Global slug: site-settings, header, or footer'),
    data: z.string().describe('JSON string of fields to update'),
  }, async ({ globalSlug, data }) => {
    if (!isManagedGlobalSlug(globalSlug)) {
      return { content: [{ type: 'text', text: 'Invalid global slug' }] }
    }
    const payload = await getClient()
    const parsed = JSON.parse(data)
    await payload.updateGlobal({ slug: globalSlug, data: parsed })
    return { content: [{ type: 'text', text: `Updated global "${globalSlug}"` }] }
  })

  server.tool('publish-content', 'Publish or unpublish a document in any collection', {
    collection: z.string().describe('Collection slug (pages, services, service-areas, posts, reviews)'),
    id: z.string().describe('Document ID'),
    status: z.string().describe('published or draft'),
  }, async ({ collection, id, status }) => {
    if (!isPublishableCollection(collection)) {
      return { content: [{ type: 'text', text: `Invalid collection. Must be one of: ${publishableCollections.join(', ')}` }] }
    }
    const payload = await getClient()
    await payload.update({ collection, id, data: { status } })
    return { content: [{ type: 'text', text: `Set ${collection}/${id} to "${status}"` }] }
  })

  return server
}
