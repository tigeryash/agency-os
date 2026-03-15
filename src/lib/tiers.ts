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

function isTier(tier: string): tier is Tier {
  return Object.prototype.hasOwnProperty.call(tierFeatures, tier)
}

export function resolveTier(tier: string | undefined): Tier {
  if (tier && isTier(tier)) return tier
  return 'launch'
}

function getCurrentTier(): Tier {
  return resolveTier(process.env.NEXT_PUBLIC_TIER)
}

export function isFeatureEnabledForTier(tier: Tier, feature: FeatureKey): boolean {
  return tierFeatures[tier].has(feature)
}

export function isFeatureEnabled(feature: FeatureKey): boolean {
  return isFeatureEnabledForTier(getCurrentTier(), feature)
}

export function getCurrentTierName(): Tier {
  return getCurrentTier()
}

export function getFeaturesForTier(tier: Tier): FeatureKey[] {
  return [...tierFeatures[tier]]
}
