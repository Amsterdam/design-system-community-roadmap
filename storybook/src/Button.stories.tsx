import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@design-system-community-roadmap/ui'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Click me',
    variant: 'primary',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Disabled: Story = {
  args: { disabled: true },
}
