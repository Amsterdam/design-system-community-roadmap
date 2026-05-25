import type { RoadmapFeature, RoadmapStory } from '@design-system-community-roadmap/ui'

import RoadmapPage from '@/components/RoadmapPage'
import { strapi } from '@/utils/strapi'

export default async function Page() {
  const [{ data: allFeatures }, { data: allStories }] = await Promise.all([
    strapi.features.findManyWithStories(),
    strapi.stories.findManyWithFeature(),
  ])

  const features: RoadmapFeature[] = allFeatures
    .filter((f) => !!f.endDate && !!f.startDate)
    .map((f) => ({
      title: f.title,
      documentId: f.documentId,
      endDate: f.endDate!,
      id: f.id,
      startDate: f.startDate!,
      stories: (f.stories ?? [])
        .filter((s) => !!s.startDate)
        .map((s) => ({
          title: s.title,
          documentId: s.documentId,
          endDate: s.endDate ?? null,
          id: s.id,
          startDate: s.startDate!,
        })),
    }))

  const standaloneStories: RoadmapStory[] = allStories
    .filter((s) => !s.feature && !!s.startDate)
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
