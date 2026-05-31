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
type User = { documentId?: string }

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

export async function getFeatureFollowers(strapi: Core.Strapi, featureDocumentId: string): Promise<string[]> {
  const likes: Like[] = await strapi.db.query('api::feature-like.feature-like').findMany({
    populate: { end_user: true },
    where: { feature: { documentId: featureDocumentId } },
  })

  return likes.map((like) => like.end_user?.documentId).filter((id): id is string => !!id)
}

export async function getStoryFollowers(strapi: Core.Strapi, storyDocumentId: string): Promise<string[]> {
  const likes: Like[] = await strapi.db.query('api::story-like.story-like').findMany({
    populate: { end_user: true },
    where: { story: { documentId: storyDocumentId } },
  })

  return likes.map((like) => like.end_user?.documentId).filter((id): id is string => !!id)
}

export async function getIdeaLikers(strapi: Core.Strapi, ideaDocumentId: string): Promise<string[]> {
  const likes: Like[] = await strapi.db.query('api::idea-like.idea-like').findMany({
    populate: { end_user: true },
    where: { idea: { documentId: ideaDocumentId } },
  })

  return likes.map((like) => like.end_user?.documentId).filter((id): id is string => !!id)
}

export async function getIdeaAuthors(strapi: Core.Strapi, ideaDocumentId: string): Promise<string[]> {
  const idea: { end_users?: User[] } | null = await strapi.db.query('api::idea.idea').findOne({
    populate: { end_users: true },
    where: { documentId: ideaDocumentId },
  })

  return (idea?.end_users ?? []).map((user) => user.documentId).filter((id): id is string => !!id)
}

export async function getEndUserName(strapi: Core.Strapi, documentId: string): Promise<string> {
  const endUser: { name?: string } | null = await strapi.db
    .query('api::end-user.end-user')
    .findOne({ where: { documentId } })

  return endUser?.name ?? 'Iemand'
}
