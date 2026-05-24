import { z } from 'zod'

import { client } from './fetch'
import {
  EndUserSchema,
  FeatureLikeSchema,
  FeatureSchema,
  IdeaLikeSchema,
  IdeaSchema,
  NestedFeatureSchema,
  StoryLikeSchema,
  StorySchema,
  strapiCollection,
  strapiSingle,
} from './schemas'

const StoryWithFeaturesSchema = StorySchema.extend({
  features: z.array(NestedFeatureSchema).optional(),
})

const NestedStorySchema = z.object({
  title: z.string(),
  documentId: z.string(),
  endDate: z.string().nullable().optional(),
  id: z.number(),
  startDate: z.string().optional(),
})

const FeatureWithStorySchema = FeatureSchema.extend({
  story: NestedStorySchema.nullable().optional(),
})

async function fetchParsed<T>(endpoint: string, schema: z.ZodType<T>, init?: RequestInit): Promise<T> {
  const res = await client.fetch(endpoint, init)
  if (!res.ok) throw new Error(`Strapi ${res.status} on /${endpoint}`)
  return schema.parse(await res.json())
}

const imagePopulateParams = {
  'populate[images][fields][0]': 'url',
  'populate[images][fields][1]': 'alternativeText',
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
    findManyWithStory: (init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[story][fields][0]': 'id',
        'populate[story][fields][1]': 'documentId',
        'populate[story][fields][2]': 'title',
        'populate[story][fields][3]': 'startDate',
        'populate[story][fields][4]': 'endDate',
      })
      return fetchParsed(`features?${params}`, strapiCollection(FeatureWithStorySchema), init)
    },
    findOne: (id: string | number, init?: RequestInit) => {
      const params = new URLSearchParams({
        ...imagePopulateParams,
        'populate[likes][populate][end_user][fields][0]': 'documentId',
        'populate[likes][populate][end_user][fields][1]': 'name',
        'populate[reactions][populate][end_user][fields][0]': 'id',
        'populate[reactions][populate][end_user][fields][1]': 'documentId',
        'populate[reactions][populate][end_user][fields][2]': 'name',
        'populate[reactions][populate][end_user][fields][3]': 'isTeam',
        'populate[story][fields][0]': 'documentId',
        'populate[story][fields][1]': 'title',
        'populate[story][fields][2]': 'startDate',
        'populate[story][fields][3]': 'endDate',
      })
      return fetchParsed(`features/${id}?${params}`, strapiSingle(FeatureSchema), init)
    },
  },
  ideaLikes: {
    findMany: (init?: RequestInit) => fetchParsed('idea-likes', strapiCollection(IdeaLikeSchema), init),
    findOne: (id: string | number, init?: RequestInit) =>
      fetchParsed(`idea-likes/${id}`, strapiSingle(IdeaLikeSchema), init),
  },
  ideas: {
    findMany: (init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[end_users][fields][0]': 'name',
        'populate[end_users][fields][1]': 'documentId',
        'populate[end_users][fields][2]': 'id',
        'populate[end_users][fields][3]': 'isTeam',
        'populate[likes][fields][0]': 'documentId',
        'populate[likes][populate][end_user][fields][0]': 'documentId',
      })
      return fetchParsed('ideas?' + params, strapiCollection(IdeaSchema), init)
    },
    findOne: (id: string | number, init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[end_users][fields][0]': 'name',
        'populate[end_users][fields][1]': 'documentId',
        'populate[end_users][fields][2]': 'id',
        'populate[end_users][fields][3]': 'isTeam',
        'populate[features][fields][0]': 'documentId',
        'populate[features][fields][1]': 'title',
        'populate[features][fields][2]': 'id',
        'populate[features][fields][3]': 'startDate',
        'populate[features][fields][4]': 'endDate',
        ...imagePopulateParams,
        'populate[likes][populate][end_user][fields][0]': 'documentId',
        'populate[likes][populate][end_user][fields][1]': 'name',
        'populate[reactions][populate][end_user][fields][0]': 'documentId',
        'populate[reactions][populate][end_user][fields][1]': 'name',
        'populate[reactions][populate][end_user][fields][2]': 'isTeam',
      })
      return fetchParsed(`ideas/${id}?${params}`, strapiSingle(IdeaSchema), init)
    },
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
    findOne: (id: string | number, init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[features][fields][0]': 'documentId',
        'populate[features][fields][1]': 'title',
        'populate[features][fields][2]': 'id',
        'populate[features][fields][3]': 'startDate',
        'populate[features][fields][4]': 'endDate',
        ...imagePopulateParams,
        'populate[likes][populate][end_user][fields][0]': 'documentId',
        'populate[likes][populate][end_user][fields][1]': 'name',
        'populate[reactions][populate][end_user][fields][0]': 'documentId',
        'populate[reactions][populate][end_user][fields][1]': 'name',
        'populate[reactions][populate][end_user][fields][2]': 'isTeam',
      })
      return fetchParsed(`stories/${id}?${params}`, strapiSingle(StorySchema), init)
    },
  },
  storyLikes: {
    findMany: (init?: RequestInit) => fetchParsed('story-likes', strapiCollection(StoryLikeSchema), init),
    findOne: (id: string | number, init?: RequestInit) =>
      fetchParsed(`story-likes/${id}`, strapiSingle(StoryLikeSchema), init),
  },
}
