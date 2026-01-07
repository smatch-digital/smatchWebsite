import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { AboutBlock } from './About/Component'
import { EcosystemBlock } from './Ecosystem/Component'
import { DomainsBlock } from './Domains/Component'
import { MissionVisionBlockComponent } from '@/blocks/MissionVision/Component'
import { HistoryTimelineBlockComponent } from '@/blocks/HistoryTimeline/Component'
import { TeamBlockComponent } from '@/blocks/Team/Component'
import { IntroBlockComponent } from '@/blocks/Intro/Component'
import { JournalBlockComponent } from '@/blocks/Journal/Component'
import { SmartGrid } from '@/blocks/SmartGrid/Component'
import { TrustedByBlock } from '@/blocks/TrustedBy/Component'
import { ActivityTimelineBlock } from '@/blocks/ActivityTimeline/Component'
import { ContactBlock } from '@/blocks/Contact/Component'
import { ExpertiseDomainsBlock } from '@/blocks/ExpertiseDomains/Component'

const blockComponents = {
  about: AboutBlock,
  ecosystem: EcosystemBlock,
  domains: DomainsBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  missionVision: MissionVisionBlockComponent,
  historyTimeline: HistoryTimelineBlockComponent,
  team: TeamBlockComponent,
  'smart-grid': SmartGrid,
  trustedBy: TrustedByBlock,
  activityTimeline: ActivityTimelineBlock,
  intro: IntroBlockComponent,
  journal: JournalBlockComponent,
  contact: ContactBlock,
  'expertise-domains': ExpertiseDomainsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
