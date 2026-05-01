import type { RoadmapFeature, RoadmapStory } from '@design-system-community-roadmap/ui'

import RoadmapPage from '@/components/RoadmapPage'
import { strapi } from '@/utils/strapi'

export default async function Page() {
  const [{ data: stories }, { data: allFeatures }] = await Promise.all([
    strapi.stories.findManyWithFeatures(),
    strapi.features.findMany(),
  ])

  const features: RoadmapFeature[] = stories
    .filter((s) => Boolean(s.endDate))
    .map((s) => ({
      title: s.title,
      documentId: s.documentId,
      endDate: s.endDate as string,
      id: s.id,
      startDate: s.startDate,
      stories: (s.features ?? []).map(
        (f): RoadmapStory => ({
          title: f.title,
          documentId: f.documentId,
          endDate: f.endDate,
          id: f.id,
          startDate: f.startDate,
        }),
      ),
    }))

  const featureIdsInStories = new Set(stories.flatMap((s) => (s.features ?? []).map((f) => f.id)))

  const standaloneStories: RoadmapStory[] = allFeatures
    .filter((f) => !featureIdsInStories.has(f.id))
    .map(
      (f): RoadmapStory => ({
        title: f.title,
        documentId: f.documentId,
        endDate: f.endDate,
        id: f.id,
        startDate: f.startDate,
      }),
    )

  return <RoadmapPage features={features} standaloneStories={standaloneStories} />
}
