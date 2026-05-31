'use client'

import type { FormEvent } from 'react'

import {
  Alert,
  Button,
  ErrorMessage,
  Field,
  FileInput,
  Grid,
  Heading,
  InvalidFormAlert,
  Label,
  TextArea,
  TextInput,
} from '@amsterdam/design-system-react'
import { useState } from 'react'

import { createIdeaAction } from '@/app/actions/ideas'

export default function ShareIdeaForm() {
  const [fieldErrors, setFieldErrors] = useState<{ content?: string; title?: string }>({})
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const invalidFields = [
    ...(fieldErrors.title ? [{ id: '#idea-title', label: fieldErrors.title }] : []),
    ...(fieldErrors.content ? [{ id: '#idea-content', label: fieldErrors.content }] : []),
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    setFieldErrors({})

    const result = await createIdeaAction(new FormData(e.currentTarget))
    setLoading(false)

    if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors)
      return
    }

    if (result.error) {
      setError(result.error)
    }
  }

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 6, wide: 6 }}>
        <Heading className="ams-mb-s" level={1} size="level-2">
          Jouw idee
        </Heading>
        {invalidFields.length > 0 && <InvalidFormAlert className="ams-mb-m" errors={invalidFields} headingLevel={2} />}
        {error && (
          <Alert className="ams-mb-m" heading="Het idee kon niet worden opgeslagen" headingLevel={2} severity="error">
            {error}
          </Alert>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <Field className="ams-mb-m" invalid={!!fieldErrors.title}>
            <Label htmlFor="idea-title">Titel</Label>
            {fieldErrors.title && <ErrorMessage id="idea-title-error">{fieldErrors.title}</ErrorMessage>}
            <TextInput
              aria-describedby={fieldErrors.title ? 'idea-title-error' : undefined}
              id="idea-title"
              maxLength={140}
              name="title"
            />
          </Field>
          <Field className="ams-mb-m" invalid={!!fieldErrors.content}>
            <Label htmlFor="idea-content">Samenvatting</Label>
            {fieldErrors.content && <ErrorMessage id="idea-content-error">{fieldErrors.content}</ErrorMessage>}
            <TextArea
              aria-describedby={fieldErrors.content ? 'idea-content-error' : undefined}
              id="idea-content"
              maxLength={10000}
              name="content"
              rows={8}
            />
          </Field>
          <Field className="ams-mb-m">
            <Label htmlFor="idea-image">Afbeelding (optioneel)</Label>
            <FileInput accept="image/*" id="idea-image" name="image" />
          </Field>
          <Button disabled={loading} type="submit" variant="primary">
            {loading ? 'Bezig…' : 'Idee delen'}
          </Button>
        </form>
      </Grid.Cell>
    </Grid>
  )
}
