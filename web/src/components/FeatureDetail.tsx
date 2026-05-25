'use client'

import type { ReactionItem } from '@design-system-community-roadmap/ui'

import { Badge, Grid, Heading, Paragraph, ProgressList, StandaloneLink } from '@amsterdam/design-system-react'
import { AddReaction, LikeButton, Reactions } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { StrapiImage } from '@/utils/schemas'

import { toggleFeatureLikeAction } from '@/app/actions/likes'
import { addFeatureReactionAction } from '@/app/actions/reactions'
import { formatDateRange } from '@/utils/date'

import styles from './FeatureDetail.module.scss'
import StrapiImageBlock from './StrapiImageBlock'

type ConnectedStory = {
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}

export type FeatureDetailProps = {
  content: string
  currentUserDocumentId?: string
  endDate?: string | null
  featureDocumentId: string
  images?: StrapiImage[] | null
  isLiked: boolean
  reactions: ReactionItem[]
  startDate?: string
  stories: ConnectedStory[]
  title: string
  voteCount: number
}

export default function FeatureDetail({
  title,
  content,
  currentUserDocumentId,
  endDate,
  featureDocumentId,
  images,
  isLiked,
  reactions,
  startDate,
  stories,
  voteCount,
}: FeatureDetailProps) {
  const router = useRouter()
  const [reactionLoading, setReactionLoading] = useState(false)
  const [reactionError, setReactionError] = useState<string | undefined>()

  const sortedStories = [...stories].sort((a, b) => {
    if (!a.startDate && !b.startDate) return 0
    if (!a.startDate) return 1
    if (!b.startDate) return -1
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })

  const handleLikeToggle = async (liked: boolean) => {
    if (!currentUserDocumentId) {
      router.push('/inloggen')
      return
    }

    const result = await toggleFeatureLikeAction(featureDocumentId, liked)

    if (result.needsLogin) {
      router.push('/inloggen')
      return
    }

    router.refresh()
  }

  const handleReactionSubmit = async (content: string) => {
    setReactionLoading(true)
    setReactionError(undefined)

    const result = await addFeatureReactionAction(featureDocumentId, content)
    setReactionLoading(false)

    if (result.needsLogin) {
      router.push('/inloggen')
      return
    }

    if (result.error) {
      setReactionError(result.error)
      return
    }

    if (result.success) {
      router.refresh()
    }
  }

  return (
    <Grid gapVertical="large">
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 7 }}>
        <div className={styles['feature-detail__header']}>
          <Heading level={1} size="level-2">
            {title}
          </Heading>
          <LikeButton count={voteCount} isLiked={isLiked} onToggle={handleLikeToggle} size="large" />
        </div>
        <Paragraph>{content}</Paragraph>

        <StrapiImageBlock fallbackAlt={title} images={images} />

        {stories.length > 0 && (
          <div className={styles['feature-detail__stories-container']}>
            <Heading level={2} size="level-4">
              Stories
            </Heading>
            <div className={styles['feature-detail__stories']}>
              <ProgressList headingLevel={3}>
                {sortedStories.map((story) => (
                  <ProgressList.Step heading={story.title} key={story.documentId}>
                    <div className={styles['feature-detail__story-content']}>
                      <div className={styles['feature-detail__story-date']}>
                        <Badge label={formatDateRange(story.startDate, story.endDate)} />
                      </div>
                      <StandaloneLink href={`/stories/${story.documentId}`}>Bekijk details</StandaloneLink>
                    </div>
                  </ProgressList.Step>
                ))}
              </ProgressList>
            </div>
          </div>
        )}
      </Grid.Cell>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 5 }}>
        <Heading level={2} size="level-4">
          Details
        </Heading>
        <dl className={styles['feature-detail__details']}>
          <dt>
            <strong>Status</strong>
          </dt>
          <dd>
            <Badge
              color={endDate && new Date(endDate) < new Date() ? 'lime' : 'azure'}
              label={endDate && new Date(endDate) < new Date() ? 'Voltooid' : 'In uitvoering'}
            />
          </dd>
          <dt>
            <strong>Startdatum</strong>
          </dt>
          <dd>{startDate ? new Date(startDate).toLocaleDateString('nl-NL') : 'Onbekend'}</dd>
          {endDate && (
            <>
              <dt>
                <strong>Einddatum</strong>
              </dt>
              <dd>{new Date(endDate).toLocaleDateString('nl-NL')}</dd>
            </>
          )}
        </dl>
        <Heading level={2} size="level-4">
          Reacties
        </Heading>
        <Reactions compact reactions={reactions} />
        <AddReaction
          error={reactionError}
          isLoggedIn={!!currentUserDocumentId}
          loading={reactionLoading}
          onSubmit={handleReactionSubmit}
        />
      </Grid.Cell>
    </Grid>
  )
}
