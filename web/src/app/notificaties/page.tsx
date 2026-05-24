import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'
import { getNotifications } from '@/app/actions/notifications'

import NotificationsClient from './NotificationsClient'

export const metadata: Metadata = {
  title: 'Meldingen',
}

export default async function NotificationsPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/inloggen')

  const notifications = await getNotifications()
  return <NotificationsClient notifications={notifications} />
}
