import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'

import LoginPageContent from './LoginPageContent'

export default async function InloggenPage() {
  const currentUser = await getCurrentUser()
  if (currentUser) redirect('/')

  return <LoginPageContent />
}
