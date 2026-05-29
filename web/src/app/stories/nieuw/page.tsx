import type { Metadata } from 'next'

import { notFound, redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'
import { strapi } from '@/utils/strapi'

import StoryForm from './StoryForm'

export const metadata: Metadata = {
  title: 'Nieuwe story',
}

type Props = {
  searchParams: Promise<{ feature?: string }>
}

export default async function NewStoryPage({ searchParams }: Props) {
  const user = await getCurrentUser()
  if (!user) redirect('/inloggen')
  if (!user.isTeam) notFound()

  const { feature: preselectedFeatureDocumentId } = await searchParams

  const { data: allFeatures } = await strapi.features.findManyForSelect()
  const features = allFeatures
    .map((feature) => ({
      title: feature.title,
      documentId: feature.documentId,
      startDate: feature.startDate,
    }))
    .sort((featureA, featureB) => {
      if (!featureA.startDate && !featureB.startDate) return 0
      if (!featureA.startDate) return 1
      if (!featureB.startDate) return -1
      return new Date(featureA.startDate).getTime() - new Date(featureB.startDate).getTime()
    })

  return <StoryForm features={features} preselectedFeatureDocumentId={preselectedFeatureDocumentId} />
}
