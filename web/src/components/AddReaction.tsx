'use client'

import { AddReaction as AddReactionUI } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { addIdeaReactionAction } from '@/app/actions/reactions'

type Props = {
  currentUserDocumentId?: string
  ideaDocumentId: string
}

export default function AddReaction({ currentUserDocumentId, ideaDocumentId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = async (content: string) => {
    setLoading(true)
    setError(undefined)

    const result = await addIdeaReactionAction(ideaDocumentId, content)
    setLoading(false)

    if (result.needsLogin) {
      router.push('/inloggen')
      return
    }

    if (result.error) {
      setError(result.error)
      return
    }

    if (result.success) {
      router.refresh()
    }
  }

  return <AddReactionUI error={error} isLoggedIn={!!currentUserDocumentId} loading={loading} onSubmit={handleSubmit} />
}
