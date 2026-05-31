'use client'

import type { AnchorHTMLAttributes, ComponentProps } from 'react'

import { Column, Grid, Heading, Pagination, Paragraph, Row, StandaloneLink } from '@amsterdam/design-system-react'
import { Card, SearchBar } from '@design-system-community-roadmap/ui'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Idea } from '@/utils/schemas'

import { toggleIdeaLikeAction } from '@/app/actions/likes'
import { searchIdeasAction } from '@/app/actions/search'

const IDEAS_PER_PAGE = 18

const PaginationLink = ({ href = '', ...restProps }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <NextLink {...(restProps as unknown as Omit<ComponentProps<typeof NextLink>, 'href'>)} href={href} />
)

type IdeaGridProps = {
  currentPage?: number
  currentUserDocumentId?: string
  ideas: Idea[]
}

export default function IdeaGrid({ currentPage = 1, currentUserDocumentId, ideas }: IdeaGridProps) {
  const router = useRouter()

  // Sort order is locked in on mount so cards don't jump when Next.js
  // auto-refreshes the route after a Server Action completes.
  const [sortedIdeas] = useState(() =>
    [...ideas].sort((firstIdea, secondIdea) => (secondIdea.likes?.length ?? 0) - (firstIdea.likes?.length ?? 0)),
  )

  const totalPages = Math.max(1, Math.ceil(sortedIdeas.length / IDEAS_PER_PAGE))
  const activePage = Math.min(Math.max(currentPage, 1), totalPages)
  const visibleIdeas = sortedIdeas.slice((activePage - 1) * IDEAS_PER_PAGE, activePage * IDEAS_PER_PAGE)

  const handleLike = async (ideaDocumentId: string, isLiked: boolean) => {
    if (!currentUserDocumentId) {
      router.push('/inloggen')
      return
    }

    const result = await toggleIdeaLikeAction(ideaDocumentId, isLiked)

    if (result.needsLogin) {
      router.push('/inloggen')
    }
  }

  return (
    <>
      <Grid paddingBottom="large">
        <Grid.Cell span={{ narrow: 4, medium: 5, wide: 8 }}>
          <Column gap="x-small">
            <Heading level={1} size="level-2">
              Ideeën
            </Heading>
            <Paragraph>Deel ideeën voor het Amsterdam Design System en stem op de voorstellen van anderen.</Paragraph>
            <Row>
              <StandaloneLink href="/idee-delen">Idee delen</StandaloneLink>
            </Row>
          </Column>
        </Grid.Cell>
        <Grid.Cell span={{ narrow: 4, medium: 3, wide: 4 }}>
          <SearchBar onSearch={searchIdeasAction} placeholder="Zoek tussen de ideeën" />
        </Grid.Cell>
      </Grid>
      <Grid gapVertical="none">
        {visibleIdeas.map((idea) => {
          const isLiked =
            !!currentUserDocumentId &&
            (idea.likes?.some((like) => like.end_user?.documentId === currentUserDocumentId) ?? false)

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
      {totalPages > 1 && (
        <Grid paddingTop="large">
          <Grid.Cell span="all">
            <Pagination
              linkComponent={PaginationLink}
              linkTemplate={(pageNumber) => `/?pagina=${pageNumber}`}
              page={activePage}
              totalPages={totalPages}
            />
          </Grid.Cell>
        </Grid>
      )}
    </>
  )
}
