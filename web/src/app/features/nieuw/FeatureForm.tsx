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
  TextArea,
  TextInput,
} from '@amsterdam/design-system-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { createFeatureAction } from '@/app/actions/edits'

type FieldErrors = {
  content?: string
  endDate?: string
  startDate?: string
  title?: string
}

export default function FeatureForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const invalidFields = [
    ...(fieldErrors.title ? [{ id: '#feature-title', label: fieldErrors.title }] : []),
    ...(fieldErrors.content ? [{ id: '#feature-content', label: fieldErrors.content }] : []),
    ...(fieldErrors.startDate ? [{ id: '#feature-start-date', label: fieldErrors.startDate }] : []),
    ...(fieldErrors.endDate ? [{ id: '#feature-end-date', label: fieldErrors.endDate }] : []),
  ]

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(undefined)
    setFieldErrors({})

    const result = await createFeatureAction({
      title,
      content,
      endDate: endDate || null,
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
      router.push(`/features/${result.documentId}`)
    }
  }

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 6, wide: 6 }}>
        <Heading className="ams-mb-s" level={1} size="level-2">
          Nieuwe feature
        </Heading>
        {invalidFields.length > 0 && <InvalidFormAlert className="ams-mb-m" errors={invalidFields} headingLevel={2} />}
        {error && (
          <Alert className="ams-mb-m" heading="De feature kon niet worden aangemaakt" headingLevel={2} severity="error">
            {error}
          </Alert>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <Field className="ams-mb-m" invalid={!!fieldErrors.title}>
            <Label htmlFor="feature-title">Titel</Label>
            {fieldErrors.title && <ErrorMessage id="feature-title-error">{fieldErrors.title}</ErrorMessage>}
            <TextInput
              aria-describedby={fieldErrors.title ? 'feature-title-error' : undefined}
              id="feature-title"
              maxLength={140}
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </Field>
          <Field className="ams-mb-m" invalid={!!fieldErrors.content}>
            <Label htmlFor="feature-content">Samenvatting</Label>
            {fieldErrors.content && <ErrorMessage id="feature-content-error">{fieldErrors.content}</ErrorMessage>}
            <TextArea
              aria-describedby={fieldErrors.content ? 'feature-content-error' : undefined}
              id="feature-content"
              maxLength={10000}
              onChange={(event) => setContent(event.target.value)}
              rows={8}
              value={content}
            />
          </Field>
          <FieldSet className="ams-mb-m" legend="Looptijd">
            <Field invalid={!!fieldErrors.startDate}>
              <Label htmlFor="feature-start-date" inFieldSet>
                Startdatum
              </Label>
              {fieldErrors.startDate && (
                <ErrorMessage id="feature-start-date-error">{fieldErrors.startDate}</ErrorMessage>
              )}
              <DateInput
                aria-describedby={fieldErrors.startDate ? 'feature-start-date-error' : undefined}
                id="feature-start-date"
                onChange={(event) => setStartDate(event.target.value)}
                value={startDate}
              />
            </Field>
            <Field invalid={!!fieldErrors.endDate}>
              <Label htmlFor="feature-end-date" inFieldSet optional>
                Einddatum
              </Label>
              {fieldErrors.endDate && <ErrorMessage id="feature-end-date-error">{fieldErrors.endDate}</ErrorMessage>}
              <DateInput
                aria-describedby={fieldErrors.endDate ? 'feature-end-date-error' : undefined}
                id="feature-end-date"
                onChange={(event) => setEndDate(event.target.value)}
                value={endDate}
              />
            </Field>
          </FieldSet>
          <Button disabled={loading} type="submit" variant="primary">
            {loading ? 'Bezig…' : 'Feature aanmaken'}
          </Button>
        </form>
      </Grid.Cell>
    </Grid>
  )
}
