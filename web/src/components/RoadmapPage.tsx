'use client'

import type { RoadmapFeature, RoadmapStory } from '@design-system-community-roadmap/ui'

import { Grid, Heading } from '@amsterdam/design-system-react'
import { Roadmap } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'

type RoadmapPageProps = {
  features: RoadmapFeature[]
  standaloneStories: RoadmapStory[]
}

export default function RoadmapPage({ features, standaloneStories }: RoadmapPageProps) {
  const router = useRouter()

  return (
    <Grid gapVertical="none">
      <Grid.Cell span="all">
        <Heading level={1} size="level-2">
          Roadmap
        </Heading>
      </Grid.Cell>
      <Grid.Cell span="all">
        <Roadmap
          features={features}
          onStoryNavigate={(story) => router.push(`/stories/${story.documentId}`)}
          standaloneStories={standaloneStories}
        />
      </Grid.Cell>
    </Grid>
  )
}
