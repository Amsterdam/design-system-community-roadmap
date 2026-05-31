'use client'

import type { RoadmapFeature, RoadmapStory } from '@design-system-community-roadmap/ui'

import { Column, Grid, Heading, Paragraph, Row, StandaloneLink } from '@amsterdam/design-system-react'
import { Roadmap, SearchBar } from '@design-system-community-roadmap/ui'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'

import { searchRoadmapAction } from '@/app/actions/search'

type RoadmapPageProps = {
  currentUserIsTeam?: boolean
  features: RoadmapFeature[]
  standaloneStories: RoadmapStory[]
}

export default function RoadmapPage({ currentUserIsTeam = false, features, standaloneStories }: RoadmapPageProps) {
  const router = useRouter()

  return (
    <Grid gapVertical="large">
      <Grid.Cell span={{ narrow: 4, medium: 5, wide: 8 }}>
        <Column gap="x-small">
          <Heading level={1} size="level-2">
            Roadmap
          </Heading>
          <Paragraph>Bekijk waar het Amsterdam Design System aan werkt en wat er op de planning staat.</Paragraph>
          {currentUserIsTeam && (
            <Row gap="small" wrap>
              <NextLink href="/features/nieuw" legacyBehavior passHref>
                <StandaloneLink>Feature aanmaken</StandaloneLink>
              </NextLink>
              <NextLink href="/stories/nieuw" legacyBehavior passHref>
                <StandaloneLink>Story aanmaken</StandaloneLink>
              </NextLink>
            </Row>
          )}
        </Column>
      </Grid.Cell>
      <Grid.Cell span={{ narrow: 4, medium: 3, wide: 4 }}>
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
