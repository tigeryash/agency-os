export type Tier = 'launch' | 'growth' | 'premium'

export type FeatureKey =
  | 'blog'
  | 'serviceAreas'
  | 'reviews'
  | 'premiumBlocks'
  | 'contactForm'
  | 'emergencyCallout'
  | 'resultHighlights'
  | 'blogPreview'
  | 'analytics'

const tierFeatures: Record<Tier, Set<FeatureKey>> = {
  launch: new Set([
    'contactForm',
    'reviews',
  ]),
  growth: new Set([
    'contactForm',
    'reviews',
    'blog',
    'serviceAreas',
    'blogPreview',
    'analytics',
  ]),
  premium: new Set([
    'contactForm',
    'reviews',
    'blog',
    'serviceAreas',
    'blogPreview',
    'analytics',
    'premiumBlocks',
    'emergencyCallout',
    'resultHighlights',
  ]),
}

function getCurrentTier(): Tier {
  const tier = process.env.NEXT_PUBLIC_TIER as Tier | undefined
  if (tier && tier in tierFeatures) return tier
  return 'launch'
}

export function isFeatureEnabled(feature: FeatureKey): boolean {
  return tierFeatures[getCurrentTier()].has(feature)
}

export function getCurrentTierName(): Tier {
  return getCurrentTier()
}

export function getFeaturesForTier(tier: Tier): FeatureKey[] {
  return [...tierFeatures[tier]]
}
