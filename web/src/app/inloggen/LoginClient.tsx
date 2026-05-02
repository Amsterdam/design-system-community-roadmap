'use client'

import { Link, Paragraph } from '@amsterdam/design-system-react'
import { LoginForm } from '@design-system-community-roadmap/ui'
import { useState } from 'react'

import { loginAction } from '@/app/actions/login'

export default function LoginClient() {
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (name: string, emoji: string) => {
    setLoading(true)
    setError(undefined)
    const result = await loginAction(name, emoji)
    setLoading(false)
    if (result?.error) setError(result.error)
  }

  return (
    <LoginForm
      error={error}
      footer={
        <Paragraph>
          Nog geen account? <Link href="/aanmelden">Maak een account aan</Link>
        </Paragraph>
      }
      loading={loading}
      onSubmit={handleSubmit}
      submitLabel="Inloggen"
    />
  )
}
