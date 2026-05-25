'use server'

import { revalidatePath } from 'next/cache'

import type { Notification } from '@/utils/schemas'

import { client } from '@/utils/fetch'
import { NotificationSchema, strapiCollection } from '@/utils/schemas'

import { getCurrentUser } from './login'

const NOTIFICATIONS_PATH = '/notificaties'

export async function getNotifications(): Promise<Notification[]> {
  const user = await getCurrentUser()
  if (!user) return []

  const params = new URLSearchParams({
    'filters[recipient][documentId][$eq]': user.documentId,
    'pagination[pageSize]': '50',
    'sort[0]': 'createdAt:desc',
  })

  try {
    const res = await client.fetch(`notifications?${params}`, { cache: 'no-store' })
    if (!res.ok) return []

    const parsed = strapiCollection(NotificationSchema).safeParse(await res.json())
    if (!parsed.success) {
      console.error('[getNotifications] Invalid response:', parsed.error)
      return []
    }
    return parsed.data.data
  } catch (error) {
    console.error('[getNotifications] Error:', error)
    return []
  }
}

async function setNotificationRead(documentId: string): Promise<void> {
  await client.fetch(`notifications/${documentId}`, {
    body: JSON.stringify({ data: { read: true } }),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  })
}

export async function markNotificationRead(documentId: string): Promise<void> {
  const user = await getCurrentUser()
  if (!user) return

  try {
    const params = new URLSearchParams({ 'populate[recipient][fields][0]': 'documentId' })
    const res = await client.fetch(`notifications/${documentId}?${params}`)
    if (!res.ok) return

    const owner = (await res.json()).data?.recipient?.documentId
    if (owner !== user.documentId) return

    await setNotificationRead(documentId)
    revalidatePath(NOTIFICATIONS_PATH)
  } catch (error) {
    console.error('[markNotificationRead] Error:', error)
  }
}

export async function markAllNotificationsRead(): Promise<void> {
  const user = await getCurrentUser()
  if (!user) return

  try {
    const params = new URLSearchParams({
      'fields[0]': 'documentId',
      'filters[read][$eq]': 'false',
      'filters[recipient][documentId][$eq]': user.documentId,
      'pagination[pageSize]': '100',
    })
    const res = await client.fetch(`notifications?${params}`)
    if (!res.ok) return

    const unread: { documentId?: string }[] = (await res.json()).data ?? []
    await Promise.all(
      unread.map((notification) => notification.documentId && setNotificationRead(notification.documentId)),
    )
    revalidatePath(NOTIFICATIONS_PATH)
  } catch (error) {
    console.error('[markAllNotificationsRead] Error:', error)
  }
}
