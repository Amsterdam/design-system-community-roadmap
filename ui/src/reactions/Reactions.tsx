'use client'

import { Badge, Button, ErrorMessage, Paragraph, TextArea } from '@amsterdam/design-system-react'
import { clsx } from 'clsx'
import { useState } from 'react'

import styles from './Reactions.module.scss'

export type ReactionItem = {
  author?: { documentId?: string; isTeam?: boolean; name: string } | null
  content: string
  id: number
}

type ActionResponse = { error?: string; success?: boolean }

type ReactionsProps = {
  canDeleteAll?: boolean
  compact?: boolean
  currentUserDocumentId?: string
  onDeleteReaction?: (id: number) => void | Promise<void>
  onEditReaction?: (id: number, content: string) => Promise<ActionResponse>
  reactions: ReactionItem[]
  teamLabel?: string
}

const Reactions = ({
  canDeleteAll = false,
  compact = false,
  currentUserDocumentId,
  onDeleteReaction,
  onEditReaction,
  reactions,
  teamLabel = 'Design System team',
}: ReactionsProps) => {
  const [editingId, setEditingId] = useState<null | number>(null)
  const [editContent, setEditContent] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | undefined>()

  if (reactions.length === 0) {
    return <Paragraph>Nog geen reacties.</Paragraph>
  }

  const startEdit = (reaction: ReactionItem) => {
    setEditingId(reaction.id)
    setEditContent(reaction.content)
    setEditError(undefined)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent('')
    setEditError(undefined)
  }

  const handleSaveEdit = async (id: number) => {
    if (!onEditReaction) return
    const trimmed = editContent.trim()
    if (!trimmed) return

    setEditLoading(true)
    setEditError(undefined)
    const result = await onEditReaction(id, trimmed)
    setEditLoading(false)

    if (result.error) {
      setEditError(result.error)
      return
    }

    setEditingId(null)
    setEditContent('')
  }

  return (
    <ul className={clsx(styles['reactions'], compact && styles['reactions--compact'])}>
      {reactions.map((reaction) => {
        const isOwn = !!currentUserDocumentId && reaction.author?.documentId === currentUserDocumentId
        const showDelete = !!onDeleteReaction && (canDeleteAll || isOwn)
        const showEdit = !!onEditReaction && isOwn
        const isEditing = editingId === reaction.id

        return (
          <li
            className={clsx(styles['reactions__item'], reaction.author?.isTeam && styles['reactions__item--team'])}
            key={reaction.id}
          >
            {isEditing ? (
              <div className={styles['reactions__edit']}>
                <TextArea
                  aria-label="Reactie bewerken"
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  value={editContent}
                />
                {editError && <ErrorMessage>{editError}</ErrorMessage>}
                <div className={styles['reactions__edit-actions']}>
                  <Button
                    disabled={editLoading || !editContent.trim()}
                    onClick={() => handleSaveEdit(reaction.id)}
                    type="button"
                    variant="primary"
                  >
                    {editLoading ? 'Bezig…' : 'Opslaan'}
                  </Button>
                  <button
                    className={styles['reactions__action']}
                    disabled={editLoading}
                    onClick={cancelEdit}
                    type="button"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            ) : (
              <Paragraph className={styles['reactions__content']}>{reaction.content}</Paragraph>
            )}
            {!isEditing && (
              <div className={styles['reactions__author']}>
                {reaction.author?.isTeam ? (
                  <>
                    <span className={styles['reactions__author-name']}>{reaction.author.name || 'Anoniem'}</span>
                    <Badge color="magenta" label={teamLabel} />
                  </>
                ) : (
                  <span className={styles['reactions__author-name']}>{reaction.author?.name || 'Anoniem'}</span>
                )}
                {(showEdit || showDelete) && (
                  <div className={styles['reactions__actions']}>
                    {showEdit && (
                      <button
                        aria-label="Reactie bewerken"
                        className={styles['reactions__action']}
                        onClick={() => startEdit(reaction)}
                        type="button"
                      >
                        Bewerken
                      </button>
                    )}
                    {showDelete && (
                      <button
                        aria-label="Reactie verwijderen"
                        className={styles['reactions__action']}
                        onClick={() => onDeleteReaction(reaction.id)}
                        type="button"
                      >
                        Verwijderen
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Reactions
