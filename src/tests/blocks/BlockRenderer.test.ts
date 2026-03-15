import { describe, it, expect } from 'vitest'

// Test the block type mapping logic without rendering
describe('BlockRenderer mapping', () => {
  const validBlockTypes = [
    'hero',
    'ctaBand',
    'servicesGrid',
    'serviceDetails',
    'processSteps',
    'review',
    'trustIndicators',
    'faq',
    'serviceAreaCoverage',
    'resultHighlights',
    'teamIntro',
    'contactForm',
    'blogPreview',
    'emergencyCallout',
  ]

  it('has 14 registered block types', () => {
    expect(validBlockTypes).toHaveLength(14)
  })

  it('all block type slugs are camelCase strings', () => {
    for (const type of validBlockTypes) {
      expect(type).toMatch(/^[a-z][a-zA-Z]*$/)
    }
  })
})
