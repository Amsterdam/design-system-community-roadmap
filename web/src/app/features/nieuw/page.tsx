import type { Metadata } from 'next'

import { notFound, redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'

import FeatureForm from './FeatureForm'

export const metadata: Metadata = {
  title: 'Nieuwe feature',
}

export default async function NewFeaturePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/inloggen')
  if (!user.isTeam) notFound()

  return <FeatureForm />
}
