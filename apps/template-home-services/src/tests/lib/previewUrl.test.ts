import { describe, it, expect } from 'vitest'
import { generatePreviewUrl, generateLivePreviewUrl } from '@/lib/previewUrl'

describe('generatePreviewUrl', () => {
  it('generates correct URL for pages', () => {
    const url = generatePreviewUrl({ slug: 'about', collection: 'pages' })
    expect(url).toContain('/preview?')
    expect(url).toContain('slug=about')
    expect(url).toContain('collection=pages')
    expect(url).toContain('path=%2Fabout')
  })

  it('generates correct URL for home page', () => {
    const url = generatePreviewUrl({ slug: 'home', collection: 'pages' })
    expect(url).toContain('path=%2F')
    expect(url).not.toContain('path=%2Fhome')
  })

  it('generates correct URL for services', () => {
    const url = generatePreviewUrl({ slug: 'plumbing', collection: 'services' })
    expect(url).toContain('path=%2Fservices%2Fplumbing')
  })

  it('generates correct URL for posts', () => {
    const url = generatePreviewUrl({ slug: 'my-post', collection: 'posts' })
    expect(url).toContain('path=%2Fblog%2Fmy-post')
  })

  it('generates correct URL for service-areas', () => {
    const url = generatePreviewUrl({ slug: 'toronto', collection: 'service-areas' })
    expect(url).toContain('path=%2Fservice-areas%2Ftoronto')
  })
})

describe('generateLivePreviewUrl', () => {
  it('generates correct URL for pages', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'about' },
      collectionConfig: { slug: 'pages' },
    })
    expect(url).toContain('/preview?')
    expect(url).toContain('collection=pages')
    expect(url).toContain('slug=about')
    expect(url).toContain('path=%2Fabout%3FlivePreview%3Dtrue')
  })

  it('generates root URL for home page', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'home' },
      collectionConfig: { slug: 'pages' },
    })
    expect(url).toContain('path=%2F%3FlivePreview%3Dtrue')
  })

  it('generates correct URL for services', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'plumbing' },
      collectionConfig: { slug: 'services' },
    })
    expect(url).toContain('path=%2Fservices%2Fplumbing%3FlivePreview%3Dtrue')
  })

  it('generates correct URL for posts', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'my-post' },
      collectionConfig: { slug: 'posts' },
    })
    expect(url).toContain('path=%2Fblog%2Fmy-post%3FlivePreview%3Dtrue')
  })

  it('generates correct URL for service-areas', () => {
    const url = generateLivePreviewUrl({
      data: { slug: 'toronto' },
      collectionConfig: { slug: 'service-areas' },
    })
    expect(url).toContain('path=%2Fservice-areas%2Ftoronto%3FlivePreview%3Dtrue')
  })

  it('generates preview route for globals', () => {
    const url = generateLivePreviewUrl({
      data: {},
      globalConfig: { slug: 'site-settings' },
    })
    expect(url).toContain('global=site-settings')
    expect(url).toContain('path=%2F%3FlivePreview%3Dtrue')
  })
})
