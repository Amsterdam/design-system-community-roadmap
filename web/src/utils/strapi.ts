import type { ZodType } from 'zod'

import { client } from './fetch'
import {
  EndUserSchema,
  FeatureLikeSchema,
  FeatureSchema,
  IdeaLikeSchema,
  IdeaSchema,
  NestedFeatureSchema,
  NestedIdeaSchema,
  NestedStorySchema,
  StoryLikeSchema,
  StorySchema,
  strapiCollection,
  strapiSingle,
} from './schemas'

const FeatureWithStoriesSchema = FeatureSchema.extend({
  stories: NestedStorySchema.array().optional(),
})

const FeatureSelectOptionSchema = NestedFeatureSchema

const StoryWithFeatureSchema = StorySchema.extend({
  feature: NestedFeatureSchema.nullable().optional(),
})

async function fetchParsed<T>(endpoint: string, schema: ZodType<T>, init?: RequestInit): Promise<T> {
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
    findManyForSelect: (init?: RequestInit) => {
      const params = new URLSearchParams({
        'fields[0]': 'documentId',
        'fields[1]': 'title',
        'fields[2]': 'startDate',
        'fields[3]': 'endDate',
        'pagination[pageSize]': '100',
        'sort[0]': 'startDate:asc',
      })
      return fetchParsed(`features?${params}`, strapiCollection(FeatureSelectOptionSchema), init)
    },
    findManyWithStories: (init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[stories][fields][0]': 'id',
        'populate[stories][fields][1]': 'documentId',
        'populate[stories][fields][2]': 'title',
        'populate[stories][fields][3]': 'startDate',
        'populate[stories][fields][4]': 'endDate',
      })
      return fetchParsed(`features?${params}`, strapiCollection(FeatureWithStoriesSchema), init)
    },
    findOne: (id: string | number, init?: RequestInit) => {
      const params = new URLSearchParams({
        ...imagePopulateParams,
        'populate[idea][fields][0]': 'documentId',
        'populate[idea][fields][1]': 'title',
        'populate[idea][fields][2]': 'id',
        'populate[likes][populate][end_user][fields][0]': 'documentId',
        'populate[likes][populate][end_user][fields][1]': 'name',
        'populate[reactions][populate][end_user][fields][0]': 'id',
        'populate[reactions][populate][end_user][fields][1]': 'documentId',
        'populate[reactions][populate][end_user][fields][2]': 'name',
        'populate[reactions][populate][end_user][fields][3]': 'isTeam',
        'populate[stories][fields][0]': 'documentId',
        'populate[stories][fields][1]': 'title',
        'populate[stories][fields][2]': 'startDate',
        'populate[stories][fields][3]': 'endDate',
        'populate[stories][fields][4]': 'id',
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
    findManyForSelect: (init?: RequestInit) => {
      const params = new URLSearchParams({
        'fields[0]': 'documentId',
        'fields[1]': 'title',
        'pagination[pageSize]': '100',
        'sort[0]': 'createdAt:desc',
      })
      return fetchParsed(`ideas?${params}`, strapiCollection(NestedIdeaSchema), init)
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
    findManyWithFeature: (init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[feature][fields][0]': 'id',
        'populate[feature][fields][1]': 'documentId',
        'populate[feature][fields][2]': 'title',
        'populate[feature][fields][3]': 'startDate',
        'populate[feature][fields][4]': 'endDate',
      })
      return fetchParsed(`stories?${params}`, strapiCollection(StoryWithFeatureSchema), init)
    },
    findOne: (id: string | number, init?: RequestInit) => {
      const params = new URLSearchParams({
        'populate[feature][fields][0]': 'documentId',
        'populate[feature][fields][1]': 'title',
        'populate[feature][fields][2]': 'id',
        'populate[feature][fields][3]': 'startDate',
        'populate[feature][fields][4]': 'endDate',
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
