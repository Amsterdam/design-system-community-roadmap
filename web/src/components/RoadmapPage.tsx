'use client'

import type { RoadmapFeature, RoadmapStory } from '@design-system-community-roadmap/ui'

import { Grid, Heading } from '@amsterdam/design-system-react'
import { Roadmap, SearchBar } from '@design-system-community-roadmap/ui'
import { useRouter } from 'next/navigation'

import { searchRoadmapAction } from '@/app/actions/search'

type RoadmapPageProps = {
  features: RoadmapFeature[]
  standaloneStories: RoadmapStory[]
}

export default function RoadmapPage({ features, standaloneStories }: RoadmapPageProps) {
  const router = useRouter()

  return (
    <Grid gapVertical="large">
      <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
        <Heading level={1} size="level-2">
          Roadmap
        </Heading>
      </Grid.Cell>
      <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
        <SearchBar onSearch={searchRoadmapAction} placeholder="Zoek features en stories" />
      </Grid.Cell>
      <Grid.Cell span="all">
        <Roadmap
          features={features}
          onFeatureNavigate={(feature) => router.push(`/features/${feature.documentId}`)}
          onStoryNavigate={(story) => router.push(`/stories/${story.documentId}`)}
          standaloneStories={standaloneStories}
        />
      </Grid.Cell>
    </Grid>
  )
}
