import type { Meta, StoryObj } from '@storybook/react-vite'

import { AddReaction } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'Reactions/AddReaction',
  component: AddReaction,
  args: {
    onSubmit: () => {},
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} satisfies Meta<typeof AddReaction>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoggedIn: true,
  },
}

export const NotLoggedIn: Story = {
  args: {
    isLoggedIn: false,
  },
}

export const Loading: Story = {
  args: {
    isLoggedIn: true,
    loading: true,
  },
}

export const WithError: Story = {
  args: {
    error: 'Er is iets misgegaan bij het plaatsen van je reactie.',
    isLoggedIn: true,
  },
}
