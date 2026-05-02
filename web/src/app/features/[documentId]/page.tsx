import type { ReactionItem } from '@design-system-community-roadmap/ui'
import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import type { Story } from '@/utils/schemas'

import { getCurrentUser } from '@/app/actions/login'
import FeatureDetail from '@/components/FeatureDetail'
import { strapi } from '@/utils/strapi'

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params
  try {
    const res = await strapi.stories.findOne(documentId)
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

  let story: Story
  try {
    const res = await strapi.stories.findOne(documentId)
    story = res.data
  } catch {
    notFound()
  }

  const currentUser = await getCurrentUser()
  const currentUserDocumentId = currentUser?.documentId

  const isLiked =
    !!currentUserDocumentId && (story.likes?.some((l) => l.end_user?.documentId === currentUserDocumentId) ?? false)

  const reactions: ReactionItem[] = (story.reactions ?? []).map((r) => ({
    author: r.end_user ? { isTeam: r.end_user.isTeam, name: r.end_user.name } : null,
    content: r.content,
    id: r.id,
  }))

  return (
    <FeatureDetail
      content={story.content}
      currentUserDocumentId={currentUserDocumentId}
      endDate={story.endDate}
      isLiked={isLiked}
      reactions={reactions}
      startDate={story.startDate}
      stories={story.features ?? []}
      storyDocumentId={story.documentId}
      title={story.title}
      voteCount={story.likes?.length ?? 0}
    />
  )
}
