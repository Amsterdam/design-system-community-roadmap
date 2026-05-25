import type { Core } from '@strapi/strapi'

import cleanup from './cleanup'
import seed from './seed'

export default {
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const shouldReseed = process.env.RESEED === 'true'
    const shouldSeed = shouldReseed || process.env.SEED === 'true'

    if (!shouldSeed) return

    // Suppress notification lifecycle hooks while seeding: the initial data
    // set is not something existing users should be notified about.
    process.env.IS_SEEDING = 'true'
    try {
      if (shouldReseed) {
        await cleanup({ strapi })
      }

      const ideas = await strapi.documents('api::idea.idea').findMany({ limit: 1 })
      if (ideas.length === 0) {
        await seed({ strapi })
      } else {
        console.log('Database already has ideas, skipping seed.')
      }
    } finally {
      delete process.env.IS_SEEDING
    }
  },

  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},
}
