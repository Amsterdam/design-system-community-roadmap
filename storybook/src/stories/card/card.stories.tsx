import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'Molecules/Card',
  component: Card,
  argTypes: {
    isLiked: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['big', 'small'],
    },
    voteCount: { control: { min: 0, type: 'number' } },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Big: Story = {
  args: {
    title: 'Multi Select',
    description: 'In een component wil ik meerdere opties tegelijkertijd kunnen selecteren.',
    isLiked: false,
    variant: 'big',
    voteCount: 25,
  },
}

export const Small: Story = {
  args: {
    title: 'Loading UI',
    description: 'Hoe laat ik zien dat data nog wordt opgehaald in mijn applicatie?',
    isLiked: false,
    variant: 'small',
    voteCount: 7,
  },
}

export const PreLiked: Story = {
  args: {
    title: 'Status Badge',
    description: 'Een badge om zelf een status te kunnen opzeggen van iets.',
    isLiked: true,
    variant: 'big',
    voteCount: 24,
  },
}
