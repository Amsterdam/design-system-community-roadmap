import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'

import RegisterPageContent from './RegisterPageContent'

export default async function AanmeldenPage() {
  const currentUser = await getCurrentUser()
  if (currentUser) redirect('/')

  return <RegisterPageContent />
}
