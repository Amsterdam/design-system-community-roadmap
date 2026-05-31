'use client'

import type { EditModalFieldErrors, ReactionItem } from '@design-system-community-roadmap/ui'

import {
  ActionGroup,
  Badge,
  Button,
  DescriptionList,
  Dialog,
  Grid,
  Heading,
  Paragraph,
  Row,
  StandaloneLink,
} from '@amsterdam/design-system-react'
import { DocumentWithPencilIcon } from '@amsterdam/design-system-react-icons'
import { AddReaction, EditModal, LikeButton, Reactions } from '@design-system-community-roadmap/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { StrapiImage } from '@/utils/schemas'

import { deleteStoryAction, updateStoryAction } from '@/app/actions/edits'
import { toggleStoryLikeAction } from '@/app/actions/likes'
import { addStoryReactionAction, deleteStoryReactionAction, editStoryReactionAction } from '@/app/actions/reactions'
import { uploadImages } from '@/app/actions/upload'
import { getStrapiMedia } from '@/utils/media'
import { getStatusBadge } from '@/utils/status'

import Breadcrumbs from './Breadcrumbs'
import StrapiImageBlock from './StrapiImageBlock'

type ParentFeature = {
  documentId: string
  title: string
}

export type StoryDetailProps = {
  content: string
  currentUserDocumentId?: string
  currentUserIsTeam?: boolean
  endDate?: string | null
  images?: StrapiImage[] | null
  isLiked: boolean
  parentFeature?: ParentFeature | null
  reactions: ReactionItem[]
  startDate?: string
  status?: string
  storyDocumentId: string
  title: string
  voteCount: number
}

export default function StoryDetail({
  title,
  content,
  currentUserDocumentId,
  currentUserIsTeam = false,
  endDate,
  images,
  isLiked,
  parentFeature,
  reactions,
  startDate,
  status,
  storyDocumentId,
  voteCount,
}: StoryDetailProps) {
  const router = useRouter()
  const [reactionLoading, setReactionLoading] = useState(false)
  const [reactionError, setReactionError] = useState<string | undefined>()
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | undefined>()
  const [editFieldErrors, setEditFieldErrors] = useState<EditModalFieldErrors | undefined>()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | undefined>()

  const editModalId = `edit-modal-story-${storyDocumentId}`

  const handleDelete = async (): Promise<boolean> => {
    setDeleteLoading(true)
    setDeleteError(undefined)

    const result = await deleteStoryAction(storyDocumentId)

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
      router.push('/roadmap')
      return true
    }

    return false
  }

  const handleEditSubmit = async (values: {
    content: string
    endDate?: string
    keepImageIds?: number[]
    newImages?: File[]
    startDate?: string
    statusIdea?: string
    title: string
  }): Promise<boolean> => {
    setEditLoading(true)
    setEditError(undefined)
    setEditFieldErrors(undefined)

    const upload = await uploadImages(values.newImages ?? [])
    if (upload.error) {
      setEditError(upload.error)
      setEditLoading(false)
      return false
    }
    const imageIds = [...(values.keepImageIds ?? []), ...(upload.ids ?? [])]

    const result = await updateStoryAction(storyDocumentId, {
      title: values.title,
      content: values.content,
      endDate: values.endDate ?? '',
      imageIds,
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

  const handleLikeToggle = async (liked: boolean) => {
    if (!currentUserDocumentId) {
      router.push('/inloggen')
      return
    }

    const result = await toggleStoryLikeAction(storyDocumentId, liked)

    if (result.needsLogin) {
      router.push('/inloggen')
    }
  }

  const handleDeleteReaction = async (reactionId: number) => {
    setReactionLoading(true)
    setReactionError(undefined)

    const result = await deleteStoryReactionAction(storyDocumentId, reactionId)
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

  const handleEditReaction = async (reactionId: number, content: string) => {
    const result = await editStoryReactionAction(storyDocumentId, reactionId, content)
    if (result.needsLogin) router.push('/inloggen')
    if (result.success) router.refresh()
    return result
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
      <Grid.Cell span="all">
        <Breadcrumbs
          items={[
            { href: '/roadmap', label: 'Roadmap' },
            ...(parentFeature ? [{ href: `/features/${parentFeature.documentId}`, label: parentFeature.title }] : []),
          ]}
        />
        <Row align="between" alignVertical="center" wrap>
          <Heading level={1} size="level-2">
            {title}
          </Heading>
          <ActionGroup>
            <LikeButton count={voteCount} isLiked={isLiked} mode="follow" onToggle={handleLikeToggle} />
            {currentUserIsTeam && (
              <Button
                icon={DocumentWithPencilIcon}
                iconBefore
                onClick={() => Dialog.open(`#${editModalId}`)}
                type="button"
                variant="secondary"
              >
                Bewerken
              </Button>
            )}
          </ActionGroup>
        </Row>
      </Grid.Cell>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 7 }}>
        <Paragraph>{content}</Paragraph>

        <StrapiImageBlock fallbackAlt={title} images={images} />
      </Grid.Cell>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 5 }}>
        <Heading level={2} size="level-3">
          Details
        </Heading>
        <DescriptionList>
          <DescriptionList.Term>Status</DescriptionList.Term>
          <DescriptionList.Description>
            <Badge color={getStatusBadge(status).color} label={getStatusBadge(status).label} />
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
          {parentFeature && (
            <>
              <DescriptionList.Term>Onderdeel van</DescriptionList.Term>
              <DescriptionList.Description>
                <Link href={`/features/${parentFeature.documentId}`} legacyBehavior passHref>
                  <StandaloneLink>{parentFeature.title}</StandaloneLink>
                </Link>
              </DescriptionList.Description>
            </>
          )}
        </DescriptionList>
        {teamReaction && (
          <Reactions
            canDeleteAll={currentUserIsTeam}
            currentUserDocumentId={currentUserDocumentId}
            onDeleteReaction={handleDeleteReaction}
            onEditReaction={handleEditReaction}
            reactions={[teamReaction]}
          />
        )}
        <Heading level={2} size="level-3">
          Reacties
        </Heading>
        <Reactions
          canDeleteAll={currentUserIsTeam}
          compact
          currentUserDocumentId={currentUserDocumentId}
          onDeleteReaction={handleDeleteReaction}
          onEditReaction={handleEditReaction}
          reactions={feedReactions}
        />
        <AddReaction
          error={reactionError}
          isLoggedIn={!!currentUserDocumentId}
          loading={reactionLoading}
          onSubmit={handleReactionSubmit}
        />
      </Grid.Cell>
      {currentUserIsTeam && (
        <EditModal
          deleteError={deleteError}
          deleteLoading={deleteLoading}
          error={editError}
          existingImages={(images ?? []).map((image) => ({
            alternativeText: image.alternativeText,
            id: image.id ?? 0,
            url: getStrapiMedia(image.url) ?? image.url,
          }))}
          fieldErrors={editFieldErrors}
          id={editModalId}
          initialValues={{ title, content, endDate: endDate ?? '', startDate: startDate ?? '' }}
          loading={editLoading}
          onClose={() => {
            setEditError(undefined)
            setEditFieldErrors(undefined)
            setDeleteError(undefined)
          }}
          onDelete={handleDelete}
          onSubmit={handleEditSubmit}
          type="story"
        />
      )}
    </Grid>
  )
}
