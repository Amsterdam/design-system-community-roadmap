import { createNotification, getEndUserName, getIdeaLikers } from '../../../../utils/notifications'

// Lifecycle for ideas. Notifies on status changes and new reactions.

type LifecycleEvent = {
  params: { data?: Record<string, unknown>; where?: Record<string, unknown> }
}

type StoredReaction = {
  content: string
  end_user?: { documentId?: string } | null
  id: number
}

type Idea = {
  documentId: string
  end_users?: { documentId?: string }[]
  reactions?: StoredReaction[]
  statusIdea?: string
  title: string
}

type NewReactionEntry = { end_user?: string | { documentId?: string } | null }

const STATUS_LABELS: Record<string, string> = {
  accepted: 'Geaccepteerd',
  in_review: 'Ter beoordeling',
  postponed: 'Uitgesteld',
}

function extractCommenterDocumentId(entry: unknown): string | null {
  if (!entry || typeof entry !== 'object') return null
  const reaction = entry as NewReactionEntry
  if (typeof reaction.end_user === 'string') return reaction.end_user
  if (reaction.end_user && typeof reaction.end_user === 'object') return reaction.end_user.documentId ?? null
  return null
}

export default {
  async beforeUpdate(event: LifecycleEvent) {
    if (process.env.IS_SEEDING === 'true') return

    const data = event.params.data ?? {}
    const where = event.params.where
    if (!where) return

    const statusChanged = 'statusIdea' in data
    const reactionsInData = 'reactions' in data
    if (!statusChanged && !reactionsInData) return

    const current: Idea | null = await strapi.db.query('api::idea.idea').findOne({
      populate: { end_users: true, reactions: true },
      where: where,
    })
    if (!current) return

    const href = `/ideeen/${current.documentId}`

    if (statusChanged && current.statusIdea !== data.statusIdea) {
      const statusIdea = typeof data.statusIdea === 'string' ? data.statusIdea : ''
      const label = STATUS_LABELS[statusIdea] || statusIdea
      const message = `De status van je idee '${current.title}' is gewijzigd naar '${label}'.`
      const authors = current.end_users ?? []
      for (const author of authors) {
        if (author.documentId) {
          await createNotification(strapi, author.documentId, message, href, 'idea_status_changed')
        }
      }
    }

    if (reactionsInData) {
      const newCount = Array.isArray(data.reactions) ? data.reactions.length : 0
      const currentCount = current.reactions?.length ?? 0
      if (newCount > currentCount) {
        const lastReaction = Array.isArray(data.reactions) ? data.reactions[newCount - 1] : null
        const commenterDocumentId = extractCommenterDocumentId(lastReaction)
        const commenterName = commenterDocumentId ? await getEndUserName(strapi, commenterDocumentId) : 'Iemand'
        const title = current.title

        const authorDocumentIds = (current.end_users ?? [])
          .map((user) => user.documentId)
          .filter((id): id is string => !!id)
        const authorSet = new Set(authorDocumentIds)

        for (const authorDocumentId of authorDocumentIds) {
          if (authorDocumentId !== commenterDocumentId) {
            await createNotification(
              strapi,
              authorDocumentId,
              `${commenterName} reageerde op jouw idee '${title}'.`,
              href,
              'comment_on_idea',
            )
          }
        }

        const ideaLikers = await getIdeaLikers(strapi, current.documentId)
        for (const likerDocumentId of ideaLikers) {
          if (!authorSet.has(likerDocumentId) && likerDocumentId !== commenterDocumentId) {
            await createNotification(
              strapi,
              likerDocumentId,
              `${commenterName} reageerde op het idee '${title}' dat je leuk vindt.`,
              href,
              'comment_on_idea',
            )
          }
        }
      }
    }
  },
}
