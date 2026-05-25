import type { RoadmapFeature, RoadmapStory } from '@design-system-community-roadmap/ui'

import RoadmapPage from '@/components/RoadmapPage'
import { strapi } from '@/utils/strapi'

export default async function Page() {
  const [{ data: allFeatures }, { data: allStories }] = await Promise.all([
    strapi.features.findManyWithStory(),
    strapi.stories.findMany(),
  ])

  const features: RoadmapFeature[] = allFeatures
    .filter((f) => !!f.endDate && !!f.startDate)
    .map((f) => ({
      title: f.title,
      documentId: f.documentId,
      endDate: f.endDate!,
      id: f.id,
      startDate: f.startDate!,
      stories:
        f.story && f.story.startDate
          ? [
              {
                title: f.story.title,
                documentId: f.story.documentId,
                endDate: f.story.endDate ?? null,
                id: f.story.id,
                startDate: f.story.startDate,
              },
            ]
          : [],
    }))

  const storyIdsInFeatures = new Set(allFeatures.flatMap((f) => (f.story ? [f.story.id] : [])))

  const standaloneStories: RoadmapStory[] = allStories
    .filter((s) => !storyIdsInFeatures.has(s.id) && !!s.startDate)
    .map(
      (s): RoadmapStory => ({
        title: s.title,
        documentId: s.documentId,
        endDate: s.endDate ?? null,
        id: s.id,
        startDate: s.startDate!,
      }),
    )

  return <RoadmapPage features={features} standaloneStories={standaloneStories} />
}
