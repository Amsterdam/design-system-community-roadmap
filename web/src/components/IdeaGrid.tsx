'use client'

import { Grid, Heading } from '@amsterdam/design-system-react'
import { Card, SearchBar } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'

import type { Idea } from '@/utils/schemas'

import { toggleIdeaLikeAction } from '@/app/actions/likes'
import { searchIdeasAction } from '@/app/actions/search'

type IdeaGridProps = {
  currentUserDocumentId?: string
  ideas: Idea[]
}

export default function IdeaGrid({ currentUserDocumentId, ideas }: IdeaGridProps) {
  const router = useRouter()

  const sortedIdeas = [...ideas].sort((a, b) => {
    const likesA = a.likes?.length ?? 0
    const likesB = b.likes?.length ?? 0
    return likesB - likesA
  })

  const handleLike = async (ideaDocumentId: string, isLiked: boolean) => {
    if (!currentUserDocumentId) {
      router.push('/inloggen')
      return
    }

    const result = await toggleIdeaLikeAction(ideaDocumentId, isLiked)

    if (result.needsLogin) {
      router.push('/inloggen')
      return
    }

    if (result.error || result.success === false) {
      router.refresh()
      return
    }

    if (result.success) {
      router.refresh()
    }
  }

  return (
    <>
      <Grid paddingBottom="large">
        <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
          <Heading level={1} size="level-2">
            Ideeën
          </Heading>
        </Grid.Cell>
        <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
          <SearchBar onSearch={searchIdeasAction} placeholder="Zoek tussen de ideeën" />
        </Grid.Cell>
      </Grid>
      <Grid gapVertical="none">
        {sortedIdeas.map((idea) => {
          const isLiked =
            !!currentUserDocumentId &&
            (idea.likes?.some((l) => l.end_user?.documentId === currentUserDocumentId) ?? false)

          return (
            <Grid.Cell key={idea.id} span={{ narrow: 4, medium: 4, wide: 4 }}>
              <Card
                author={idea.end_users?.[0]}
                description={idea.content}
                href={`/ideeen/${idea.documentId}`}
                isLiked={isLiked}
                onLike={(liked) => handleLike(idea.documentId, liked)}
                title={idea.title}
                voteCount={idea.likes?.length ?? 0}
              />
            </Grid.Cell>
          )
        })}
      </Grid>
    </>
  )
}
