'use client'

import { Grid, Heading } from '@amsterdam/design-system-react'
import { Card } from '@design-system-community-roadmap/ui'

import type { Idea } from '@/utils/schemas'

type IdeaGridProps = {
  ideas: Idea[]
}

export default function IdeaGrid({ ideas }: IdeaGridProps) {
  const sortedIdeas = [...ideas].sort((a, b) => {
    const likesA = a.likes?.length ?? 0
    const likesB = b.likes?.length ?? 0
    return likesB - likesA
  })

  return (
    <Grid gapVertical="none">
      <Grid.Cell span="all">
        <Heading level={2}>Ideeën</Heading>
      </Grid.Cell>

      {sortedIdeas.map((idea, index) => {
        const isTopThree = index < 3

        return (
          <Grid.Cell key={idea.id} span={{ narrow: 4, medium: 4, wide: isTopThree ? 4 : 3 }}>
            <Card
              description={idea.content}
              href={`/ideeen/${idea.documentId}`}
              title={idea.title}
              variant={isTopThree ? 'big' : 'small'}
              voteCount={idea.likes?.length ?? 0}
            />
          </Grid.Cell>
        )
      })}
    </Grid>
  )
}
