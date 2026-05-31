import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/login'
import { client } from '@/utils/fetch'
import { IdeaSchema, strapiCollection } from '@/utils/schemas'

import ProfielContent from './ProfielContent'

export const metadata: Metadata = {
  title: 'Mijn profiel',
  description: 'Bekijk je profiel en de ideeën die je hebt ingediend.',
}

async function fetchIdeasForUser(userDocumentId: string) {
  const params = new URLSearchParams({
    'filters[end_users][documentId][$eq]': userDocumentId,
    'pagination[pageSize]': '100',
    'sort[0]': 'createdAt:desc',
  })
  const res = await client.fetch(`ideas?${params}`, { cache: 'no-store' })
  if (!res.ok) return []
  const parsed = strapiCollection(IdeaSchema).safeParse(await res.json())
  if (!parsed.success) {
    console.error('[profiel] Failed to parse ideas', parsed.error)
    return []
  }
  return parsed.data.data
}

export default async function ProfielPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/inloggen')

  const ideas = await fetchIdeasForUser(user.documentId)
  const myIdeas = ideas.map((idea) => ({ title: idea.title, documentId: idea.documentId }))

  return <ProfielContent ideas={myIdeas} user={{ name: user.name }} />
}
