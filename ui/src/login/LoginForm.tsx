'use client'

import type { FormEvent, ReactNode } from 'react'

import { Button, ErrorMessage, Field, FieldSet, Label, TextInput } from '@amsterdam/design-system-react'
import { useState } from 'react'

import EmojiPicker from './EmojiPicker'
import styles from './LoginForm.module.scss'

type LoginFormProps = {
  emojis?: string[]
  error?: string
  footer?: ReactNode
  loading?: boolean
  onSubmit: (name: string, emoji: string) => void | Promise<void>
  submitLabel?: string
  takenEmojis?: string[]
}

const LoginForm = ({
  emojis,
  error,
  footer,
  loading = false,
  onSubmit,
  submitLabel = 'Versturen',
  takenEmojis = [],
}: LoginFormProps) => {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState<string | undefined>(undefined)
  const [nameError, setNameError] = useState<string | undefined>(undefined)
  const [emojiError, setEmojiError] = useState<string | undefined>(undefined)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    let valid = true
    if (!name.trim()) {
      setNameError('Vul je voornaam in')
      valid = false
    } else {
      setNameError(undefined)
    }
    if (!emoji) {
      setEmojiError('Kies een emoji')
      valid = false
    } else {
      setEmojiError(undefined)
    }
    if (!valid) return

    await onSubmit(name.trim(), emoji!)
  }

  return (
    <form aria-busy={loading} className={styles['login-form']} noValidate onSubmit={handleSubmit}>
      <Field invalid={!!nameError}>
        <Label htmlFor="login-name">Voornaam</Label>
        {nameError && <ErrorMessage id="login-name-error">{nameError}</ErrorMessage>}
        <TextInput
          aria-describedby={nameError ? 'login-name-error' : undefined}
          autoComplete="given-name"
          id="login-name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Jouw voornaam"
          value={name}
        />
      </Field>

      <FieldSet invalid={!!emojiError} legend="Kies jouw emoji">
        {emojiError && <ErrorMessage id="login-emoji-error">{emojiError}</ErrorMessage>}
        <EmojiPicker emojis={emojis} onChange={setEmoji} takenEmojis={takenEmojis} value={emoji} />
      </FieldSet>

      {error && (
        <p className={styles['login-form__server-error']} role="alert">
          {error}
        </p>
      )}

      <Button disabled={loading} type="submit" variant="primary">
        {loading ? 'Bezig…' : submitLabel}
      </Button>

      {footer}
    </form>
  )
}

export default LoginForm
