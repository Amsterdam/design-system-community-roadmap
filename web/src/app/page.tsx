import type { Metadata } from 'next'

import { getCurrentUser } from '@/app/actions/login'
import IdeaGrid from '@/components/IdeaGrid'
import { strapi } from '@/utils/strapi'

export const metadata: Metadata = {
  title: 'Ideeën',
  description: 'Deel ideeën voor het Amsterdam Design System en stem op de voorstellen van anderen.',
}

export default async function Home({ searchParams }: { searchParams: Promise<{ pagina?: string }> }) {
  const [{ data: ideas }, currentUser, { pagina }] = await Promise.all([
    strapi.ideas.findMany({ cache: 'no-store' }),
    getCurrentUser(),
    searchParams,
  ])

  const currentPage = Math.max(1, Number(pagina) || 1)

  return <IdeaGrid currentPage={currentPage} currentUserDocumentId={currentUser?.documentId} ideas={ideas} />
}
