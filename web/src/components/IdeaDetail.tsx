'use client'

import type { EditModalFeatureOption, EditModalFieldErrors, ReactionItem } from '@design-system-community-roadmap/ui'

import {
  ActionGroup,
  Badge,
  Button,
  Column,
  DescriptionList,
  Dialog,
  Grid,
  Heading,
  Paragraph,
  ProgressList,
  Row,
  Select,
  StandaloneLink,
} from '@amsterdam/design-system-react'
import { ChevronDownIcon, ChevronUpIcon, DocumentWithPencilIcon } from '@amsterdam/design-system-react-icons'
import { EditModal, Reactions } from '@design-system-community-roadmap/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { StrapiImage } from '@/utils/schemas'

import { deleteIdeaAction, updateFeatureProgressAction, updateIdeaAction } from '@/app/actions/edits'
import { deleteIdeaReactionAction, editIdeaReactionAction } from '@/app/actions/reactions'
import { formatDateRange } from '@/utils/date'
import { toProgressStepStatus } from '@/utils/status'

import AddReaction from './AddReaction'
import Breadcrumbs from './Breadcrumbs'
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
  progressStatus?: string | null
  rank?: number | null
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
  featureOptions?: EditModalFeatureOption[]
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
  featureOptions,
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
    featureDocumentId?: string
    startDate?: string
    statusIdea?: string
    title: string
  }): Promise<boolean> => {
    setEditLoading(true)
    setEditError(undefined)
    setEditFieldErrors(undefined)

    const initialFeatureDocumentId = sortedFeatures[0]?.documentId ?? ''
    const submittedFeatureDocumentId = values.featureDocumentId ?? ''
    const featureLinkChanged = currentUserIsTeam && submittedFeatureDocumentId !== initialFeatureDocumentId

    const result = await updateIdeaAction(ideaDocumentId, {
      title: values.title,
      content: values.content,
      ...(currentUserIsTeam ? { statusIdea: values.statusIdea ?? 'in_review' } : {}),
      ...(featureLinkChanged ? { featureDocumentId: submittedFeatureDocumentId || null } : {}),
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

  const handleEditReaction = async (reactionId: number, content: string) => {
    const result = await editIdeaReactionAction(ideaDocumentId, reactionId, content)
    if (result.success) router.refresh()
    return result
  }

  const sortedFeatures = [...features].sort((featureA, featureB) => (featureA.rank ?? 0) - (featureB.rank ?? 0))

  const handleFeatureStatus = async (featureDocumentId: string, progressStatus: string | null) => {
    await updateFeatureProgressAction(featureDocumentId, { progressStatus })
    router.refresh()
  }

  const handleMoveFeature = async (index: number, direction: -1 | 1) => {
    const target = sortedFeatures[index]
    const neighbor = sortedFeatures[index + direction]
    if (!neighbor) return
    await updateFeatureProgressAction(target.documentId, { rank: neighbor.rank ?? index + direction + 1 })
    await updateFeatureProgressAction(neighbor.documentId, { rank: target.rank ?? index + 1 })
    router.refresh()
  }

  return (
    <Grid gapVertical="large">
      <Grid.Cell span="all">
        <Breadcrumbs items={[{ href: '/', label: 'Ideeën' }]} />
        <Row align="between" alignVertical="center" wrap>
          <Heading level={1} size="level-2">
            {title}
          </Heading>
          <ActionGroup>
            <IdeaLikeButton
              currentUserDocumentId={currentUserDocumentId}
              ideaDocumentId={ideaDocumentId}
              isLiked={isLiked}
              voteCount={voteCount}
            />
            {canEdit && (
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
                <Column alignHorizontal="start" className={styles['idea-detail__story-content']} gap="x-small">
                  <Badge label={formatDateRange(sortedFeatures[0].startDate, sortedFeatures[0].endDate)} />
                  <Link href={`/features/${sortedFeatures[0].documentId}`} legacyBehavior passHref>
                    <StandaloneLink>Bekijk details</StandaloneLink>
                  </Link>
                </Column>
              </>
            ) : (
              <ProgressList headingLevel={3}>
                {sortedFeatures.map((feature, featureIndex) => (
                  <ProgressList.Step
                    heading={feature.title}
                    key={feature.documentId}
                    status={toProgressStepStatus(feature.progressStatus)}
                  >
                    <Column alignHorizontal="start" className={styles['idea-detail__story-content']} gap="x-small">
                      <Badge label={formatDateRange(feature.startDate, feature.endDate)} />
                      <Link href={`/features/${feature.documentId}`} legacyBehavior passHref>
                        <StandaloneLink>Bekijk details</StandaloneLink>
                      </Link>
                      {currentUserIsTeam && (
                        <Row alignVertical="center" gap="small" wrap>
                          <Select
                            aria-label="Voortgang"
                            onChange={(event) => handleFeatureStatus(feature.documentId, event.target.value || null)}
                            value={feature.progressStatus ?? ''}
                          >
                            <option value="">Gepland</option>
                            <option value="Bezig">Bezig</option>
                            <option value="Voltooid">Voltooid</option>
                          </Select>
                          <ActionGroup role="toolbar">
                            <Button
                              disabled={featureIndex === 0}
                              icon={ChevronUpIcon}
                              iconOnly
                              onClick={() => handleMoveFeature(featureIndex, -1)}
                              type="button"
                              variant="tertiary"
                            >
                              Naar boven
                            </Button>
                            <Button
                              disabled={featureIndex === sortedFeatures.length - 1}
                              icon={ChevronDownIcon}
                              iconOnly
                              onClick={() => handleMoveFeature(featureIndex, 1)}
                              type="button"
                              variant="tertiary"
                            >
                              Naar beneden
                            </Button>
                          </ActionGroup>
                        </Row>
                      )}
                    </Column>
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
            canDeleteAll={currentUserIsTeam}
            currentUserDocumentId={currentUserDocumentId}
            onDeleteReaction={handleDeleteReaction}
            onEditReaction={handleEditReaction}
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
          canDeleteAll={currentUserIsTeam}
          compact
          currentUserDocumentId={currentUserDocumentId}
          onDeleteReaction={handleDeleteReaction}
          onEditReaction={handleEditReaction}
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
          featureOptions={currentUserIsTeam ? featureOptions : undefined}
          fieldErrors={editFieldErrors}
          id={editModalId}
          initialValues={{
            title,
            content,
            featureDocumentId: sortedFeatures[0]?.documentId ?? '',
            statusIdea: status ?? 'in_review',
          }}
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
