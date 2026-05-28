import type { Meta, StoryObj } from '@storybook/react-vite'

import { AppHeader } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'Organisms/App Header',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {}

export const LoggedIn: Story = {
  args: {
    currentUser: { name: 'Jan de Vries' },
    onLogout: () => {},
  },
}

export const LoggedInLongName: Story = {
  args: {
    currentUser: { name: 'Wilhelmina van den Berg' },
    onLogout: () => {},
  },
}
