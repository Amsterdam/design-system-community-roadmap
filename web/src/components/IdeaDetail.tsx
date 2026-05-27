'use client'

import type { ReactionItem } from '@design-system-community-roadmap/ui'

import {
  Badge,
  DescriptionList,
  Grid,
  Heading,
  Paragraph,
  ProgressList,
  StandaloneLink,
} from '@amsterdam/design-system-react'
import { Reactions } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'

import type { StrapiImage } from '@/utils/schemas'

import { deleteIdeaReactionAction } from '@/app/actions/reactions'
import { formatDateRange, getProgressStatus } from '@/utils/date'

import AddReaction from './AddReaction'
import styles from './IdeaDetail.module.scss'
import IdeaLikeButton from './IdeaLikeButton'
import StrapiImageBlock from './StrapiImageBlock'

const statusLabels: Record<string, string> = {
  accepted: 'Geaccepteerd',
  in_review: 'Ter beoordeling',
  postponed: 'Uitgesteld',
}

type Feature = {
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}

export type IdeaDetailProps = {
  authorName?: string
  content: string
  createdAt?: string
  currentUserDocumentId?: string
  currentUserIsTeam?: boolean
  features: Feature[]
  ideaDocumentId: string
  images?: StrapiImage[] | null
  isLiked: boolean
  reactions: ReactionItem[]
  status?: string | null
  title: string
  voteCount: number
}

export default function IdeaDetail({
  title,
  authorName,
  content,
  createdAt,
  currentUserDocumentId,
  currentUserIsTeam = false,
  features,
  ideaDocumentId,
  images,
  isLiked,
  reactions,
  status,
  voteCount,
}: IdeaDetailProps) {
  const router = useRouter()

  const teamReaction = reactions.find((reaction) => reaction.author?.isTeam)
  const feedReactions = teamReaction ? reactions.filter((reaction) => reaction.id !== teamReaction.id) : reactions

  const handleDeleteReaction = async (reactionId: number) => {
    const result = await deleteIdeaReactionAction(ideaDocumentId, reactionId)
    if (result.success) router.refresh()
  }

  const sortedFeatures = [...features].sort((featureA, featureB) => {
    if (!featureA.startDate && !featureB.startDate) return 0
    if (!featureA.startDate) return 1
    if (!featureB.startDate) return -1
    return new Date(featureA.startDate).getTime() - new Date(featureB.startDate).getTime()
  })

  return (
    <Grid gapVertical="large">
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 7 }}>
        <div className={styles['idea-detail__header']}>
          <Heading level={1} size="level-2">
            {title}
          </Heading>
          <IdeaLikeButton
            currentUserDocumentId={currentUserDocumentId}
            ideaDocumentId={ideaDocumentId}
            isLiked={isLiked}
            size="large"
            voteCount={voteCount}
          />
        </div>
        <Paragraph>{content}</Paragraph>

        <StrapiImageBlock fallbackAlt={title} images={images} />

        {features.length > 0 && (
          <div className={styles['idea-detail__stories-container']}>
            <Heading level={2} size="level-3">
              Features
            </Heading>
            <div className={styles['idea-detail__stories']}>
              <ProgressList headingLevel={3}>
                {sortedFeatures.map((feature) => (
                  <ProgressList.Step
                    heading={feature.title}
                    key={feature.documentId}
                    status={getProgressStatus(feature.startDate, feature.endDate)}
                  >
                    <div className={styles['idea-detail__story-content']}>
                      <div className={styles['idea-detail__story-date']}>
                        <Badge label={formatDateRange(feature.startDate, feature.endDate)} />
                      </div>
                      <StandaloneLink href={`/features/${feature.documentId}`}>Bekijk details</StandaloneLink>
                    </div>
                  </ProgressList.Step>
                ))}
              </ProgressList>
            </div>
          </div>
        )}
      </Grid.Cell>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 5 }}>
        {teamReaction && (
          <Reactions
            onDeleteReaction={currentUserIsTeam ? handleDeleteReaction : undefined}
            reactions={[teamReaction]}
          />
        )}
        <Heading level={2} size="level-3">
          Details
        </Heading>
        <DescriptionList>
          <DescriptionList.Term>Status</DescriptionList.Term>
          <DescriptionList.Description>
            {status ? (statusLabels[status] ?? status) : 'Onbekend'}
          </DescriptionList.Description>
          {authorName && (
            <>
              <DescriptionList.Term>Ingediend door</DescriptionList.Term>
              <DescriptionList.Description>{authorName}</DescriptionList.Description>
            </>
          )}
          <DescriptionList.Term>Aangemaakt</DescriptionList.Term>
          <DescriptionList.Description>
            {createdAt ? new Date(createdAt).toLocaleDateString('nl-NL') : 'Onbekend'}
          </DescriptionList.Description>
        </DescriptionList>
        <Heading level={2} size="level-3">
          Reacties
        </Heading>
        <Reactions
          compact
          onDeleteReaction={currentUserIsTeam ? handleDeleteReaction : undefined}
          reactions={feedReactions}
        />
        <AddReaction currentUserDocumentId={currentUserDocumentId} ideaDocumentId={ideaDocumentId} />
      </Grid.Cell>
    </Grid>
  )
}
