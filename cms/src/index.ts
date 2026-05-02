import type { Core } from '@strapi/strapi'

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
    if (process.env.SEED === 'true') {
      const ideas = await strapi.documents('api::idea.idea').findMany({ limit: 1 })
      if (ideas.length === 0) {
        await seed({ strapi })
      } else {
        console.log('Database already has ideas, skipping seed.')
      }
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
