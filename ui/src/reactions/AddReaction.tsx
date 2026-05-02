'use client'

import type { FormEvent } from 'react'

import { Button, ErrorMessage, Field, Label, Link, Paragraph, TextArea } from '@amsterdam/design-system-react'
import { useState } from 'react'

import styles from './AddReaction.module.scss'

type AddReactionProps = {
  error?: string
  isLoggedIn?: boolean
  loading?: boolean
  loginUrl?: string
  onSubmit: (content: string) => void | Promise<void>
}

const AddReaction = ({
  error: serverError,
  isLoggedIn = true,
  loading = false,
  loginUrl = '/inloggen',
  onSubmit,
}: AddReactionProps) => {
  const [content, setContent] = useState('')
  const [localError, setLocalError] = useState<string | undefined>()

  const error = serverError || localError

  if (!isLoggedIn) {
    return (
      <Paragraph>
        <Link href={loginUrl}>Log in</Link> om een reactie te plaatsen.
      </Paragraph>
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLocalError(undefined)
    await onSubmit(content.trim())
    if (!serverError) {
      setContent('')
    }
  }

  return (
    <form className={styles['add-reaction']} onSubmit={handleSubmit}>
      <Field invalid={!!error}>
        <Label htmlFor="reaction-content">Jouw reactie</Label>
        {error && <ErrorMessage id="reaction-error">{error}</ErrorMessage>}
        <TextArea
          aria-describedby={error ? 'reaction-error' : undefined}
          id="reaction-content"
          onChange={(e) => {
            setContent(e.target.value)
            if (localError) setLocalError(undefined)
          }}
          rows={4}
          value={content}
        />
      </Field>
      <Button disabled={loading || !content.trim()} type="submit" variant="primary">
        {loading ? 'Bezig…' : 'Reactie plaatsen'}
      </Button>
    </form>
  )
}

export default AddReaction
