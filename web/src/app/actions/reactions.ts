'use server'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'

import type { ActionResponse } from './likes'

import { getCurrentUser } from './login'

type StoredReaction = {
  content: string
  end_user?: { documentId: string } | null
}

async function addReaction({
  collection,
  content,
  documentId,
  path,
}: {
  collection: string
  content: string
  documentId: string
  path: string
}): Promise<ActionResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }

  const normalizedContent = content.trim()
  if (!normalizedContent) return { error: 'Reactie mag niet leeg zijn.' }

  try {
    const params = new URLSearchParams({
      'fields[0]': 'id',
      'populate[reactions][fields][0]': 'content',
      'populate[reactions][populate][end_user][fields][0]': 'documentId',
    })

    const getRes = await client.fetch(`${collection}/${documentId}?${params}`)
    if (!getRes.ok) return { error: 'Kon reacties niet ophalen.' }

    const existing: StoredReaction[] = (await getRes.json()).data?.reactions ?? []

    const putRes = await client.fetch(`${collection}/${documentId}`, {
      body: JSON.stringify({
        data: {
          reactions: [
            ...existing.map((r) => ({ content: r.content, end_user: r.end_user?.documentId })),
            { content: normalizedContent, end_user: user.documentId },
          ],
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!putRes.ok) return { error: 'Kon reactie niet toevoegen.' }

    revalidatePath(path)
    return { success: true }
  } catch (err) {
    console.error('[addReaction] Error:', err)
    return { error: 'Er is een onverwachte fout opgetreden.' }
  }
}

export async function addIdeaReactionAction(ideaDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({ collection: 'ideas', content, documentId: ideaDocumentId, path: `/ideeen/${ideaDocumentId}` })
}

export async function addStoryReactionAction(storyDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    collection: 'stories',
    content,
    documentId: storyDocumentId,
    path: `/features/${storyDocumentId}`,
  })
}

export async function addFeatureReactionAction(featureDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    collection: 'features',
    content,
    documentId: featureDocumentId,
    path: `/stories/${featureDocumentId}`,
  })
}
