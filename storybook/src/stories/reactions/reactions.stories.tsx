import type { Meta, StoryObj } from '@storybook/react-vite'

import { Reactions } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'Molecules/Reactions',
  component: Reactions,
  argTypes: {
    compact: { control: 'boolean' },
    teamLabel: { control: 'text' },
  },
} satisfies Meta<typeof Reactions>

export default meta
type Story = StoryObj<typeof meta>

const mockReactions = [
  {
    author: { name: 'Jan' },
    content: 'Dit is een erg goed idee! Ik zou dit graag in de volgende versie zien.',
    id: 1,
  },
  {
    author: { isTeam: true, name: 'Emma' },
    content: 'We zijn hier al mee bezig als onderdeel van de nieuwe toegankelijkheidsrichtlijnen.',
    id: 2,
  },
  {
    author: { name: 'Pieter' },
    content: 'Kan dit ook gebruikt worden in combinatie met andere componenten?',
    id: 3,
  },
]

export const Default: Story = {
  args: {
    reactions: mockReactions,
  },
}

export const Compact: Story = {
  args: {
    compact: true,
    reactions: mockReactions,
  },
}

export const Empty: Story = {
  args: {
    reactions: [],
  },
}
