import { createNotifications } from '../../../../utils/notifications'

/**
 * Lifecycle for the submitted ideas. When the team changes an idea's
 * status (e.g. accepting it), the person who submitted that
 * idea are notified.
 */

type LifecycleEvent = {
  params: { data?: Record<string, unknown>; where?: Record<string, unknown> }
}

const STATUS_LABELS: Record<string, string> = {
  accepted: 'Geaccepteerd',
  in_review: 'Ter beoordeling',
  postponed: 'Uitgesteld',
}

export default {
  async beforeUpdate(event: LifecycleEvent) {
    if (process.env.IS_SEEDING === 'true') return

    try {
      const data = event.params.data ?? {}
      const where = event.params.where
      if (!where || !('status' in data)) return

      const current = await strapi.db.query('api::idea.idea').findOne({
        populate: { end_users: true },
        where,
      })
      if (!current || current.status === data.status) return

      const status = typeof data.status === 'string' ? data.status : ''

      await createNotifications(strapi, {
        href: `/ideeen/${current.documentId}`,
        message: `De status van je idee '${current.title}' is gewijzigd naar '${STATUS_LABELS[status] ?? status}'.`,
        recipientDocumentIds: (current.end_users ?? []).map((user: { documentId?: string }) => user.documentId),
        type: 'idea_status_changed',
      })
    } catch (error) {
      strapi.log.error(`[idea.beforeUpdate] ${error}`)
    }
  },
}
