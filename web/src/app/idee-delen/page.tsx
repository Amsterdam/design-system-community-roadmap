import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'

import ShareIdeaForm from './ShareIdeaForm'

export default async function ShareIdeaPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/inloggen')

  return <ShareIdeaForm />
}
