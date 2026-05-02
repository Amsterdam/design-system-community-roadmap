import { getCurrentUser } from '@/app/actions/login'
import IdeaGrid from '@/components/IdeaGrid'
import { strapi } from '@/utils/strapi'

export default async function Home() {
  const [{ data: ideas }] = await Promise.all([strapi.ideas.findMany({ cache: 'no-store' }), getCurrentUser()])

  return <IdeaGrid ideas={ideas} />
}
