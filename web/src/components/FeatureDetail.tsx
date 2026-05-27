'use client'

import type { EditModalFieldErrors, ReactionItem } from '@design-system-community-roadmap/ui'

import {
  ActionGroup,
  Badge,
  Dialog,
  Grid,
  Heading,
  IconButton,
  Paragraph,
  ProgressList,
  StandaloneLink,
} from '@amsterdam/design-system-react'
import { DocumentWithPencilIcon } from '@amsterdam/design-system-react-icons'
import { AddReaction, EditModal, LikeButton, Reactions } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { StrapiImage } from '@/utils/schemas'

import { updateFeatureAction } from '@/app/actions/edits'
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
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | undefined>()
  const [editFieldErrors, setEditFieldErrors] = useState<EditModalFieldErrors | undefined>()

  const editModalId = `edit-modal-feature-${featureDocumentId}`

  const handleEditSubmit = async (values: {
    content: string
    endDate?: string
    startDate?: string
    statusIdea?: string
    title: string
  }): Promise<boolean> => {
    setEditLoading(true)
    setEditError(undefined)
    setEditFieldErrors(undefined)

    const result = await updateFeatureAction(featureDocumentId, {
      title: values.title,
      content: values.content,
      endDate: values.endDate ?? null,
      startDate: values.startDate ?? '',
    })

    setEditLoading(false)

    if (result.needsLogin) {
      router.push('/inloggen')
      return false
    }

    if (result.error) {
      setEditError(result.error)
      return false
    }

    if (result.fieldErrors) {
      setEditFieldErrors(result.fieldErrors)
      return false
    }

    if (result.success) {
      router.refresh()
      return true
    }

    return false
  }

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
          <ActionGroup>
            <LikeButton count={voteCount} isLiked={isLiked} onToggle={handleLikeToggle} size="large" />
            {currentUserIsTeam && (
              <IconButton
                label="Feature bewerken"
                onClick={() => Dialog.open(`#${editModalId}`)}
                svg={DocumentWithPencilIcon}
                type="button"
              />
            )}
          </ActionGroup>
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
        {teamReaction && (
          <Reactions
            onDeleteReaction={currentUserIsTeam ? handleDeleteReaction : undefined}
            reactions={[teamReaction]}
          />
        )}
        <Heading level={2} size="level-4">
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
      <EditModal
        error={editError}
        fieldErrors={editFieldErrors}
        id={editModalId}
        initialValues={{ title, content, endDate: endDate ?? '', startDate: startDate ?? '' }}
        loading={editLoading}
        onClose={() => {
          setEditError(undefined)
          setEditFieldErrors(undefined)
        }}
        onSubmit={handleEditSubmit}
        type="feature"
      />
    </Grid>
  )
}
