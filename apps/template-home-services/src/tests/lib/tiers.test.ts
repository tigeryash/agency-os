import { describe, it, expect, vi, afterEach } from 'vitest'
import { isFeatureEnabled, getFeaturesForTier } from '@/lib/tiers'

describe('tiers', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('isFeatureEnabled', () => {
    it('defaults to launch tier when no env set', () => {
      vi.stubEnv('NEXT_PUBLIC_TIER', '')
      expect(isFeatureEnabled('contactForm')).toBe(true)
      expect(isFeatureEnabled('blog')).toBe(false)
      expect(isFeatureEnabled('premiumBlocks')).toBe(false)
    })

    it('enables blog on growth tier', () => {
      vi.stubEnv('NEXT_PUBLIC_TIER', 'growth')
      expect(isFeatureEnabled('blog')).toBe(true)
      expect(isFeatureEnabled('serviceAreas')).toBe(true)
      expect(isFeatureEnabled('premiumBlocks')).toBe(false)
    })

    it('enables everything on premium tier', () => {
      vi.stubEnv('NEXT_PUBLIC_TIER', 'premium')
      expect(isFeatureEnabled('blog')).toBe(true)
      expect(isFeatureEnabled('premiumBlocks')).toBe(true)
      expect(isFeatureEnabled('emergencyCallout')).toBe(true)
    })

    it('falls back to launch for invalid tier', () => {
      vi.stubEnv('NEXT_PUBLIC_TIER', 'invalid')
      expect(isFeatureEnabled('blog')).toBe(false)
      expect(isFeatureEnabled('contactForm')).toBe(true)
    })
  })

  describe('getFeaturesForTier', () => {
    it('returns correct feature count per tier', () => {
      expect(getFeaturesForTier('launch').length).toBe(2)
      expect(getFeaturesForTier('growth').length).toBe(6)
      expect(getFeaturesForTier('premium').length).toBe(9)
    })

    it('growth is a superset of launch', () => {
      const launch = new Set(getFeaturesForTier('launch'))
      const growth = getFeaturesForTier('growth')
      for (const feature of launch) {
        expect(growth).toContain(feature)
      }
    })

    it('premium is a superset of growth', () => {
      const growth = new Set(getFeaturesForTier('growth'))
      const premium = getFeaturesForTier('premium')
      for (const feature of growth) {
        expect(premium).toContain(feature)
      }
    })
  })
})
