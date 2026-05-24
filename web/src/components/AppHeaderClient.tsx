'use client'

import type { NotificationMenuItem } from '@design-system-community-roadmap/ui'

import { AppHeader } from '@design-system-community-roadmap/ui'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { logoutAction } from '@/app/actions/login'
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '@/app/actions/notifications'

const POLL_INTERVAL_MS = 60_000

function getDisplayUser(): { emoji: string; name: string } | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(/(?:^|;\s*)ams-community-user-display=([^;]*)/)
  if (!match) return undefined
  try {
    return JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return undefined
  }
}

export default function AppHeaderClient() {
  const pathname = usePathname()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<{ emoji: string; name: string } | undefined>(undefined)
  const [notifications, setNotifications] = useState<NotificationMenuItem[]>([])

  const refresh = useCallback(async () => {
    const fresh = await getNotifications()
    setNotifications(
      fresh.map((notification) => ({
        createdAt: notification.createdAt,
        documentId: notification.documentId,
        href: notification.href ?? null,
        id: notification.id,
        message: notification.message,
        read: notification.read,
        type: notification.type,
      })),
    )
  }, [])

  useEffect(() => {
    setCurrentUser(getDisplayUser())
  }, [pathname])

  useEffect(() => {
    if (!currentUser) {
      setNotifications([])
      return undefined
    }
    refresh()
    const id = window.setInterval(refresh, POLL_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [currentUser, pathname, refresh])

  const handleSelect = (item: NotificationMenuItem) => {
    // Optimistic: mark read locally now; the server action persists it in the background.
    setNotifications((current) =>
      current.map((notification) =>
        notification.documentId === item.documentId ? { ...notification, read: true } : notification,
      ),
    )
    markNotificationRead(item.documentId)
    if (item.href) router.push(item.href)
  }

  const handleMarkAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))
    markAllNotificationsRead()
  }

  return (
    <AppHeader
      currentUser={currentUser}
      notifications={notifications}
      onLogout={logoutAction}
      onMarkAllNotificationsRead={handleMarkAllRead}
      onSelectNotification={handleSelect}
    />
  )
}
