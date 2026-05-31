import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'

import LoginPageContent from './LoginPageContent'

export const metadata: Metadata = {
  title: 'Inloggen',
  description: 'Log in met je naam en de emoji die je bij het aanmaken van je account hebt gekozen.',
}

export default async function InloggenPage() {
  const currentUser = await getCurrentUser()
  if (currentUser) redirect('/')

  return <LoginPageContent />
}
