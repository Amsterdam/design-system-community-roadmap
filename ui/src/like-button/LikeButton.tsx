'use client'

import { Badge, Button, IconButton, Row } from '@amsterdam/design-system-react'
import {
  NotificationFillIcon,
  NotificationIcon,
  ThumbsUpFillIcon,
  ThumbsUpIcon,
} from '@amsterdam/design-system-react-icons'
import { useState } from 'react'

type LikeButtonProps = {
  compact?: boolean
  count: number
  isLiked?: boolean
  mode?: 'follow' | 'vote'
  onToggle?: (isLiked: boolean) => void
  readOnly?: boolean
}

const LikeButton = ({
  compact = false,
  count,
  isLiked: initialLiked = false,
  mode = 'vote',
  onToggle,
  readOnly = false,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked)
  const [voteCount, setVoteCount] = useState(count)

  const handleToggle = () => {
    const nextLiked = !liked
    setLiked(nextLiked)
    setVoteCount((previous) => (nextLiked ? previous + 1 : previous - 1))
    onToggle?.(nextLiked)
  }

  // Read-only: show the vote count without an interactive control
  // (used when the viewer is the idea's author and cannot vote on it).
  if (readOnly) {
    return (
      <Row alignVertical="center" gap="x-small">
        <Badge color="magenta" label={voteCount} />
        <span>{voteCount === 1 ? 'stem' : 'stemmen'}</span>
      </Row>
    )
  }

  if (mode === 'follow') {
    const icon = liked ? NotificationFillIcon : NotificationIcon
    return (
      <Button aria-pressed={liked} icon={icon} iconBefore onClick={handleToggle} type="button" variant="secondary">
        {liked ? 'Volgend' : 'Volgen'}
      </Button>
    )
  }

  const icon = liked ? ThumbsUpFillIcon : ThumbsUpIcon

  if (compact) {
    return (
      <Row alignVertical="center" gap="x-small">
        <Badge color="magenta" label={voteCount} />
        <IconButton
          label={liked ? 'Stem intrekken' : 'Stem uitbrengen'}
          onClick={handleToggle}
          size="small"
          svg={icon}
        />
      </Row>
    )
  }

  return (
    <Button aria-pressed={liked} icon={icon} iconBefore onClick={handleToggle} type="button" variant="secondary">
      {voteCount} {voteCount === 1 ? 'stem' : 'stemmen'}
    </Button>
  )
}

export default LikeButton
