import type { ReactionItem } from '@design-system-community-roadmap/ui'
import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import type { Idea } from '@/utils/schemas'

import { getCurrentUser } from '@/app/actions/login'
import IdeaDetail from '@/components/IdeaDetail'
import { strapi } from '@/utils/strapi'

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params
  try {
    const res = await strapi.ideas.findOne(documentId)
    return { title: res.data.title }
  } catch {
    return { title: 'Idee niet gevonden' }
  }
}

export default async function IdeePage({ params }: Props) {
  const { documentId } = await params

  let idea: Idea
  try {
    const res = await strapi.ideas.findOne(documentId)
    idea = res.data
  } catch {
    notFound()
  }

  const currentUser = await getCurrentUser()
  const currentUserDocumentId = currentUser?.documentId
  const currentUserIsTeam = currentUser?.isTeam ?? false

  const isLiked =
    !!currentUserDocumentId && (idea.likes?.some((l) => l.end_user?.documentId === currentUserDocumentId) ?? false)

  const reactions: ReactionItem[] = (idea.reactions ?? []).map((r) => ({
    author: r.end_user ? { isTeam: r.end_user.isTeam, name: r.end_user.name } : null,
    content: r.content,
    id: r.id,
  }))

  return (
    <IdeaDetail
      authorName={idea.end_users?.[0]?.name}
      content={idea.content}
      createdAt={idea.createdAt}
      currentUserDocumentId={currentUserDocumentId}
      currentUserIsTeam={currentUserIsTeam}
      features={idea.features ?? []}
      ideaDocumentId={idea.documentId}
      images={idea.images}
      isLiked={isLiked}
      reactions={reactions}
      status={idea.statusIdea}
      title={idea.title}
      voteCount={idea.likes?.length ?? 0}
    />
  )
}
