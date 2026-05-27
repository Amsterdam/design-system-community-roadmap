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
import { AddReaction, LikeButton, Reactions } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { StrapiImage } from '@/utils/schemas'

import { toggleFeatureLikeAction } from '@/app/actions/likes'
import { addFeatureReactionAction, deleteFeatureReactionAction } from '@/app/actions/reactions'
import { formatDateRange, getProgressStatus } from '@/utils/date'

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
  currentUserIsTeam?: boolean
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
  currentUserIsTeam = false,
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

  const teamReaction = reactions.find((reaction) => reaction.author?.isTeam)
  const feedReactions = teamReaction ? reactions.filter((reaction) => reaction.id !== teamReaction.id) : reactions

  const sortedStories = [...stories].sort((storyA, storyB) => {
    if (!storyA.startDate && !storyB.startDate) return 0
    if (!storyA.startDate) return 1
    if (!storyB.startDate) return -1
    return new Date(storyA.startDate).getTime() - new Date(storyB.startDate).getTime()
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

  const handleDeleteReaction = async (reactionId: number) => {
    const result = await deleteFeatureReactionAction(featureDocumentId, reactionId)
    if (result.success) router.refresh()
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
            <Heading level={2} size="level-3">
              Stories
            </Heading>
            <div className={styles['feature-detail__stories']}>
              <ProgressList headingLevel={3}>
                {sortedStories.map((story) => (
                  <ProgressList.Step
                    heading={story.title}
                    key={story.documentId}
                    status={getProgressStatus(story.startDate, story.endDate)}
                  >
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
        <Heading level={2} size="level-3">
          Details
        </Heading>
        <DescriptionList>
          <DescriptionList.Term>Status</DescriptionList.Term>
          <DescriptionList.Description>
            <Badge
              color={endDate && new Date(endDate) < new Date() ? 'lime' : 'azure'}
              label={endDate && new Date(endDate) < new Date() ? 'Voltooid' : 'In uitvoering'}
            />
          </DescriptionList.Description>
          <DescriptionList.Term>Startdatum</DescriptionList.Term>
          <DescriptionList.Description>
            {startDate ? new Date(startDate).toLocaleDateString('nl-NL') : 'Onbekend'}
          </DescriptionList.Description>
          {endDate && (
            <>
              <DescriptionList.Term>Einddatum</DescriptionList.Term>
              <DescriptionList.Description>{new Date(endDate).toLocaleDateString('nl-NL')}</DescriptionList.Description>
            </>
          )}
        </DescriptionList>
        {teamReaction && (
          <Reactions
            onDeleteReaction={currentUserIsTeam ? handleDeleteReaction : undefined}
            reactions={[teamReaction]}
          />
        )}
        <Heading level={2} size="level-3">
          Reacties
        </Heading>
        <Reactions
          compact
          onDeleteReaction={currentUserIsTeam ? handleDeleteReaction : undefined}
          reactions={feedReactions}
        />
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
