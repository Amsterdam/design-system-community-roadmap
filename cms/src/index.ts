import type { Core } from '@strapi/strapi'

import cleanup from './cleanup'
import configureCmsViews from './cms-views'
import seed from './seed'

export default {
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await configureCmsViews({ strapi })

    const shouldReseed = process.env.RESEED === 'true'
    const shouldSeed = shouldReseed || process.env.SEED === 'true'

    if (!shouldSeed) return

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

  register(/* { strapi }: { strapi: Core.Strapi } */) {},
}
