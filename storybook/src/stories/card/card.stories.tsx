import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'Molecules/Card',
  component: Card,
  argTypes: {
    isLiked: { control: 'boolean' },
    voteCount: { control: { min: 0, type: 'number' } },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const PreLiked: Story = {
  args: {
    title: 'Status Badge',
    description: 'Een badge om zelf een status te kunnen opzeggen van iets.',
    isLiked: true,
    voteCount: 24,
  },
}
