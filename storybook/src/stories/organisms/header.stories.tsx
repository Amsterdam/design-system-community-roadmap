import type { Meta, StoryObj } from '@storybook/react-vite'

import { Header } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {}

export const LoggedIn: Story = {
  args: {
    currentUser: { name: 'Jan' },
  },
}
