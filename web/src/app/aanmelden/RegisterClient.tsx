'use client'

import { LoginForm } from '@design-system-community-roadmap/ui'
import { useState } from 'react'

import { registerAction } from '@/app/actions/login'

export default function RegisterClient() {
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (name: string, emoji: string) => {
    setLoading(true)
    setError(undefined)
    const result = await registerAction(name, emoji)
    setLoading(false)
    if (result?.error) setError(result.error)
  }

  return <LoginForm error={error} loading={loading} onSubmit={handleSubmit} submitLabel="Account aanmaken" />
}
