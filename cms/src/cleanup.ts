import type { Core } from '@strapi/strapi'

const SEEDED_CONTENT_TYPES = [
  'api::story-like.story-like',
  'api::feature-like.feature-like',
  'api::idea-like.idea-like',
  'api::notification.notification',
  'api::story.story',
  'api::feature.feature',
  'api::idea.idea',
  'api::end-user.end-user',
] as const

const DELETE_BATCH_SIZE = 100

async function deleteAllDocumentsForStatus(
  strapi: Core.Strapi,
  uid: (typeof SEEDED_CONTENT_TYPES)[number],
  status?: 'draft' | 'published',
) {
  let deletedCount = 0

  while (true) {
    const query = status
      ? { pagination: { page: 1, pageSize: DELETE_BATCH_SIZE }, status }
      : { pagination: { page: 1, pageSize: DELETE_BATCH_SIZE } }

    const documents = await strapi.documents(uid).findMany(query)

    if (documents.length === 0) {
      break
    }

    for (const document of documents) {
      await strapi.documents(uid).delete({ documentId: document.documentId })
    }

    deletedCount += documents.length
  }

  return deletedCount
}

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  console.log('Cleaning up seeded content...')

  for (const uid of SEEDED_CONTENT_TYPES) {
    const supportsDraftAndPublish = strapi.contentType(uid)?.options?.draftAndPublish === true
    let deletedCount = 0

    if (supportsDraftAndPublish) {
      deletedCount += await deleteAllDocumentsForStatus(strapi, uid, 'draft')
      deletedCount += await deleteAllDocumentsForStatus(strapi, uid, 'published')
    } else {
      deletedCount += await deleteAllDocumentsForStatus(strapi, uid)
    }

    console.log(`  Deleted ${deletedCount} ${uid} documents`)
  }

  console.log('Cleanup complete.')
}
