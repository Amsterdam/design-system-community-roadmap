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

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  console.log('Cleaning up seeded content...')

  for (const uid of SEEDED_CONTENT_TYPES) {
    const documents = await strapi.documents(uid).findMany({ status: 'draft' })
    for (const document of documents) {
      await strapi.documents(uid).delete({ documentId: document.documentId })
    }
    console.log(`  Deleted ${documents.length} ${uid} documents`)
  }

  console.log('Cleanup complete.')
}
