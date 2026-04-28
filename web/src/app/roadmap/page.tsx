import { strapi } from '../../utils/strapi'

const Page = async () => {
  const { data: features } = await strapi.features.findMany()

  return (
    <main>
      {features.map((feature) => (
        <span key={feature.id}>{feature.content}</span>
      ))}
    </main>
  )
}

export default Page
