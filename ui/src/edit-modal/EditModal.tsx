'use client'

import type { FormEvent } from 'react'

import {
  ActionGroup,
  Alert,
  Button,
  DateInput,
  Dialog,
  ErrorMessage,
  Field,
  FieldSet,
  Label,
  Paragraph,
  Select,
  TextArea,
  TextInput,
} from '@amsterdam/design-system-react'
import { TrashBinIcon } from '@amsterdam/design-system-react-icons'
import { useEffect, useRef, useState } from 'react'

import styles from './EditModal.module.scss'

export type EditModalFieldErrors = {
  content?: string
  endDate?: string
  startDate?: string
  statusIdea?: string
  title?: string
}

export type EditModalIdeaOption = {
  documentId: string
  title: string
}

export type EditModalFeatureOption = {
  documentId: string
  title: string
}

export type EditModalProps = {
  canEditStatus?: boolean
  deleteError?: string
  deleteLoading?: boolean
  error?: string
  featureOptions?: EditModalFeatureOption[]
  fieldErrors?: EditModalFieldErrors
  id: string
  ideaOptions?: EditModalIdeaOption[]
  initialValues: {
    content: string
    endDate?: string
    featureDocumentId?: string
    ideaDocumentId?: string
    startDate?: string
    statusIdea?: string
    title: string
  }
  loading?: boolean
  onClose?: () => void
  onDelete?: () => boolean | Promise<boolean>
  onSubmit: (values: {
    content: string
    endDate?: string
    featureDocumentId?: string
    ideaDocumentId?: string
    startDate?: string
    statusIdea?: string
    title: string
  }) => boolean | Promise<boolean>
  type: 'idea' | 'feature' | 'story'
}

const headingPerType: Record<EditModalProps['type'], string> = {
  feature: 'Feature bewerken',
  idea: 'Idee bewerken',
  story: 'Story bewerken',
}

const deleteHeadingPerType: Record<EditModalProps['type'], string> = {
  feature: 'Feature verwijderen?',
  idea: 'Idee verwijderen?',
  story: 'Story verwijderen?',
}

const deleteBodyPerType: Record<EditModalProps['type'], string> = {
  feature:
    'Deze feature wordt permanent verwijderd, samen met alle reacties en likes. Dit kan niet ongedaan gemaakt worden.',
  idea: 'Dit idee wordt permanent verwijderd, samen met alle reacties en likes. Dit kan niet ongedaan gemaakt worden.',
  story:
    'Deze story wordt permanent verwijderd, samen met alle reacties en likes. Dit kan niet ongedaan gemaakt worden.',
}

const EditModal = ({
  canEditStatus = true,
  deleteError,
  deleteLoading = false,
  error,
  featureOptions,
  fieldErrors,
  id,
  ideaOptions,
  initialValues,
  loading = false,
  onClose,
  onDelete,
  onSubmit,
  type,
}: EditModalProps) => {
  const showStatusField = type === 'idea' && canEditStatus
  const showIdeaField = type === 'feature' && ideaOptions !== undefined
  const showFeatureField = type === 'idea' && featureOptions !== undefined
  const dialogRef = useRef<HTMLDialogElement>(null)

  const [title, setTitle] = useState(initialValues.title)
  const [content, setContent] = useState(initialValues.content)
  const [statusIdea, setStatusIdea] = useState(initialValues.statusIdea ?? 'in_review')
  const [startDate, setStartDate] = useState(initialValues.startDate ?? '')
  const [endDate, setEndDate] = useState(initialValues.endDate ?? '')
  const [ideaDocumentId, setIdeaDocumentId] = useState(initialValues.ideaDocumentId ?? '')
  const [featureDocumentId, setFeatureDocumentId] = useState(initialValues.featureDocumentId ?? '')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    setTitle(initialValues.title)
    setContent(initialValues.content)
    setStatusIdea(initialValues.statusIdea ?? 'in_review')
    setStartDate(initialValues.startDate ?? '')
    setEndDate(initialValues.endDate ?? '')
    setIdeaDocumentId(initialValues.ideaDocumentId ?? '')
    setFeatureDocumentId(initialValues.featureDocumentId ?? '')
  }, [
    initialValues.title,
    initialValues.content,
    initialValues.statusIdea,
    initialValues.startDate,
    initialValues.endDate,
    initialValues.ideaDocumentId,
    initialValues.featureDocumentId,
  ])

  useEffect(() => {
    const dialogElement = dialogRef.current
    if (!dialogElement) return undefined

    const handleClose = () => {
      setShowDeleteConfirm(false)
      onClose?.()
    }
    dialogElement.addEventListener('close', handleClose)
    return () => {
      dialogElement.removeEventListener('close', handleClose)
    }
  }, [onClose])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const shouldClose = await onSubmit({
      title: title.trim(),
      content: content.trim(),
      ...(showStatusField ? { statusIdea } : {}),
      ...(showIdeaField ? { ideaDocumentId } : {}),
      ...(showFeatureField ? { featureDocumentId } : {}),
      ...(type !== 'idea' ? { endDate: endDate.trim(), startDate: startDate.trim() } : {}),
    })
    if (shouldClose) {
      dialogRef.current?.close()
    }
  }

  const handleConfirmDelete = async () => {
    if (!onDelete) return
    const shouldClose = await onDelete()
    if (shouldClose) {
      dialogRef.current?.close()
    }
  }

  const formId = `${id}-form`

  const titleError = fieldErrors?.title
  const contentError = fieldErrors?.content
  const statusIdeaError = fieldErrors?.statusIdea
  const startDateError = fieldErrors?.startDate
  const endDateError = fieldErrors?.endDate

  const titleErrorId = `${id}-title-error`
  const contentErrorId = `${id}-content-error`
  const statusIdeaErrorId = `${id}-status-error`
  const startDateErrorId = `${id}-start-date-error`
  const endDateErrorId = `${id}-end-date-error`

  const editFooter = (
    <div className={styles['edit-modal__footer']}>
      <ActionGroup>
        <Button disabled={loading || deleteLoading} form={formId} type="submit" variant="primary">
          {loading ? 'Bezig…' : 'Opslaan'}
        </Button>
        <Button onClick={(event) => Dialog.close(event)} type="button" variant="secondary">
          Annuleren
        </Button>
      </ActionGroup>
      {onDelete && (
        <Button
          disabled={loading || deleteLoading}
          icon={TrashBinIcon}
          iconBefore
          onClick={() => setShowDeleteConfirm(true)}
          type="button"
          variant="tertiary"
        >
          Verwijderen
        </Button>
      )}
    </div>
  )

  const confirmFooter = (
    <ActionGroup>
      <Button disabled={deleteLoading} onClick={handleConfirmDelete} type="button" variant="primary">
        {deleteLoading ? 'Bezig…' : 'Ja, verwijderen'}
      </Button>
      <Button disabled={deleteLoading} onClick={() => setShowDeleteConfirm(false)} type="button" variant="secondary">
        Annuleren
      </Button>
    </ActionGroup>
  )

  return (
    <Dialog
      closeButtonLabel="Sluiten"
      footer={showDeleteConfirm ? confirmFooter : editFooter}
      heading={showDeleteConfirm ? deleteHeadingPerType[type] : headingPerType[type]}
      id={id}
      ref={dialogRef}
    >
      {showDeleteConfirm ? (
        <div className={styles['edit-modal__confirm']}>
          <Paragraph>{deleteBodyPerType[type]}</Paragraph>
          {deleteError && (
            <Alert heading="Verwijderen mislukt" headingLevel={3} severity="error">
              <Paragraph>{deleteError}</Paragraph>
            </Alert>
          )}
        </div>
      ) : (
        <form className={styles['edit-modal__form']} id={formId} noValidate onSubmit={handleSubmit}>
          <Field invalid={!!titleError}>
            <Label htmlFor={`${id}-title`}>Titel</Label>
            {titleError && <ErrorMessage id={titleErrorId}>{titleError}</ErrorMessage>}
            <TextInput
              aria-describedby={titleError ? titleErrorId : undefined}
              aria-required="true"
              id={`${id}-title`}
              invalid={!!titleError}
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </Field>

          <Field invalid={!!contentError}>
            <Label htmlFor={`${id}-content`}>Inhoud</Label>
            {contentError && <ErrorMessage id={contentErrorId}>{contentError}</ErrorMessage>}
            <TextArea
              aria-describedby={contentError ? contentErrorId : undefined}
              aria-required="true"
              id={`${id}-content`}
              invalid={!!contentError}
              onChange={(event) => setContent(event.target.value)}
              rows={6}
              value={content}
            />
          </Field>

          {showIdeaField && (
            <Field>
              <Label htmlFor={`${id}-idea`} optional>
                Gekoppeld idee
              </Label>
              <Select
                id={`${id}-idea`}
                onChange={(event) => setIdeaDocumentId(event.target.value)}
                value={ideaDocumentId}
              >
                <option value="">Geen idee gekoppeld</option>
                {ideaOptions?.map((idea) => (
                  <option key={idea.documentId} value={idea.documentId}>
                    {idea.title}
                  </option>
                ))}
              </Select>
            </Field>
          )}

          {showFeatureField && (
            <Field>
              <Label htmlFor={`${id}-feature`} optional>
                Gekoppelde feature
              </Label>
              <Select
                id={`${id}-feature`}
                onChange={(event) => setFeatureDocumentId(event.target.value)}
                value={featureDocumentId}
              >
                <option value="">Geen feature gekoppeld</option>
                {featureOptions?.map((feature) => (
                  <option key={feature.documentId} value={feature.documentId}>
                    {feature.title}
                  </option>
                ))}
              </Select>
            </Field>
          )}

          {showStatusField && (
            <Field invalid={!!statusIdeaError}>
              <Label htmlFor={`${id}-status`}>Status</Label>
              {statusIdeaError && <ErrorMessage id={statusIdeaErrorId}>{statusIdeaError}</ErrorMessage>}
              <Select
                aria-describedby={statusIdeaError ? statusIdeaErrorId : undefined}
                id={`${id}-status`}
                invalid={!!statusIdeaError}
                onChange={(event) => setStatusIdea(event.target.value)}
                value={statusIdea}
              >
                <option value="in_review">Ter beoordeling</option>
                <option value="accepted">Geaccepteerd</option>
                <option value="postponed">Uitgesteld</option>
              </Select>
            </Field>
          )}

          {type !== 'idea' && (
            <FieldSet legend="Looptijd">
              <Field invalid={!!startDateError}>
                <Label htmlFor={`${id}-start-date`} inFieldSet>
                  Startdatum
                </Label>
                {startDateError && <ErrorMessage id={startDateErrorId}>{startDateError}</ErrorMessage>}
                <DateInput
                  aria-describedby={startDateError ? startDateErrorId : undefined}
                  aria-required="true"
                  id={`${id}-start-date`}
                  invalid={!!startDateError}
                  onChange={(event) => setStartDate(event.target.value)}
                  value={startDate}
                />
              </Field>

              <Field invalid={!!endDateError}>
                <Label htmlFor={`${id}-end-date`} inFieldSet optional={type === 'feature'}>
                  Einddatum
                </Label>
                {endDateError && <ErrorMessage id={endDateErrorId}>{endDateError}</ErrorMessage>}
                <DateInput
                  aria-describedby={endDateError ? endDateErrorId : undefined}
                  aria-required={type === 'story' ? 'true' : undefined}
                  id={`${id}-end-date`}
                  invalid={!!endDateError}
                  onChange={(event) => setEndDate(event.target.value)}
                  value={endDate}
                />
              </Field>
            </FieldSet>
          )}

          {error && (
            <Alert heading="Bewerken mislukt" headingLevel={3} severity="error">
              <Paragraph>{error}</Paragraph>
            </Alert>
          )}
        </form>
      )}
    </Dialog>
  )
}

export default EditModal
