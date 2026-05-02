'use client'

import type { ReactionItem } from '@design-system-community-roadmap/ui'

import { Grid, Heading, Paragraph, StandaloneLink } from '@amsterdam/design-system-react'
import { AddReaction, LikeButton, Reactions } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { toggleFeatureLikeAction } from '@/app/actions/likes'
import { addFeatureReactionAction } from '@/app/actions/reactions'

import styles from './StoryDetail.module.scss'

type ParentFeature = {
  documentId: string
  title: string
}

export type StoryDetailProps = {
  content: string
  currentUserDocumentId?: string
  endDate?: string | null
  featureDocumentId: string
  isLiked: boolean
  parentFeature?: ParentFeature | null
  reactions: ReactionItem[]
  startDate?: string
  title: string
  voteCount: number
}

export default function StoryDetail({
  title,
  content,
  currentUserDocumentId,
  endDate,
  featureDocumentId,
  isLiked,
  parentFeature,
  reactions,
  startDate,
  voteCount,
}: StoryDetailProps) {
  const router = useRouter()
  const [reactionLoading, setReactionLoading] = useState(false)
  const [reactionError, setReactionError] = useState<string | undefined>()

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
        <div className={styles['story-detail__header']}>
          <Heading level={1} size="level-2">
            {title}
          </Heading>
          <LikeButton count={voteCount} isLiked={isLiked} onToggle={handleLikeToggle} size="large" />
        </div>
        <Paragraph>{content}</Paragraph>
      </Grid.Cell>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 5 }}>
        {parentFeature && (
          <>
            <Heading level={2} size="level-4">
              Feature
            </Heading>
            <StandaloneLink href={`/features/${parentFeature.documentId}`}>{parentFeature.title}</StandaloneLink>
          </>
        )}
        <Heading level={2} size="level-4">
          Details
        </Heading>
        <dl className={styles['story-detail__details']}>
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
