'use client'

import type { ReactionItem } from '@design-system-community-roadmap/ui'

import { Badge, Grid, Heading, Paragraph, ProgressList, StandaloneLink } from '@amsterdam/design-system-react'
import { Reactions } from '@design-system-community-roadmap/ui'

import type { StrapiImage } from '@/utils/schemas'

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
  features,
  ideaDocumentId,
  images,
  isLiked,
  reactions,
  status,
  voteCount,
}: IdeaDetailProps) {
  const teamReaction = reactions.find((r) => r.author?.isTeam)
  const feedReactions = teamReaction ? reactions.filter((r) => r.id !== teamReaction.id) : reactions

  const sortedFeatures = [...features].sort((a, b) => {
    if (!a.startDate && !b.startDate) return 0
    if (!a.startDate) return 1
    if (!b.startDate) return -1
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
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
            <Heading level={2} size="level-4">
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
        {teamReaction && <Reactions reactions={[teamReaction]} />}
        <Heading level={2} size="level-4">
          Details
        </Heading>
        <dl className={styles['idea-detail__details']}>
          <dt>
            <strong>Status</strong>
          </dt>
          <dd>{status ? (statusLabels[status] ?? status) : 'Onbekend'}</dd>
          {authorName && (
            <>
              <dt>
                <strong>Ingediend door</strong>
              </dt>
              <dd>{authorName}</dd>
            </>
          )}
          <dt>
            <strong>Aangemaakt</strong>
          </dt>
          <dd>{createdAt ? new Date(createdAt).toLocaleDateString('nl-NL') : 'Onbekend'}</dd>
        </dl>
        <Heading level={2} size="level-4">
          Reacties
        </Heading>
        <Reactions compact reactions={feedReactions} />
        <AddReaction currentUserDocumentId={currentUserDocumentId} ideaDocumentId={ideaDocumentId} />
      </Grid.Cell>
    </Grid>
  )
}
