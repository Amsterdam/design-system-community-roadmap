import type { Meta, StoryObj } from '@storybook/react-vite'

import { LoginForm } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'Login/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (name, emoji) => {
      console.log(`Inloggen als: ${name} ${emoji}`)
    },
  },
}

export const WithTakenEmojis: Story = {
  args: {
    onSubmit: (name, emoji) => {
      console.log(`Inloggen als: ${name} ${emoji}`)
    },
    takenEmojis: ['🦊', '🐼', '🦁', '🐸', '🦋', '🐙'],
  },
}

export const WithError: Story = {
  args: {
    error: 'Deze emoji is al in gebruik. Kies een andere emoji.',
    onSubmit: () => {},
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    onSubmit: () => {},
  },
}
