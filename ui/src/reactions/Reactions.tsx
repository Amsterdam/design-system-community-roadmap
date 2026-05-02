'use client'

import { Badge, Paragraph } from '@amsterdam/design-system-react'
import { clsx } from 'clsx'

import styles from './Reactions.module.scss'

export type ReactionItem = {
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}

type ReactionsProps = {
  compact?: boolean
  reactions: ReactionItem[]
  teamLabel?: string
}

const Reactions = ({ compact = false, reactions, teamLabel = 'Design System team' }: ReactionsProps) => {
  if (reactions.length === 0) {
    return <Paragraph>Nog geen reacties.</Paragraph>
  }

  return (
    <ul className={clsx(styles['reactions'], compact && styles['reactions--compact'])}>
      {reactions.map((reaction) => (
        <li
          className={clsx(styles['reactions__item'], reaction.author?.isTeam && styles['reactions__item--team'])}
          key={reaction.id}
        >
          <Paragraph className={styles['reactions__content']}>{reaction.content}</Paragraph>
          <div className={styles['reactions__author']}>
            <span className={styles['reactions__author-name']}>{reaction.author?.name ?? 'Anoniem'}</span>
            {reaction.author?.isTeam && <Badge color="magenta" label={teamLabel} />}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Reactions
