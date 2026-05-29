'use client'

import { Link, Paragraph } from '@amsterdam/design-system-react'
import { LoginForm } from '@design-system-community-roadmap/ui'
import NextLink from 'next/link'
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
          Nog geen account?{' '}
          <NextLink href="/aanmelden" legacyBehavior passHref>
            <Link>Maak een account aan</Link>
          </NextLink>
        </Paragraph>
      }
      loading={loading}
      onSubmit={handleSubmit}
      submitLabel="Inloggen"
    />
  )
}
