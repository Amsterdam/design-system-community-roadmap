import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'

import RegisterPageContent from './RegisterPageContent'

export const metadata: Metadata = {
  title: 'Account aanmaken',
  description: 'Kies een naam en een emoji. Je hebt deze nodig om in te loggen, dus onthoud ze goed!',
}

export default async function AanmeldenPage() {
  const currentUser = await getCurrentUser()
  if (currentUser) redirect('/')

  return <RegisterPageContent />
}
