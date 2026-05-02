import { getCurrentUser } from '@/app/actions/login'
import IdeaGrid from '@/components/IdeaGrid'
import { strapi } from '@/utils/strapi'

export default async function Home() {
  const [{ data: ideas }, currentUser] = await Promise.all([
    strapi.ideas.findMany({ cache: 'no-store' }),
    getCurrentUser(),
  ])

  return <IdeaGrid currentUserDocumentId={currentUser?.documentId} ideas={ideas} />
}
