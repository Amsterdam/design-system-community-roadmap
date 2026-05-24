import { createNotification } from '../../../../utils/notifications'

// Lifecycle for ideas. Notifies the author when their idea's status changes.

type LifecycleEvent = {
  params: { data?: Record<string, unknown>; where?: Record<string, unknown> }
}

type Idea = {
  documentId: string
  end_users?: { documentId?: string }[]
  status?: string
  title: string
}

const STATUS_LABELS: Record<string, string> = {
  accepted: 'Geaccepteerd',
  in_review: 'Ter beoordeling',
  postponed: 'Uitgesteld',
}

export default {
  async beforeUpdate(event: LifecycleEvent) {
    if (process.env.IS_SEEDING === 'true') return

    const data = event.params.data ?? {}
    const where = event.params.where
    if (!where) return
    if (!('status' in data)) return

    const current: Idea | null = await strapi.db.query('api::idea.idea').findOne({
      populate: { end_users: true },
      where: where,
    })
    if (!current) return
    if (current.status === data.status) return

    const status = typeof data.status === 'string' ? data.status : ''
    const label = STATUS_LABELS[status] || status
    const message = `De status van je idee '${current.title}' is gewijzigd naar '${label}'.`
    const href = `/ideeen/${current.documentId}`

    const authors = current.end_users ?? []
    for (const author of authors) {
      if (author.documentId) {
        await createNotification(strapi, author.documentId, message, href, 'idea_status_changed')
      }
    }
  },
}
