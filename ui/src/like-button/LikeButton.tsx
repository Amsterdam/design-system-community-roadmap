'use client'

import { Badge } from '@amsterdam/design-system-react'
import { HeartFillIcon, HeartIcon } from '@amsterdam/design-system-react-icons'
import { clsx } from 'clsx'
import { useState } from 'react'

import styles from './LikeButton.module.scss'

type LikeButtonSize = 'default' | 'large' | 'small'

type LikeButtonProps = {
  count: number
  isLiked?: boolean
  onToggle?: (isLiked: boolean) => void
  size?: LikeButtonSize
}

const LikeButton = ({ count, isLiked: initialLiked = false, onToggle, size = 'default' }: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked)
  const [voteCount, setVoteCount] = useState(count)

  const handleToggle = () => {
    const newLiked = !liked
    setLiked(newLiked)
    setVoteCount((prev) => (newLiked ? prev + 1 : prev - 1))
    onToggle?.(newLiked)
  }

  return (
    <div className={styles['like-button']}>
      <Badge color="magenta" label={voteCount} />
      <button
        aria-label={liked ? 'Verwijder like' : 'Voeg like toe'}
        aria-pressed={liked}
        className={clsx(
          styles['like-button__button'],
          size === 'small' && styles['like-button__button--small'],
          size === 'large' && styles['like-button__button--large'],
        )}
        onClick={handleToggle}
        type="button"
      >
        {liked ? <HeartFillIcon className={styles['like-button__icon--liked']} /> : <HeartIcon />}
      </button>
    </div>
  )
}

export default LikeButton
