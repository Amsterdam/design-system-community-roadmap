'use server'

import type { SearchResult } from '@design-system-community-roadmap/ui'

import { client } from '@/utils/fetch'
import { FeatureSchema, IdeaSchema, StorySchema, strapiCollection } from '@/utils/schemas'

const RESULT_LIMIT = 5

async function searchCollection(collection: 'ideas' | 'stories' | 'features', query: string) {
  try {
    const params = new URLSearchParams({
      'filters[$or][0][title][$containsi]': query,
      'filters[$or][1][content][$containsi]': query,
      'pagination[pageSize]': String(RESULT_LIMIT),
    })

    const res = await client.fetch(`${collection}?${params}`)
    if (!res.ok) return []

    const schema = collection === 'ideas' ? IdeaSchema : collection === 'stories' ? StorySchema : FeatureSchema
    const parsed = strapiCollection(schema).safeParse(await res.json())
    return parsed.success ? parsed.data.data : []
  } catch {
    return []
  }
}

export async function searchIdeasAction(query: string): Promise<SearchResult[]> {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return []

  const ideas = await searchCollection('ideas', trimmedQuery)

  return ideas.map((idea) => ({
    title: idea.title,
    description: idea.content,
    href: `/ideeen/${idea.documentId}`,
    id: idea.documentId,
    type: 'idea',
  }))
}

export async function searchRoadmapAction(query: string): Promise<SearchResult[]> {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return []

  const [stories, features] = await Promise.all([
    searchCollection('stories', trimmedQuery),
    searchCollection('features', trimmedQuery),
  ])

  const storyResults: SearchResult[] = stories.map((story) => ({
    title: story.title,
    description: story.content,
    href: `/stories/${story.documentId}`,
    id: story.documentId,
    type: 'story',
  }))

  const featureResults: SearchResult[] = features.map((feature) => ({
    title: feature.title,
    description: feature.content,
    href: `/features/${feature.documentId}`,
    id: feature.documentId,
    type: 'feature',
  }))

  return [...featureResults, ...storyResults]
}
