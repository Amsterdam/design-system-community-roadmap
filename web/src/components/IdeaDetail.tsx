'use client'

import type { EditModalFieldErrors, ReactionItem } from '@design-system-community-roadmap/ui'

import {
  ActionGroup,
  Badge,
  DescriptionList,
  Dialog,
  Grid,
  Heading,
  IconButton,
  Paragraph,
  ProgressList,
  StandaloneLink,
} from '@amsterdam/design-system-react'
import { DocumentWithPencilIcon } from '@amsterdam/design-system-react-icons'
import { EditModal, Reactions } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { StrapiImage } from '@/utils/schemas'

import { deleteIdeaAction, updateIdeaAction } from '@/app/actions/edits'
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
  authorDocumentId?: string
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
  authorDocumentId,
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
  const isAuthor = !!authorDocumentId && !!currentUserDocumentId && authorDocumentId === currentUserDocumentId
  const canEdit = currentUserIsTeam || isAuthor
  const router = useRouter()
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | undefined>()
  const [editFieldErrors, setEditFieldErrors] = useState<EditModalFieldErrors | undefined>()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | undefined>()

  const editModalId = `edit-modal-idea-${ideaDocumentId}`

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

    const result = await updateIdeaAction(ideaDocumentId, {
      title: values.title,
      content: values.content,
      ...(currentUserIsTeam ? { statusIdea: values.statusIdea ?? 'in_review' } : {}),
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

  const handleDelete = async (): Promise<boolean> => {
    setDeleteLoading(true)
    setDeleteError(undefined)

    const result = await deleteIdeaAction(ideaDocumentId)

    setDeleteLoading(false)

    if (result.needsLogin) {
      router.push('/inloggen')
      return false
    }

    if (result.error) {
      setDeleteError(result.error)
      return false
    }

    if (result.success) {
      router.push('/')
      return true
    }

    return false
  }

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
        <div className={styles['idea-detail__title-row']}>
          <Heading level={1} size="level-2">
            {title}
          </Heading>
          <ActionGroup>
            <IdeaLikeButton
              currentUserDocumentId={currentUserDocumentId}
              ideaDocumentId={ideaDocumentId}
              isLiked={isLiked}
              size="large"
              voteCount={voteCount}
            />
            {canEdit && (
              <IconButton
                label="Idee bewerken"
                onClick={() => Dialog.open(`#${editModalId}`)}
                svg={DocumentWithPencilIcon}
                type="button"
              />
            )}
          </ActionGroup>
        </div>
        <Paragraph>{content}</Paragraph>

        <StrapiImageBlock fallbackAlt={title} images={images} />

        {features.length > 0 && (
          <>
            <Heading level={2} size="level-3">
              Features
            </Heading>
            {sortedFeatures.length === 1 ? (
              <>
                <Heading level={3} size="level-4">
                  {sortedFeatures[0].title}
                </Heading>
                <div className={styles['idea-detail__story-content']}>
                  <Badge label={formatDateRange(sortedFeatures[0].startDate, sortedFeatures[0].endDate)} />
                  <StandaloneLink href={`/features/${sortedFeatures[0].documentId}`}>Bekijk details</StandaloneLink>
                </div>
              </>
            ) : (
              <ProgressList headingLevel={3}>
                {sortedFeatures.map((feature) => (
                  <ProgressList.Step
                    heading={feature.title}
                    key={feature.documentId}
                    status={getProgressStatus(feature.startDate, feature.endDate)}
                  >
                    <div className={styles['idea-detail__story-content']}>
                      <Badge label={formatDateRange(feature.startDate, feature.endDate)} />
                      <StandaloneLink href={`/features/${feature.documentId}`}>Bekijk details</StandaloneLink>
                    </div>
                  </ProgressList.Step>
                ))}
              </ProgressList>
            )}
          </>
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
      {canEdit && (
        <EditModal
          canEditStatus={currentUserIsTeam}
          deleteError={deleteError}
          deleteLoading={deleteLoading}
          error={editError}
          fieldErrors={editFieldErrors}
          id={editModalId}
          initialValues={{ title, content, statusIdea: status ?? 'in_review' }}
          loading={editLoading}
          onClose={() => {
            setEditError(undefined)
            setEditFieldErrors(undefined)
            setDeleteError(undefined)
          }}
          onDelete={handleDelete}
          onSubmit={handleEditSubmit}
          type="idea"
        />
      )}
    </Grid>
  )
}
