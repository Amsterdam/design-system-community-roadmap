'use client'

import { clsx } from 'clsx'

import styles from './EmojiPicker.module.scss'

export const EMOJI_OPTIONS = [
  '🦊',
  '🐼',
  '🦁',
  '🐸',
  '🦋',
  '🐙',
  '🦄',
  '🐻',
  '🦅',
  '🐳',
  '🌵',
  '🍕',
  '🎸',
  '🚀',
  '🧩',
  '🎯',
  '⭐',
  '🌻',
]

type EmojiPickerProps = {
  emojis?: string[]
  onChange: (emoji: string) => void
  takenEmojis?: string[]
  value?: string
}

const EmojiPicker = ({ emojis = EMOJI_OPTIONS, onChange, takenEmojis = [], value }: EmojiPickerProps) => (
  <div className={styles['emoji-picker']}>
    {emojis.map((emoji) => {
      const isTaken = takenEmojis.includes(emoji)
      const isSelected = value === emoji
      return (
        <button
          aria-label={`Emoji ${emoji}${isTaken ? ', al in gebruik' : ''}`}
          aria-pressed={isSelected}
          className={clsx(
            styles['emoji-picker__option'],
            isSelected && styles['emoji-picker__option--selected'],
            isTaken && styles['emoji-picker__option--taken'],
          )}
          disabled={isTaken}
          key={emoji}
          onClick={() => onChange(emoji)}
          title={isTaken ? 'Al in gebruik' : emoji}
          type="button"
        >
          {emoji}
        </button>
      )
    })}
  </div>
)

export default EmojiPicker
