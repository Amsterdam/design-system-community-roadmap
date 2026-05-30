'use server'

import type { z } from 'zod'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'
import { FeatureLikeSchema, IdeaLikeSchema, StoryLikeSchema, strapiCollection } from '@/utils/schemas'

import { getCurrentUser } from './login'

export type ActionResponse = {
  error?: string
  needsLogin?: boolean
  success?: boolean
}

async function toggleLike<T extends z.ZodType<{ documentId: string }>>({
  collection,
  documentId,
  entityField,
  isLiked,
  revalidatePaths,
  schema,
}: {
  collection: string
  documentId: string
  entityField: string
  isLiked: boolean
  revalidatePaths: string[]
  schema: T
}): Promise<ActionResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }

  try {
    if (isLiked) {
      const res = await client.fetch(collection, {
        body: JSON.stringify({
          data: { end_user: user.documentId, [entityField]: documentId },
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      if (!res.ok) return { error: 'Kon like niet toevoegen.' }
    } else {
      const params = new URLSearchParams({
        [`filters[${entityField}][documentId][$eq]`]: documentId,
        'filters[end_user][documentId][$eq]': user.documentId,
      })

      const searchRes = await client.fetch(`${collection}?${params}`)
      if (!searchRes.ok) return { error: 'Kon like niet vinden om te verwijderen.' }

      const parsed = strapiCollection(schema).safeParse(await searchRes.json())

      if (!parsed.success) {
        console.error(`[toggleLike] Invalid ${collection} response:`, parsed.error)
        return { error: 'Kon like niet verwerken om te verwijderen.' }
      }

      if (parsed.data.data.length > 0) {
        const deleteRes = await client.fetch(`${collection}/${parsed.data.data[0].documentId}`, { method: 'DELETE' })
        if (!deleteRes.ok) return { error: 'Kon like niet verwijderen.' }
      }
    }

    revalidatePaths.forEach((path) => revalidatePath(path))
    return { success: true }
  } catch (error) {
    console.error('[toggleLike] Error:', error)
    return { error: 'Er is een onverwachte fout opgetreden.' }
  }
}

export async function toggleIdeaLikeAction(ideaDocumentId: string, isLiked: boolean): Promise<ActionResponse> {
  // Does not revalidate `/`: the home page sorts ideas by like
  // count, and an automatic Server-Action revalidation there would reshuffle the cards
  return toggleLike({
    collection: 'idea-likes',
    documentId: ideaDocumentId,
    entityField: 'idea',
    isLiked,
    revalidatePaths: [`/ideeen/${ideaDocumentId}`],
    schema: IdeaLikeSchema,
  })
}

export async function toggleStoryLikeAction(storyDocumentId: string, isLiked: boolean): Promise<ActionResponse> {
  return toggleLike({
    collection: 'story-likes',
    documentId: storyDocumentId,
    entityField: 'story',
    isLiked,
    revalidatePaths: ['/', '/roadmap', `/stories/${storyDocumentId}`],
    schema: StoryLikeSchema,
  })
}

export async function toggleFeatureLikeAction(featureDocumentId: string, isLiked: boolean): Promise<ActionResponse> {
  return toggleLike({
    collection: 'feature-likes',
    documentId: featureDocumentId,
    entityField: 'feature',
    isLiked,
    revalidatePaths: ['/', '/roadmap', `/features/${featureDocumentId}`],
    schema: FeatureLikeSchema,
  })
}
