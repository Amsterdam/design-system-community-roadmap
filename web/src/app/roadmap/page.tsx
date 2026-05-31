import type { RoadmapFeature, RoadmapStory } from '@design-system-community-roadmap/ui'

import { getCurrentUser } from '@/app/actions/login'
import RoadmapPage from '@/components/RoadmapPage'
import { strapi } from '@/utils/strapi'

export default async function Page() {
  const [{ data: allFeatures }, { data: allStories }, currentUser] = await Promise.all([
    strapi.features.findManyWithStories(),
    strapi.stories.findManyWithFeature(),
    getCurrentUser(),
  ])

  const features: RoadmapFeature[] = allFeatures
    .filter((feature) => !!feature.startDate)
    .map((feature) => ({
      title: feature.title,
      documentId: feature.documentId,
      endDate: feature.endDate ?? null,
      id: feature.id,
      startDate: feature.startDate!,
      stories: (feature.stories ?? [])
        .filter((story) => !!story.startDate)
        .map((story) => ({
          title: story.title,
          documentId: story.documentId,
          endDate: story.endDate ?? null,
          id: story.id,
          startDate: story.startDate!,
        })),
    }))

  const standaloneStories: RoadmapStory[] = allStories
    .filter((story) => !story.feature && !!story.startDate)
    .map(
      (story): RoadmapStory => ({
        title: story.title,
        documentId: story.documentId,
        endDate: story.endDate ?? null,
        id: story.id,
        startDate: story.startDate!,
      }),
    )

  return (
    <RoadmapPage
      currentUserIsTeam={currentUser?.isTeam ?? false}
      features={features}
      standaloneStories={standaloneStories}
    />
  )
}
