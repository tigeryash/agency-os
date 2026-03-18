import { isFeatureEnabled, type FeatureKey } from '@/lib/tiers'
import { HeroBlock } from './HeroBlock'
import { CtaBandBlock } from './CtaBandBlock'
import { ServicesGridBlock } from './ServicesGridBlock'
import { ServiceDetailsBlock } from './ServiceDetailsBlock'
import { ProcessStepsBlock } from './ProcessStepsBlock'
import { ReviewBlock } from './ReviewBlock'
import { TrustIndicatorsBlock } from './TrustIndicatorsBlock'
import { FaqBlock } from './FaqBlock'
import { ServiceAreaCoverageBlock } from './ServiceAreaCoverageBlock'
import { ResultHighlightsBlock } from './ResultHighlightsBlock'
import { TeamIntroBlock } from './TeamIntroBlock'
import { ContactFormBlock } from './ContactFormBlock'
import { BlogPreviewBlock } from './BlogPreviewBlock'
import { EmergencyCalloutBlock } from './EmergencyCalloutBlock'

export type Block = {
  blockType: string
  id?: string
  [key: string]: unknown
}

const blockComponents: Record<string, React.ComponentType<{ block: Block }>> = {
  hero: HeroBlock,
  ctaBand: CtaBandBlock,
  servicesGrid: ServicesGridBlock,
  serviceDetails: ServiceDetailsBlock,
  processSteps: ProcessStepsBlock,
  review: ReviewBlock,
  trustIndicators: TrustIndicatorsBlock,
  faq: FaqBlock,
  serviceAreaCoverage: ServiceAreaCoverageBlock,
  resultHighlights: ResultHighlightsBlock,
  teamIntro: TeamIntroBlock,
  contactForm: ContactFormBlock,
  blogPreview: BlogPreviewBlock,
  emergencyCallout: EmergencyCalloutBlock,
}

// Blocks that require a specific feature flag to render
const gatedBlocks: Partial<Record<string, FeatureKey>> = {
  emergencyCallout: 'emergencyCallout',
  resultHighlights: 'resultHighlights',
  blogPreview: 'blogPreview',
  contactForm: 'contactForm',
  serviceAreaCoverage: 'serviceAreas',
  review: 'reviews',
}

interface BlockRendererProps {
  blocks: Block[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null

        const requiredFeature = gatedBlocks[block.blockType]
        if (requiredFeature && !isFeatureEnabled(requiredFeature)) return null

        return <Component key={block.id ?? index} block={block} />
      })}
    </>
  )
}
