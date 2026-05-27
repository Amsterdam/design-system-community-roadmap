'use client'

import { Badge, Button } from '@amsterdam/design-system-react'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'

import styles from './NotificationMenu.module.scss'

export type NotificationMenuItem = {
  createdAt?: string
  documentId: string
  href?: null | string
  id: number
  message: string
  read: boolean
  type: string
}

type NotificationMenuProps = {
  notifications: NotificationMenuItem[]
  onMarkAllRead?: () => void
  onSelect?: (item: NotificationMenuItem) => void
}

/** How many notifications the dropdown shows before pointing to the full page. */
const MAX_VISIBLE = 8

const formatRelativeTime = (iso?: string): string => {
  if (!iso) return ''
  const diffMs = Date.now() - new Date(iso).getTime()
  if (Number.isNaN(diffMs)) return ''

  const minutes = Math.floor(diffMs / 60_000)
  if (minutes < 1) return 'zojuist'
  if (minutes < 60) return `${minutes} min geleden`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} uur geleden`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? 'dag' : 'dagen'} geleden`

  return new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })
}

const NotificationMenu = ({ notifications, onMarkAllRead, onSelect }: NotificationMenuProps) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((notification) => !notification.read).length
  const visible = notifications.slice(0, MAX_VISIBLE)

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div className={styles['notification-menu']} ref={containerRef}>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={unreadCount > 0 ? `Meldingen, ${unreadCount} ongelezen` : 'Meldingen'}
        className={styles['notification-menu__trigger']}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span aria-hidden="true" className={styles['notification-menu__bell']}>
          🔔
        </span>
        {unreadCount > 0 && <Badge color="magenta" label={unreadCount} />}
      </button>

      {open && (
        <div aria-label="Meldingen" className={styles['notification-menu__panel']} role="dialog">
          <div className={styles['notification-menu__header']}>
            <strong>Meldingen</strong>
            {unreadCount > 0 && onMarkAllRead && (
              <Button onClick={onMarkAllRead} type="button" variant="tertiary">
                Alles als gelezen markeren
              </Button>
            )}
          </div>

          {visible.length === 0 ? (
            <p className={styles['notification-menu__empty']}>Je hebt nog geen meldingen.</p>
          ) : (
            <ul className={styles['notification-menu__list']}>
              {visible.map((item) => (
                <li key={item.id}>
                  <a
                    className={clsx(
                      styles['notification-menu__item'],
                      !item.read && styles['notification-menu__item--unread'],
                    )}
                    href={item.href ?? undefined}
                    onClick={(event) => {
                      if (onSelect) {
                        event.preventDefault()
                        onSelect(item)
                      }
                      setOpen(false)
                    }}
                  >
                    <span>{item.message}</span>
                    {item.createdAt && (
                      <span className={styles['notification-menu__time']}>{formatRelativeTime(item.createdAt)}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <a className={styles['notification-menu__footer']} href="/notificaties">
            Alle meldingen
          </a>
        </div>
      )}
    </div>
  )
}

export default NotificationMenu
