import type { ReactionItem } from '@design-system-community-roadmap/ui'
import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import type { Feature } from '@/utils/schemas'

import { getCurrentUser } from '@/app/actions/login'
import FeatureDetail from '@/components/FeatureDetail'
import { strapi } from '@/utils/strapi'

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params
  try {
    const res = await strapi.features.findOne(documentId)
    return {
      title: res.data.title,
    }
  } catch {
    return {
      title: 'Feature niet gevonden',
    }
  }
}

export default async function FeaturePage({ params }: Props) {
  const { documentId } = await params

  let feature: Feature
  try {
    const res = await strapi.features.findOne(documentId)
    feature = res.data
  } catch {
    notFound()
  }

  const currentUser = await getCurrentUser()
  const currentUserDocumentId = currentUser?.documentId

  const isLiked =
    !!currentUserDocumentId && (feature.likes?.some((l) => l.end_user?.documentId === currentUserDocumentId) ?? false)

  const reactions: ReactionItem[] = (feature.reactions ?? []).map((r) => ({
    author: r.end_user ? { isTeam: r.end_user.isTeam, name: r.end_user.name } : null,
    content: r.content,
    id: r.id,
  }))

  return (
    <FeatureDetail
      content={feature.content}
      currentUserDocumentId={currentUserDocumentId}
      endDate={feature.endDate}
      featureDocumentId={feature.documentId}
      images={feature.images}
      isLiked={isLiked}
      reactions={reactions}
      startDate={feature.startDate}
      stories={feature.story ? [feature.story] : []}
      title={feature.title}
      voteCount={feature.likes?.length ?? 0}
    />
  )
}
