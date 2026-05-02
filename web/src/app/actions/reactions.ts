'use server'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'

import type { ActionResponse } from './likes'

import { getCurrentUser } from './login'

async function addReaction({
  content,
  documentId,
  entityField,
  path,
}: {
  content: string
  documentId: string
  entityField: string
  path: string
}): Promise<ActionResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }

  const normalizedContent = content.trim()
  if (!normalizedContent) return { error: 'Reactie mag niet leeg zijn.' }

  try {
    const res = await client.fetch('reactions', {
      body: JSON.stringify({
        data: { content: normalizedContent, end_user: user.documentId, [entityField]: documentId },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (!res.ok) return { error: 'Kon reactie niet toevoegen.' }

    revalidatePath(path)
    return { success: true }
  } catch (err) {
    console.error('[addReaction] Error:', err)
    return { error: 'Er is een onverwachte fout opgetreden.' }
  }
}

export async function addIdeaReactionAction(ideaDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({ content, documentId: ideaDocumentId, entityField: 'idea', path: `/ideeen/${ideaDocumentId}` })
}

export async function addStoryReactionAction(storyDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    content,
    documentId: storyDocumentId,
    entityField: 'story',
    path: `/features/${storyDocumentId}`,
  })
}

export async function addFeatureReactionAction(featureDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    content,
    documentId: featureDocumentId,
    entityField: 'feature',
    path: `/stories/${featureDocumentId}`,
  })
}
