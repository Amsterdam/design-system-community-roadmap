import type { Core } from '@strapi/strapi'

// Helpers for creating notifications from lifecycle hooks.

type NotificationType =
  | 'comment_on_feature'
  | 'comment_on_idea'
  | 'comment_on_story'
  | 'idea_promoted'
  | 'idea_status_changed'
  | 'story_added'
  | 'story_completed'
  | 'story_updated'

type Like = { end_user?: { documentId?: string } }

export async function createNotification(
  strapi: Core.Strapi,
  recipientDocumentId: string,
  message: string,
  href: string,
  type: NotificationType,
): Promise<void> {
  if (!recipientDocumentId) return

  await strapi.documents('api::notification.notification').create({
    data: {
      href: href,
      message: message,
      read: false,
      recipient: recipientDocumentId,
      type: type,
    },
  })
}

export async function getFeatureLikers(strapi: Core.Strapi, featureDocumentId: string): Promise<string[]> {
  const likes: Like[] = await strapi.db.query('api::feature-like.feature-like').findMany({
    populate: { end_user: true },
    where: { feature: { documentId: featureDocumentId } },
  })

  const userIds: string[] = []
  for (const like of likes) {
    if (like.end_user?.documentId) {
      userIds.push(like.end_user.documentId)
    }
  }
  return userIds
}

export async function getIdeaLikers(strapi: Core.Strapi, ideaDocumentId: string): Promise<string[]> {
  const likes: Like[] = await strapi.db.query('api::idea-like.idea-like').findMany({
    populate: { end_user: true },
    where: { idea: { documentId: ideaDocumentId } },
  })

  const userIds: string[] = []
  for (const like of likes) {
    if (like.end_user?.documentId) {
      userIds.push(like.end_user.documentId)
    }
  }
  return userIds
}
