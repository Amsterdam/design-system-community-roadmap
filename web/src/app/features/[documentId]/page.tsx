import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import type { NestedFeature, PopulatedLike, Reaction, Story } from '@/utils/schemas'

import { strapi } from '@/utils/strapi'

type Props = {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params
  try {
    const res = await strapi.stories.findOne(documentId)
    return {
      title: res.data.title,
    }
  } catch {
    return {
      title: 'Feature niet gevonden',
    }
  }
}

export default async function FeaturePage({ params }: Props) {
  const { documentId } = await params

  let story: Story
  try {
    const res = await strapi.stories.findOne(documentId)
    story = res.data
  } catch {
    notFound()
  }

  return (
    <article>
      <h1>{story.title}</h1>
      <p>{story.content}</p>

      <h2>Details</h2>
      <dl>
        <dt>
          <strong>Startdatum</strong>
        </dt>
        <dd>{story.startDate ? new Date(story.startDate).toLocaleDateString('nl-NL') : 'Onbekend'}</dd>
        {story.endDate && (
          <>
            <dt>
              <strong>Einddatum</strong>
            </dt>
            <dd>{new Date(story.endDate).toLocaleDateString('nl-NL')}</dd>
          </>
        )}
      </dl>

      {story.features && story.features.length > 0 && (
        <>
          <h2>Stories</h2>
          <ul>
            {story.features.map((f: NestedFeature) => (
              <li key={f.documentId}>
                <Link href={`/stories/${f.documentId}`}>{f.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>Likes ({story.likes?.length ?? 0})</h2>
      {story.likes && story.likes.length > 0 ? (
        <ul>
          {story.likes.map((like: PopulatedLike) => (
            <li key={like.documentId}>{like.end_user?.name}</li>
          ))}
        </ul>
      ) : (
        <p>Nog geen likes.</p>
      )}

      <h2>Reacties ({story.reactions?.length ?? 0})</h2>
      {story.reactions && story.reactions.length > 0 ? (
        <ul>
          {story.reactions.map((reaction: Reaction) => (
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
