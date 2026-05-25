import type { Meta, StoryObj } from '@storybook/react-vite'

import { NotificationMenu } from '@design-system-community-roadmap/ui'

const referenceTime = new Date('2026-05-19T12:00:00Z').getTime()
const minutesAgo = (minutes: number) => new Date(referenceTime - minutes * 60_000).toISOString()

const meta = {
  title: 'Organisms/Notification Menu',
  component: NotificationMenu,
} satisfies Meta<typeof NotificationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: { notifications: [] },
}

export const WithUnread: Story = {
  args: {
    notifications: [
      {
        createdAt: minutesAgo(3),
        documentId: 'n1',
        href: '/ideeen/abc',
        id: 1,
        message: "Sara reageerde op jouw idee 'Donkere Modus'.",
        read: false,
        type: 'comment_on_idea',
      },
      {
        createdAt: minutesAgo(45),
        documentId: 'n2',
        href: '/features/xyz',
        id: 2,
        message: "Daan reageerde op de feature 'Donkere Modus Ondersteuning' die je leuk vindt.",
        read: false,
        type: 'comment_on_feature',
      },
      {
        createdAt: minutesAgo(60 * 5),
        documentId: 'n3',
        href: '/stories/qrs',
        id: 3,
        message: "De story 'Onderzoek kleurenpallet' is afgerond.",
        read: true,
        type: 'story_completed',
      },
    ],
    onMarkAllRead: () => {},
    onSelect: () => {},
  },
}
