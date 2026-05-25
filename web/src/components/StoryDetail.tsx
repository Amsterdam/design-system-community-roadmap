'use client'

import type { ReactionItem } from '@design-system-community-roadmap/ui'

import { Badge, Grid, Heading, Paragraph, StandaloneLink } from '@amsterdam/design-system-react'
import { AddReaction, LikeButton, Reactions } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { StrapiImage } from '@/utils/schemas'

import { toggleStoryLikeAction } from '@/app/actions/likes'
import { addStoryReactionAction } from '@/app/actions/reactions'

import styles from './StoryDetail.module.scss'
import StrapiImageBlock from './StrapiImageBlock'

type ChildFeature = {
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}

export type StoryDetailProps = {
  content: string
  currentUserDocumentId?: string
  endDate?: string | null
  features: ChildFeature[]
  images?: StrapiImage[] | null
  isLiked: boolean
  reactions: ReactionItem[]
  startDate?: string
  storyDocumentId: string
  title: string
  voteCount: number
}

export default function StoryDetail({
  title,
  content,
  currentUserDocumentId,
  endDate,
  features,
  images,
  isLiked,
  reactions,
  startDate,
  storyDocumentId,
  voteCount,
}: StoryDetailProps) {
  const router = useRouter()
  const [reactionLoading, setReactionLoading] = useState(false)
  const [reactionError, setReactionError] = useState<string | undefined>()

  const sortedFeatures = [...features].sort((a, b) => {
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

    const result = await toggleStoryLikeAction(storyDocumentId, liked)

    if (result.needsLogin) {
      router.push('/inloggen')
      return
    }

    router.refresh()
  }

  const handleReactionSubmit = async (content: string) => {
    setReactionLoading(true)
    setReactionError(undefined)

    const result = await addStoryReactionAction(storyDocumentId, content)
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
        <div className={styles['story-detail__header']}>
          <Heading level={1} size="level-2">
            {title}
          </Heading>
          <LikeButton count={voteCount} isLiked={isLiked} onToggle={handleLikeToggle} size="large" />
        </div>
        <Paragraph>{content}</Paragraph>

        <StrapiImageBlock fallbackAlt={title} images={images} />

        {features.length > 0 && (
          <div className={styles['story-detail__features-container']}>
            <Heading level={2} size="level-4">
              Features
            </Heading>
            <div className={styles['story-detail__features']}>
              {sortedFeatures.map((feature) => (
                <span key={feature.documentId}>
                  <div className={styles['story-detail__feature-content']}>
                    <Heading level={4}>{feature.title}</Heading>
                    <StandaloneLink href={`/features/${feature.documentId}`}>Bekijk details</StandaloneLink>
                  </div>
                </span>
              ))}
            </div>
          </div>
        )}
      </Grid.Cell>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 5 }}>
        <Heading level={2} size="level-4">
          Details
        </Heading>
        <dl className={styles['story-detail__details']}>
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
