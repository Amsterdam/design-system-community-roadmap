import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'

import ShareIdeaForm from './ShareIdeaForm'

export const metadata: Metadata = {
  title: 'Idee delen',
  description: 'Deel jouw idee voor het Amsterdam Design System met de community.',
}

export default async function ShareIdeaPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/inloggen')

  return <ShareIdeaForm />
}
