import type { StorybookConfig } from '@storybook/react-vite'

import { fileURLToPath } from 'node:url'

const config: StorybookConfig = {
  addons: ['@chromatic-com/storybook', '@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    // Web modules read env vars at module load (utils/media.ts, utils/fetch.ts, which
    // throws when they are missing). Storybook runs on Vite, where `process` is undefined,
    // so provide placeholder values here. Network calls are mocked, so the values are dummies.
    define: {
      ...viteConfig.define,
      'process.env': JSON.stringify({
        NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337/api',
        NODE_ENV: process.env.NODE_ENV ?? 'production',
        STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN ?? 'storybook-placeholder-token',
      }),
    },
    resolve: {
      ...viteConfig.resolve,
      alias: [
        ...(Array.isArray(viteConfig.resolve?.alias) ? viteConfig.resolve.alias : []),
        {
          find: '@design-system-community-roadmap/ui/styles',
          replacement: fileURLToPath(new URL('../../ui/src/styles/global.css', import.meta.url)),
        },
        {
          find: 'next/navigation',
          replacement: fileURLToPath(new URL('../src/__mocks__/next-navigation.ts', import.meta.url)),
        },
        {
          find: '@/app/actions/likes',
          replacement: fileURLToPath(new URL('../src/__mocks__/actions-likes.ts', import.meta.url)),
        },
        {
          find: '@/app/actions/reactions',
          replacement: fileURLToPath(new URL('../src/__mocks__/actions-reactions.ts', import.meta.url)),
        },
        {
          find: /^@\//,
          replacement: fileURLToPath(new URL('../../web/src/', import.meta.url)),
        },
      ],
    },
  }),
}

export default config
