import { createNotification, getFeatureLikers, getIdeaLikers } from '../../../../utils/notifications'

// Lifecycle hooks for the feature content type.
// Sends notifications when a feature is created from an idea, or when a feature is edited.

type LifecycleEvent = {
  params: { data?: Record<string, unknown>; where?: Record<string, unknown> }
  result?: { id?: number | string }
}

type Feature = {
  content?: string
  documentId: string
  endDate?: null | string
  idea?: { documentId: string; title: string }
  startDate?: null | string
  title: string
}

export default {
  async afterCreate(event: LifecycleEvent) {
    if (process.env.IS_SEEDING === 'true') return

    const id = event.result?.id
    if (id === undefined) return

    const feature: Feature | null = await strapi.db.query('api::feature.feature').findOne({
      populate: { idea: true },
      where: { id: id },
    })

    if (!feature?.idea) return

    const likers = await getIdeaLikers(strapi, feature.idea.documentId)
    const message = `Een idee dat je leuk vindt, '${feature.idea.title}', is opgepakt. Er is een feature aangemaakt: '${feature.title}'.`
    const href = `/ideeen/${feature.idea.documentId}`

    for (const userId of likers) {
      await createNotification(strapi, userId, message, href, 'idea_promoted')
    }
  },

  async beforeUpdate(event: LifecycleEvent) {
    if (process.env.IS_SEEDING === 'true') return

    const data = event.params.data ?? {}
    const where = event.params.where
    if (!where) return

    // Skip if only reactions changed (a new comment).
    const keys = Object.keys(data)
    const changedFields = keys.filter(
      (k) => k !== 'reactions' && k !== 'updatedAt' && k !== 'createdAt' && k !== 'publishedAt',
    )
    if (changedFields.length === 0) return

    const current: Feature | null = await strapi.db.query('api::feature.feature').findOne({ where: where })
    if (!current) return

    // Check if the feature was just completed (endDate set to today or earlier).
    let justCompleted = false
    if (typeof data.endDate === 'string' && data.endDate !== current.endDate) {
      const endTime = new Date(data.endDate).getTime()
      if (endTime <= Date.now()) {
        justCompleted = true
      }
    }

    // Check if any content fields changed.
    let contentChanged = false
    const fields: (keyof Feature)[] = ['title', 'content', 'startDate', 'endDate']
    for (const field of fields) {
      if (data[field] !== undefined && data[field] !== current[field]) {
        contentChanged = true
      }
    }

    if (!justCompleted && !contentChanged) return

    const title = typeof data.title === 'string' ? data.title : current.title
    let message: string
    let type: 'story_completed' | 'story_updated'
    if (justCompleted) {
      message = `De feature '${title}' is afgerond.`
      type = 'story_completed'
    } else {
      message = `De feature '${title}' is bijgewerkt.`
      type = 'story_updated'
    }

    const likers = await getFeatureLikers(strapi, current.documentId)
    const href = `/features/${current.documentId}`

    for (const userId of likers) {
      await createNotification(strapi, userId, message, href, type)
    }
  },
}
