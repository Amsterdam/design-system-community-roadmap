'use server'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'

import type { ActionResponse } from './likes'

import { getCurrentUser } from './login'

type StoredReaction = {
  content: string
  end_user?: { documentId: string } | null
  id: number
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
  if (!normalizedContent) return { error: 'Vul je reactie in voordat je deze verstuurt.' }

  try {
    const params = new URLSearchParams({
      'fields[0]': 'id',
      'populate[reactions][fields][0]': 'content',
      'populate[reactions][populate][end_user][fields][0]': 'documentId',
    })

    const getRes = await client.fetch(`${collection}/${documentId}?${params}`)
    if (!getRes.ok) return { error: 'De reacties konden niet worden geladen. Probeer de pagina te verversen.' }

    const entity: Record<string, unknown> = (await getRes.json()).data ?? {}
    const existing = (entity.reactions as StoredReaction[] | undefined) ?? []

    const putRes = await client.fetch(`${collection}/${documentId}`, {
      body: JSON.stringify({
        data: {
          reactions: [
            ...existing.map((reaction) => ({ content: reaction.content, end_user: reaction.end_user?.documentId })),
            { content: normalizedContent, end_user: user.documentId },
          ],
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!putRes.ok) return { error: 'Je reactie kon niet worden opgeslagen. Probeer het opnieuw.' }

    revalidatePath(path)
    return { success: true }
  } catch (err) {
    console.error('[addReaction] Error:', err)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }
}

async function deleteReaction({
  collection,
  documentId,
  path,
  reactionId,
}: {
  collection: string
  documentId: string
  path: string
  reactionId: number
}): Promise<ActionResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }

  try {
    const params = new URLSearchParams({
      'fields[0]': 'id',
      'populate[reactions][fields][0]': 'content',
      'populate[reactions][populate][end_user][fields][0]': 'documentId',
    })

    const getRes = await client.fetch(`${collection}/${documentId}?${params}`)
    if (!getRes.ok) return { error: 'De reacties konden niet worden geladen. Probeer de pagina te verversen.' }

    const entity: Record<string, unknown> = (await getRes.json()).data ?? {}
    const existing = (entity.reactions as StoredReaction[] | undefined) ?? []

    const reaction = existing.find((storedReaction) => storedReaction.id === reactionId)
    if (!reaction) return { error: 'Reactie niet gevonden.' }

    if (!user.isTeam && reaction.end_user?.documentId !== user.documentId) {
      return { error: 'Je hebt geen rechten om deze reactie te verwijderen.' }
    }

    const putRes = await client.fetch(`${collection}/${documentId}`, {
      body: JSON.stringify({
        data: {
          reactions: existing
            .filter((storedReaction) => storedReaction.id !== reactionId)
            .map((storedReaction) => ({
              content: storedReaction.content,
              end_user: storedReaction.end_user?.documentId,
            })),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!putRes.ok) return { error: 'De reactie kon niet worden verwijderd. Probeer het opnieuw.' }

    revalidatePath(path)
    return { success: true }
  } catch (err) {
    console.error('[deleteReaction] Error:', err)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }
}

async function editReaction({
  collection,
  content,
  documentId,
  path,
  reactionId,
}: {
  collection: string
  content: string
  documentId: string
  path: string
  reactionId: number
}): Promise<ActionResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }

  const normalizedContent = content.trim()
  if (!normalizedContent) return { error: 'Vul je reactie in voordat je deze opslaat.' }

  try {
    const params = new URLSearchParams({
      'fields[0]': 'id',
      'populate[reactions][fields][0]': 'content',
      'populate[reactions][populate][end_user][fields][0]': 'documentId',
    })

    const getRes = await client.fetch(`${collection}/${documentId}?${params}`)
    if (!getRes.ok) return { error: 'De reacties konden niet worden geladen. Probeer de pagina te verversen.' }

    const entity: Record<string, unknown> = (await getRes.json()).data ?? {}
    const existing = (entity.reactions as StoredReaction[] | undefined) ?? []

    const reaction = existing.find((storedReaction) => storedReaction.id === reactionId)
    if (!reaction) return { error: 'Reactie niet gevonden.' }

    if (!user.isTeam && reaction.end_user?.documentId !== user.documentId) {
      return { error: 'Je hebt geen rechten om deze reactie te bewerken.' }
    }

    const putRes = await client.fetch(`${collection}/${documentId}`, {
      body: JSON.stringify({
        data: {
          reactions: existing.map((storedReaction) =>
            storedReaction.id === reactionId
              ? { content: normalizedContent, end_user: storedReaction.end_user?.documentId }
              : { content: storedReaction.content, end_user: storedReaction.end_user?.documentId },
          ),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!putRes.ok) return { error: 'Je reactie kon niet worden bijgewerkt. Probeer het opnieuw.' }

    revalidatePath(path)
    return { success: true }
  } catch (err) {
    console.error('[editReaction] Error:', err)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }
}

export async function addIdeaReactionAction(ideaDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({ collection: 'ideas', content, documentId: ideaDocumentId, path: `/ideeen/${ideaDocumentId}` })
}

export async function addFeatureReactionAction(featureDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    collection: 'features',
    content,
    documentId: featureDocumentId,
    path: `/features/${featureDocumentId}`,
  })
}

export async function addStoryReactionAction(storyDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    collection: 'stories',
    content,
    documentId: storyDocumentId,
    path: `/stories/${storyDocumentId}`,
  })
}

export async function deleteIdeaReactionAction(ideaDocumentId: string, reactionId: number): Promise<ActionResponse> {
  return deleteReaction({
    collection: 'ideas',
    documentId: ideaDocumentId,
    path: `/ideeen/${ideaDocumentId}`,
    reactionId,
  })
}

export async function deleteFeatureReactionAction(
  featureDocumentId: string,
  reactionId: number,
): Promise<ActionResponse> {
  return deleteReaction({
    collection: 'features',
    documentId: featureDocumentId,
    path: `/features/${featureDocumentId}`,
    reactionId,
  })
}

export async function deleteStoryReactionAction(storyDocumentId: string, reactionId: number): Promise<ActionResponse> {
  return deleteReaction({
    collection: 'stories',
    documentId: storyDocumentId,
    path: `/stories/${storyDocumentId}`,
    reactionId,
  })
}

export async function editIdeaReactionAction(
  ideaDocumentId: string,
  reactionId: number,
  content: string,
): Promise<ActionResponse> {
  return editReaction({
    collection: 'ideas',
    content,
    documentId: ideaDocumentId,
    path: `/ideeen/${ideaDocumentId}`,
    reactionId,
  })
}

export async function editFeatureReactionAction(
  featureDocumentId: string,
  reactionId: number,
  content: string,
): Promise<ActionResponse> {
  return editReaction({
    collection: 'features',
    content,
    documentId: featureDocumentId,
    path: `/features/${featureDocumentId}`,
    reactionId,
  })
}

export async function editStoryReactionAction(
  storyDocumentId: string,
  reactionId: number,
  content: string,
): Promise<ActionResponse> {
  return editReaction({
    collection: 'stories',
    content,
    documentId: storyDocumentId,
    path: `/stories/${storyDocumentId}`,
    reactionId,
  })
}
