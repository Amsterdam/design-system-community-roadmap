'use client'

import { Badge, Button, Grid, Heading, Paragraph } from '@amsterdam/design-system-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Notification } from '@/utils/schemas'

import { markAllNotificationsRead, markNotificationRead } from '@/app/actions/notifications'
import { formatRelativeTime } from '@/utils/date'

import styles from './NotificationsClient.module.scss'

type NotificationsClientProps = {
  notifications: Notification[]
}

export default function NotificationsClient(props: NotificationsClientProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(props.notifications)

  let unreadCount = 0
  for (const notification of notifications) {
    if (!notification.read) {
      unreadCount = unreadCount + 1
    }
  }

  function markRead(documentId: string) {
    const updated = notifications.map((notification) => {
      if (notification.documentId === documentId) {
        return { ...notification, read: true }
      }
      return notification
    })
    setNotifications(updated)
    markNotificationRead(documentId)
  }

  function handleMarkAllRead() {
    const updated = notifications.map((notification) => {
      return { ...notification, read: true }
    })
    setNotifications(updated)
    markAllNotificationsRead()
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, notification: Notification) {
    markRead(notification.documentId)
    if (notification.href) {
      event.preventDefault()
      router.push(notification.href)
    }
  }

  function getItemClassName(notification: Notification) {
    if (notification.read) {
      return styles['notifications__item']
    }
    return styles['notifications__item'] + ' ' + styles['notifications__item--unread']
  }

  return (
    <Grid gapVertical="large">
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 8 }}>
        <Heading level={1} size="level-2">
          Meldingen
        </Heading>

        {notifications.length === 0 && <Paragraph>Je hebt nog geen meldingen.</Paragraph>}

        {notifications.length > 0 && (
          <ul className={styles['notifications__list']}>
            {notifications.map((notification) => (
              <li className={getItemClassName(notification)} key={notification.id}>
                <a
                  className={styles['notifications__link']}
                  href={notification.href ?? undefined}
                  onClick={(event) => handleClick(event, notification)}
                >
                  <span className={styles['notifications__message']}>{notification.message}</span>
                  <span className={styles['notifications__meta']}>
                    {!notification.read && <Badge color="magenta" label="Nieuw" />}
                    {notification.createdAt && (
                      <span className={styles['notifications__time']}>
                        {formatRelativeTime(notification.createdAt)}
                      </span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {unreadCount > 0 && (
          <Button onClick={handleMarkAllRead} type="button" variant="tertiary">
            Alles als gelezen markeren
          </Button>
        )}
      </Grid.Cell>
    </Grid>
  )
}
