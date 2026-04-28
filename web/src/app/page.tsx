import { strapi } from '@/utils/strapi'

export default async function Home() {
  const { data: ideas } = await strapi.ideas.findMany()

  return (
    <main>
      {ideas.map((idea) => (
        <span key={idea.id}>{idea.content}</span>
      ))}
    </main>
  )
}
