'use server'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'

import type { ActionResponse } from './likes'

import { getCurrentUser } from './login'

type CommentNotificationType = 'comment_on_feature' | 'comment_on_idea' | 'comment_on_story'

type NotifyContext = {
  actorDocumentId: string
  actorName: string
  entity: Record<string, unknown>
}

type StoredReaction = {
  content: string
  end_user?: { documentId: string } | null
  id: number
}

const titleOf = (entity: Record<string, unknown>): string => (typeof entity.title === 'string' ? entity.title : '')

async function createCommentNotifications({
  actorDocumentId,
  href,
  message,
  recipientDocumentIds,
  type,
}: {
  actorDocumentId: string
  href: string
  message: string
  recipientDocumentIds: (string | undefined)[]
  type: CommentNotificationType
}): Promise<void> {
  const recipients = [...new Set(recipientDocumentIds)].filter(
    (documentId): documentId is string => !!documentId && documentId !== actorDocumentId,
  )

  await Promise.all(
    recipients.map((recipient) =>
      client
        .fetch('notifications', {
          body: JSON.stringify({ data: { href, message, read: false, recipient, type } }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        })
        .catch((error) => {
          console.error('[createCommentNotifications] Error:', error)
        }),
    ),
  )
}

async function getLikerDocumentIds(
  likeCollection: string,
  entityField: string,
  entityDocumentId: string,
): Promise<string[]> {
  try {
    const params = new URLSearchParams({
      [`filters[${entityField}][documentId][$eq]`]: entityDocumentId,
      'pagination[pageSize]': '100',
      'populate[end_user][fields][0]': 'documentId',
    })
    const res = await client.fetch(`${likeCollection}?${params}`)
    if (!res.ok) return []

    const likes: { end_user?: { documentId?: string } | null }[] = (await res.json()).data ?? []
    return likes.map((like) => like.end_user?.documentId).filter((id): id is string => !!id)
  } catch (error) {
    console.error('[getLikerDocumentIds] Error:', error)
    return []
  }
}

async function addReaction({
  collection,
  content,
  documentId,
  extraParams,
  notify,
  path,
}: {
  collection: string
  content: string
  documentId: string
  extraParams?: Record<string, string>
  notify?: (context: NotifyContext) => Promise<void>
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
      ...extraParams,
    })

    const getRes = await client.fetch(`${collection}/${documentId}?${params}`)
    if (!getRes.ok) return { error: 'Kon reacties niet ophalen.' }

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

    if (!putRes.ok) return { error: 'Kon reactie niet toevoegen.' }

    if (notify) {
      try {
        await notify({ actorDocumentId: user.documentId, actorName: user.name, entity })
      } catch (error) {
        console.error('[addReaction] Notification step failed:', error)
      }
    }

    revalidatePath(path)
    return { success: true }
  } catch (err) {
    console.error('[addReaction] Error:', err)
    return { error: 'Er is een onverwachte fout opgetreden.' }
  }
}

async function deleteReaction({
  collection,
  documentId,
  extraParams,
  path,
  reactionId,
}: {
  collection: string
  documentId: string
  extraParams?: Record<string, string>
  path: string
  reactionId: number
}): Promise<ActionResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Geen toegang.' }

  try {
    const params = new URLSearchParams({
      'fields[0]': 'id',
      'populate[reactions][fields][0]': 'content',
      'populate[reactions][populate][end_user][fields][0]': 'documentId',
      ...extraParams,
    })

    const getRes = await client.fetch(`${collection}/${documentId}?${params}`)
    if (!getRes.ok) return { error: 'Kon reacties niet ophalen.' }

    const entity: Record<string, unknown> = (await getRes.json()).data ?? {}
    const existing = (entity.reactions as StoredReaction[] | undefined) ?? []

    const putRes = await client.fetch(`${collection}/${documentId}`, {
      body: JSON.stringify({
        data: {
          reactions: existing
            .filter((reaction) => reaction.id !== reactionId)
            .map((reaction) => ({ content: reaction.content, end_user: reaction.end_user?.documentId })),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!putRes.ok) return { error: 'Kon reactie niet verwijderen.' }

    revalidatePath(path)
    return { success: true }
  } catch (err) {
    console.error('[deleteReaction] Error:', err)
    return { error: 'Er is een onverwachte fout opgetreden.' }
  }
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

export async function addIdeaReactionAction(ideaDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    collection: 'ideas',
    content,
    documentId: ideaDocumentId,
    extraParams: { 'fields[1]': 'title', 'populate[end_users][fields][0]': 'documentId' },
    notify: async ({ actorDocumentId, actorName, entity }) => {
      const authors = ((entity.end_users as { documentId?: string }[] | null | undefined) ?? []).map(
        (author) => author.documentId,
      )
      await createCommentNotifications({
        actorDocumentId,
        href: `/ideeen/${ideaDocumentId}`,
        message: `${actorName} reageerde op jouw idee '${titleOf(entity)}'.`,
        recipientDocumentIds: authors,
        type: 'comment_on_idea',
      })
    },
    path: `/ideeen/${ideaDocumentId}`,
  })
}

export async function addStoryReactionAction(storyDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    collection: 'stories',
    content,
    documentId: storyDocumentId,
    extraParams: { 'fields[1]': 'title' },
    notify: async ({ actorDocumentId, actorName, entity }) => {
      await createCommentNotifications({
        actorDocumentId,
        href: `/stories/${storyDocumentId}`,
        message: `${actorName} reageerde op de story '${titleOf(entity)}' die je leuk vindt.`,
        recipientDocumentIds: await getLikerDocumentIds('story-likes', 'story', storyDocumentId),
        type: 'comment_on_story',
      })
    },
    path: `/stories/${storyDocumentId}`,
  })
}

export async function addFeatureReactionAction(featureDocumentId: string, content: string): Promise<ActionResponse> {
  return addReaction({
    collection: 'features',
    content,
    documentId: featureDocumentId,
    extraParams: { 'fields[1]': 'title' },
    notify: async ({ actorDocumentId, actorName, entity }) => {
      await createCommentNotifications({
        actorDocumentId,
        href: `/features/${featureDocumentId}`,
        message: `${actorName} reageerde op de feature '${titleOf(entity)}' die je leuk vindt.`,
        recipientDocumentIds: await getLikerDocumentIds('feature-likes', 'feature', featureDocumentId),
        type: 'comment_on_feature',
      })
    },
    path: `/features/${featureDocumentId}`,
  })
}
