import IdeaGrid from '@/components/IdeaGrid'
import { strapi } from '@/utils/strapi'

export default async function Home() {
  const { data: ideas } = await strapi.ideas.findMany({ cache: 'no-store' })
  return <IdeaGrid ideas={ideas} />
}
