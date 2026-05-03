import type { StorybookConfig } from '@storybook/react-vite'

import { fileURLToPath } from 'node:url'

const config: StorybookConfig = {
  addons: ['@chromatic-com/storybook', '@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
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
