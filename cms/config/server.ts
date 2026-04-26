import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  app: {
    keys: env.array('APP_KEYS'),
  },
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
});

export default config;
