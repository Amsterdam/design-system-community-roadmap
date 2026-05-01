import type { Meta, StoryObj } from '@storybook/react-vite'

import { LikeButton } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'LikeButton',
  component: LikeButton,
  argTypes: {
    count: { control: { min: 0, type: 'number' } },
    isLiked: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['default', 'small'],
    },
  },
} satisfies Meta<typeof LikeButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 25,
    isLiked: false,
    size: 'default',
  },
}

export const Liked: Story = {
  args: {
    count: 25,
    isLiked: true,
    size: 'default',
  },
}

export const Small: Story = {
  args: {
    count: 7,
    isLiked: false,
    size: 'small',
  },
}
