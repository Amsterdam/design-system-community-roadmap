import { z } from 'zod'

import { client } from './fetch'
import {
  EndUserSchema,
  FeatureLikeSchema,
  FeatureSchema,
  IdeaLikeSchema,
  IdeaSchema,
  StoryLikeSchema,
  StorySchema,
  strapiCollection,
  strapiSingle,
} from './schemas'

const NestedFeatureSchema = z.object({
  title: z.string(),
  documentId: z.string(),
  endDate: z.string().nullable(),
  id: z.number(),
  startDate: z.string(),
})

const StoryWithFeaturesSchema = StorySchema.extend({
  features: z.array(NestedFeatureSchema).optional(),
})

async function fetchParsed<T>(endpoint: string, schema: z.ZodType<T>, init?: RequestInit): Promise<T> {
  const res = await client.fetch(endpoint, init)
  if (!res.ok) throw new Error(`Strapi ${res.status} on /${endpoint}`)
  return schema.parse(await res.json())
}

export const strapi = {
  endUsers: {
    findMany: (init?: RequestInit) => fetchParsed('end-users', strapiCollection(EndUserSchema), init),
    findOne: (id: string | number, init?: RequestInit) =>
      fetchParsed(`end-users/${id}`, strapiSingle(EndUserSchema), init),
  },
  featureLikes: {
    findMany: (init?: RequestInit) => fetchParsed('feature-likes', strapiCollection(FeatureLikeSchema), init),
    findOne: (id: string | number, init?: RequestInit) =>
      fetchParsed(`feature-likes/${id}`, strapiSingle(FeatureLikeSchema), init),
  },
  features: {
    findMany: (init?: RequestInit) => fetchParsed('features', strapiCollection(FeatureSchema), init),
    findOne: (id: string | number, init?: RequestInit) =>
      fetchParsed(`features/${id}`, strapiSingle(FeatureSchema), init),
  },
  ideaLikes: {
    findMany: (init?: RequestInit) => fetchParsed('idea-likes', strapiCollection(IdeaLikeSchema), init),
    findOne: (id: string | number, init?: RequestInit) =>
      fetchParsed(`idea-likes/${id}`, strapiSingle(IdeaLikeSchema), init),
  },
  ideas: {
    findMany: (init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[likes][populate][end_user][fields][0]': 'documentId',
      })
      return fetchParsed(`ideas?${params}`, strapiCollection(IdeaSchema), init)
    },
    findOne: (id: string | number, init?: RequestInit) => fetchParsed(`ideas/${id}`, strapiSingle(IdeaSchema), init),
  },
  stories: {
    findMany: (init?: RequestInit) => fetchParsed('stories', strapiCollection(StorySchema), init),
    findManyWithFeatures: (init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[features][fields][0]': 'id',
        'populate[features][fields][1]': 'title',
        'populate[features][fields][2]': 'startDate',
        'populate[features][fields][3]': 'endDate',
        'populate[features][fields][4]': 'documentId',
      })
      return fetchParsed(`stories?${params}`, strapiCollection(StoryWithFeaturesSchema), init)
    },
    findOne: (id: string | number, init?: RequestInit) => fetchParsed(`stories/${id}`, strapiSingle(StorySchema), init),
  },
  storyLikes: {
    findMany: (init?: RequestInit) => fetchParsed('story-likes', strapiCollection(StoryLikeSchema), init),
    findOne: (id: string | number, init?: RequestInit) =>
      fetchParsed(`story-likes/${id}`, strapiSingle(StoryLikeSchema), init),
  },
}
