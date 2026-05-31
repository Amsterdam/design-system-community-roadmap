import {
  createNotification,
  getEndUserName,
  getFeatureFollowers,
  getIdeaAuthors,
  getStoryFollowers,
} from '../../../../utils/notifications'

// Lifecycle hooks for the story content type.
// Sends notifications when a story is updated, completed, or commented on.

type LifecycleEvent = {
  params: { data?: Record<string, unknown>; where?: Record<string, unknown> }
}

type StoredReaction = {
  content: string
  end_user?: { documentId?: string } | null
  id: number
}

type Story = {
  content?: string
  documentId: string
  endDate?: null | string
  feature?: { documentId: string; idea?: { documentId: string } }
  reactions?: StoredReaction[]
  startDate?: null | string
  title: string
}

type NewReactionEntry = { end_user?: string | { documentId?: string } | null }

function extractCommenterDocumentId(entry: unknown): string | null {
  if (!entry || typeof entry !== 'object') return null
  const reaction = entry as NewReactionEntry
  if (typeof reaction.end_user === 'string') return reaction.end_user
  if (reaction.end_user && typeof reaction.end_user === 'object') return reaction.end_user.documentId ?? null
  return null
}

async function notifyMany(
  userIds: string[],
  message: string,
  href: string,
  type: Parameters<typeof createNotification>[4],
) {
  const unique = [...new Set(userIds.filter(Boolean))]
  for (const userId of unique) {
    await createNotification(strapi, userId, message, href, type)
  }
}

export default {
  async beforeUpdate(event: LifecycleEvent) {
    if (process.env.IS_SEEDING === 'true') return

    const data = event.params.data ?? {}
    const where = event.params.where
    if (!where) return

    const keys = Object.keys(data)
    const hasNonMetaKeys = keys.some((key) => key !== 'updatedAt' && key !== 'createdAt' && key !== 'publishedAt')
    if (!hasNonMetaKeys) return

    const current: Story | null = await strapi.db.query('api::story.story').findOne({
      populate: { feature: { populate: { idea: true } }, reactions: true },
      where: where,
    })
    if (!current) return

    const storyFollowers = await getStoryFollowers(strapi, current.documentId)
    const featureFollowers = current.feature ? await getFeatureFollowers(strapi, current.feature.documentId) : []
    const ideaAuthors = current.feature?.idea ? await getIdeaAuthors(strapi, current.feature.idea.documentId) : []
    const href = `/stories/${current.documentId}`

    // New comment posted
    if ('reactions' in data) {
      const newCount = Array.isArray(data.reactions) ? data.reactions.length : 0
      const currentCount = current.reactions?.length ?? 0
      if (newCount > currentCount) {
        const lastReaction = Array.isArray(data.reactions) ? data.reactions[newCount - 1] : null
        const commenterDocumentId = extractCommenterDocumentId(lastReaction)
        const commenterName = commenterDocumentId ? await getEndUserName(strapi, commenterDocumentId) : 'Iemand'
        const title = typeof data.title === 'string' ? data.title : current.title
        const recipients = [...new Set([...storyFollowers, ...featureFollowers, ...ideaAuthors])].filter(
          (recipientId) => recipientId && recipientId !== commenterDocumentId,
        )
        for (const recipientId of recipients) {
          await createNotification(
            strapi,
            recipientId,
            `${commenterName} reageerde op de story '${title}' die je volgt.`,
            href,
            'comment_on_story',
          )
        }
      }
    }

    // Content change, story updated or completed
    const contentFields: (keyof Story)[] = ['title', 'content', 'startDate', 'endDate']
    const hasContentChange = contentFields.some((field) => data[field] !== undefined && data[field] !== current[field])
    if (!hasContentChange) return

    let justCompleted = false
    if (typeof data.endDate === 'string' && data.endDate !== current.endDate) {
      if (new Date(data.endDate).getTime() <= Date.now()) {
        justCompleted = true
      }
    }

    const title = typeof data.title === 'string' ? data.title : current.title
    const message = justCompleted ? `De story '${title}' is afgerond.` : `De story '${title}' is bijgewerkt.`
    const type = justCompleted ? 'story_completed' : 'story_updated'

    await notifyMany([...storyFollowers, ...featureFollowers, ...ideaAuthors], message, href, type)
  },
}
