import '@design-system-community-roadmap/ui/styles'
import type { Decorator, Preview } from '@storybook/react-vite'

import { createElement } from 'react'

// Constrains stories to a readable canvas width instead of stretching them across
// the full viewport. Stories that genuinely need the full width opt out with the
// native Storybook `parameters: { layout: 'fullscreen' }` (the Roadmap timeline,
// the full-page detail views, and the Header/Navigation bars).
const withCanvas: Decorator = (Story, context) =>
  context.parameters.layout === 'fullscreen'
    ? createElement(Story)
    : createElement('div', { style: { marginInline: 'auto', maxWidth: 640, width: '100%' } }, createElement(Story))

const preview: Preview = {
  decorators: [withCanvas],
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
