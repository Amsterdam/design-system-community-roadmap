import type { Meta, StoryObj } from '@storybook/react-vite'

import { EmojiPicker } from '@design-system-community-roadmap/ui'
import { useState } from 'react'

const meta = {
  title: 'Login/EmojiPicker',
  component: EmojiPicker,
  argTypes: {
    value: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: '350px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmojiPicker>

export default meta
type Story = StoryObj<typeof meta>

const ControlledPicker = (args: React.ComponentProps<typeof EmojiPicker>) => {
  const [value, setValue] = useState(args.value)
  return <EmojiPicker {...args} onChange={setValue} value={value} />
}

export const Default: Story = {
  args: {
    onChange: () => {},
  },
  render: (args) => <ControlledPicker {...args} />,
}

export const WithSelection: Story = {
  args: {
    onChange: () => {},
    value: '🦊',
  },
  render: (args) => <ControlledPicker {...args} />,
}

export const WithTakenEmojis: Story = {
  args: {
    onChange: () => {},
    takenEmojis: ['🦊', '🐼', '🦁', '🐸', '🦋'],
  },
  render: (args) => <ControlledPicker {...args} />,
}
