'use client'

import type { FormEvent } from 'react'

import {
  Alert,
  Button,
  DateInput,
  ErrorMessage,
  Field,
  FieldSet,
  Grid,
  Heading,
  InvalidFormAlert,
  Label,
  Select,
  TextArea,
  TextInput,
} from '@amsterdam/design-system-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { createStoryAction } from '@/app/actions/edits'

type FeatureOption = {
  documentId: string
  startDate?: string
  title: string
}

type FieldErrors = {
  content?: string
  endDate?: string
  startDate?: string
  title?: string
}

type Props = {
  features: FeatureOption[]
  preselectedFeatureDocumentId?: string
}

const NO_FEATURE_VALUE = ''

export default function StoryForm({ features, preselectedFeatureDocumentId }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [featureDocumentId, setFeatureDocumentId] = useState(
    preselectedFeatureDocumentId && features.some((feature) => feature.documentId === preselectedFeatureDocumentId)
      ? preselectedFeatureDocumentId
      : NO_FEATURE_VALUE,
  )
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const invalidFields = [
    ...(fieldErrors.title ? [{ id: '#story-title', label: fieldErrors.title }] : []),
    ...(fieldErrors.content ? [{ id: '#story-content', label: fieldErrors.content }] : []),
    ...(fieldErrors.startDate ? [{ id: '#story-start-date', label: fieldErrors.startDate }] : []),
    ...(fieldErrors.endDate ? [{ id: '#story-end-date', label: fieldErrors.endDate }] : []),
  ]

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(undefined)
    setFieldErrors({})

    const result = await createStoryAction({
      title,
      content,
      endDate,
      featureDocumentId: featureDocumentId || undefined,
      startDate,
    })

    setLoading(false)

    if (result.needsLogin) {
      router.push('/inloggen')
      return
    }

    if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors)
      return
    }

    if (result.error) {
      setError(result.error)
      return
    }

    if (result.success && result.documentId) {
      router.push(`/stories/${result.documentId}`)
    }
  }

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 6, wide: 6 }}>
        <Heading className="ams-mb-s" level={1} size="level-2">
          Nieuwe story
        </Heading>
        {invalidFields.length > 0 && <InvalidFormAlert className="ams-mb-m" errors={invalidFields} headingLevel={2} />}
        {error && (
          <Alert className="ams-mb-m" heading="Er is een fout opgetreden" headingLevel={2} severity="error">
            {error}
          </Alert>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <Field className="ams-mb-m" invalid={!!fieldErrors.title}>
            <Label htmlFor="story-title">Titel</Label>
            {fieldErrors.title && <ErrorMessage id="story-title-error">{fieldErrors.title}</ErrorMessage>}
            <TextInput
              aria-describedby={fieldErrors.title ? 'story-title-error' : undefined}
              id="story-title"
              maxLength={140}
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </Field>
          <Field className="ams-mb-m" invalid={!!fieldErrors.content}>
            <Label htmlFor="story-content">Samenvatting</Label>
            {fieldErrors.content && <ErrorMessage id="story-content-error">{fieldErrors.content}</ErrorMessage>}
            <TextArea
              aria-describedby={fieldErrors.content ? 'story-content-error' : undefined}
              id="story-content"
              maxLength={10000}
              onChange={(event) => setContent(event.target.value)}
              rows={8}
              value={content}
            />
          </Field>
          <Field className="ams-mb-m">
            <Label htmlFor="story-feature" optional>
              Koppel aan feature
            </Label>
            <Select
              id="story-feature"
              onChange={(event) => setFeatureDocumentId(event.target.value)}
              value={featureDocumentId}
            >
              <option value={NO_FEATURE_VALUE}>Geen feature (losse story)</option>
              {features.map((feature) => (
                <option key={feature.documentId} value={feature.documentId}>
                  {feature.title}
                </option>
              ))}
            </Select>
          </Field>
          <FieldSet className="ams-mb-m" legend="Looptijd">
            <Field invalid={!!fieldErrors.startDate}>
              <Label htmlFor="story-start-date" inFieldSet>
                Startdatum
              </Label>
              {fieldErrors.startDate && (
                <ErrorMessage id="story-start-date-error">{fieldErrors.startDate}</ErrorMessage>
              )}
              <DateInput
                aria-describedby={fieldErrors.startDate ? 'story-start-date-error' : undefined}
                id="story-start-date"
                onChange={(event) => setStartDate(event.target.value)}
                value={startDate}
              />
            </Field>
            <Field invalid={!!fieldErrors.endDate}>
              <Label htmlFor="story-end-date" inFieldSet>
                Einddatum
              </Label>
              {fieldErrors.endDate && <ErrorMessage id="story-end-date-error">{fieldErrors.endDate}</ErrorMessage>}
              <DateInput
                aria-describedby={fieldErrors.endDate ? 'story-end-date-error' : undefined}
                id="story-end-date"
                onChange={(event) => setEndDate(event.target.value)}
                value={endDate}
              />
            </Field>
          </FieldSet>
          <Button disabled={loading} type="submit" variant="primary">
            {loading ? 'Bezig…' : 'Story aanmaken'}
          </Button>
        </form>
      </Grid.Cell>
    </Grid>
  )
}
