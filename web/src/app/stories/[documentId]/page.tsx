import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import type { Feature, PopulatedLike, Reaction } from '@/utils/schemas'

import { strapi } from '@/utils/strapi'

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params
  try {
    const res = await strapi.features.findOne(documentId)
    return {
      title: res.data.title,
    }
  } catch {
    return {
      title: 'Story niet gevonden',
    }
  }
}

export default async function StoryPage({ params }: Props) {
  const { documentId } = await params

  let feature: Feature
  try {
    const res = await strapi.features.findOne(documentId)
    feature = res.data
  } catch {
    notFound()
  }

  return (
    <article>
      <h1>{feature.title}</h1>
      <p>{feature.content}</p>

      <h2>Details</h2>
      <dl>
        <dt>
          <strong>Startdatum</strong>
        </dt>
        <dd>{feature.startDate ? new Date(feature.startDate).toLocaleDateString('nl-NL') : 'Onbekend'}</dd>
        {feature.endDate && (
          <>
            <dt>
              <strong>Einddatum</strong>
            </dt>
            <dd>{new Date(feature.endDate).toLocaleDateString('nl-NL')}</dd>
          </>
        )}
      </dl>

      {feature.story && (
        <>
          <h2>Parent Feature</h2>
          <p>
            <Link href={`/features/${feature.story.documentId}`}>{feature.story.title}</Link>
          </p>
        </>
      )}

      <h2>Likes ({feature.likes?.length ?? 0})</h2>
      {feature.likes && feature.likes.length > 0 ? (
        <ul>
          {feature.likes.map((like: PopulatedLike) => (
            <li key={like.documentId}>{like.end_user?.name}</li>
          ))}
        </ul>
      ) : (
        <p>Nog geen likes.</p>
      )}

      <h2>Reacties ({feature.reactions?.length ?? 0})</h2>
      {feature.reactions && feature.reactions.length > 0 ? (
        <ul>
          {feature.reactions.map((reaction: Reaction) => (
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
