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
import { useEffect, useRef, useState } from 'react'

import styles from './EditModal.module.scss'

export type EditModalFieldErrors = {
  content?: string
  endDate?: string
  startDate?: string
  statusIdea?: string
  title?: string
}

export type EditModalProps = {
  error?: string
  fieldErrors?: EditModalFieldErrors
  id: string
  initialValues: {
    content: string
    endDate?: string
    startDate?: string
    statusIdea?: string
    title: string
  }
  loading?: boolean
  onClose?: () => void
  onSubmit: (values: {
    content: string
    endDate?: string
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

const EditModal = ({
  error,
  fieldErrors,
  id,
  initialValues,
  loading = false,
  onClose,
  onSubmit,
  type,
}: EditModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const [title, setTitle] = useState(initialValues.title)
  const [content, setContent] = useState(initialValues.content)
  const [statusIdea, setStatusIdea] = useState(initialValues.statusIdea ?? 'in_review')
  const [startDate, setStartDate] = useState(initialValues.startDate ?? '')
  const [endDate, setEndDate] = useState(initialValues.endDate ?? '')

  useEffect(() => {
    setTitle(initialValues.title)
    setContent(initialValues.content)
    setStatusIdea(initialValues.statusIdea ?? 'in_review')
    setStartDate(initialValues.startDate ?? '')
    setEndDate(initialValues.endDate ?? '')
  }, [
    initialValues.title,
    initialValues.content,
    initialValues.statusIdea,
    initialValues.startDate,
    initialValues.endDate,
  ])

  useEffect(() => {
    const dialogElement = dialogRef.current
    if (!dialogElement || !onClose) return undefined

    const handleClose = () => onClose()
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
      ...(type === 'idea' ? { statusIdea } : {}),
      ...(type !== 'idea' ? { endDate: endDate.trim(), startDate: startDate.trim() } : {}),
    })
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

  const footer = (
    <ActionGroup>
      <Button disabled={loading} form={formId} type="submit" variant="primary">
        {loading ? 'Bezig…' : 'Opslaan'}
      </Button>
      <Button onClick={(event) => Dialog.close(event)} type="button" variant="secondary">
        Annuleren
      </Button>
    </ActionGroup>
  )

  return (
    <Dialog closeButtonLabel="Sluiten" footer={footer} heading={headingPerType[type]} id={id} ref={dialogRef}>
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

        {type === 'idea' && (
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
    </Dialog>
  )
}

export default EditModal
