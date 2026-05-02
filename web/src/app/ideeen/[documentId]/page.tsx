import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import type { Idea, NestedFeature, PopulatedLike, Reaction } from '@/utils/schemas'

import { strapi } from '@/utils/strapi'

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params
  try {
    const res = await strapi.ideas.findOne(documentId)
    return {
      title: res.data.title,
    }
  } catch {
    return {
      title: 'Idee niet gevonden',
    }
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

  return (
    <article>
      <h1>{idea.title}</h1>
      <p>{idea.content}</p>

      <h2>Details</h2>
      <dl>
        <dt>
          <strong>Status</strong>
        </dt>
        <dd>{idea.status ?? 'Onbekend'}</dd>
        {idea.end_users?.[0] && (
          <>
            <dt>
              <strong>Ingediend door</strong>
            </dt>
            <dd>{idea.end_users[0].name}</dd>
          </>
        )}
        <dt>
          <strong>Aangemaakt</strong>
        </dt>
        <dd>{idea.createdAt ? new Date(idea.createdAt).toLocaleDateString('nl-NL') : 'Onbekend'}</dd>
      </dl>

      {idea.features && idea.features.length > 0 && (
        <>
          <h2>Stories</h2>
          <ul>
            {idea.features.map((feature: NestedFeature) => (
              <li key={feature.documentId}>
                <Link href={`/stories/${feature.documentId}`}>{feature.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>Likes ({idea.likes?.length ?? 0})</h2>
      {idea.likes && idea.likes.length > 0 ? (
        <ul>
          {idea.likes.map((like: PopulatedLike) => (
            <li key={like.documentId}>{like.end_user?.name}</li>
          ))}
        </ul>
      ) : (
        <p>Nog geen likes.</p>
      )}

      <h2>Reacties ({idea.reactions?.length ?? 0})</h2>
      {idea.reactions && idea.reactions.length > 0 ? (
        <ul>
          {idea.reactions.map((reaction: Reaction) => (
            <li key={reaction.id}>
              <strong>{reaction.end_user?.name}</strong>: {reaction.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nog geen reacties.</p>
      )}
    </article>
  )
}
