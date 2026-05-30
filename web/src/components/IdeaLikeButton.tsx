'use client'

import { LikeButton } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'

import { toggleIdeaLikeAction } from '@/app/actions/likes'

type Props = {
  currentUserDocumentId?: string
  ideaDocumentId: string
  isLiked: boolean
  voteCount: number
}

export default function IdeaLikeButton({ currentUserDocumentId, ideaDocumentId, isLiked, voteCount }: Props) {
  const router = useRouter()

  const handleToggle = async (liked: boolean) => {
    if (!currentUserDocumentId) {
      router.push('/inloggen')
      return
    }

    const result = await toggleIdeaLikeAction(ideaDocumentId, liked)

    if (result.needsLogin) {
      router.push('/inloggen')
    }
  }

  return <LikeButton count={voteCount} isLiked={isLiked} onToggle={handleToggle} />
}
