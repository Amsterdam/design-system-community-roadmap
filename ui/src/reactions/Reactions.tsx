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
  onDeleteReaction?: (id: number) => void | Promise<void>
  reactions: ReactionItem[]
  teamLabel?: string
}

const Reactions = ({
  compact = false,
  onDeleteReaction,
  reactions,
  teamLabel = 'Design System team',
}: ReactionsProps) => {
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
            {reaction.author?.isTeam ? (
              <>
                <span className={styles['reactions__author-name']}>{reaction.author.name || 'Anoniem'}</span>
                <Badge color="magenta" label={teamLabel} />
              </>
            ) : (
              <span className={styles['reactions__author-name']}>{reaction.author?.name || 'Anoniem'}</span>
            )}
            {onDeleteReaction && (
              <button
                aria-label="Reactie verwijderen"
                className={styles['reactions__delete']}
                onClick={() => onDeleteReaction(reaction.id)}
                type="button"
              >
                Verwijderen
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Reactions
