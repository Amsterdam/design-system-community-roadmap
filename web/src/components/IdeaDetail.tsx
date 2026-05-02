'use client'

import type { ReactionItem } from '@design-system-community-roadmap/ui'

import { Column, Grid, Heading, Link, Paragraph } from '@amsterdam/design-system-react'
import { Reactions } from '@design-system-community-roadmap/ui'

import AddReaction from './AddReaction'
import styles from './IdeaDetail.module.scss'
import IdeaLikeButton from './IdeaLikeButton'

const statusLabels: Record<string, string> = {
  accepted: 'Geaccepteerd',
  in_review: 'Ter beoordeling',
  postponed: 'Uitgesteld',
}

type Feature = {
  documentId: string
  title: string
}

export type IdeaDetailProps = {
  authorName?: string
  content: string
  createdAt?: string
  currentUserDocumentId?: string
  features: Feature[]
  ideaDocumentId: string
  isLiked: boolean
  reactions: ReactionItem[]
  status?: string
  title: string
  voteCount: number
}

export default function IdeaDetail({
  title,
  authorName,
  content,
  createdAt,
  currentUserDocumentId,
  features,
  ideaDocumentId,
  isLiked,
  reactions,
  status,
  voteCount,
}: IdeaDetailProps) {
  const teamReaction = reactions.find((r) => r.author?.isTeam)
  const feedReactions = teamReaction ? reactions.filter((r) => r.id !== teamReaction.id) : reactions

  return (
    <Grid gapVertical="large">
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 7 }}>
        <Heading level={1} size="level-2">
          {title}
        </Heading>
        <Paragraph>{content}</Paragraph>
      </Grid.Cell>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 5 }}>
        <Column gap="large">
          {teamReaction && <Reactions reactions={[teamReaction]} />}
          {features.length > 0 && (
            <div>
              <Heading level={2} size="level-4">
                Stories
              </Heading>
              <ul className={styles['idea-detail__list']}>
                {features.map((feature) => (
                  <li key={feature.documentId}>
                    <Link href={`/stories/${feature.documentId}`}>{feature.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <Heading level={2} size="level-4">
              Details
            </Heading>
            <dl className={styles['idea-detail__details']}>
              <dt>
                <strong>Status</strong>
              </dt>
              <dd>{status ? (statusLabels[status] ?? status) : 'Onbekend'}</dd>
              {authorName && (
                <>
                  <dt>
                    <strong>Ingediend door</strong>
                  </dt>
                  <dd>{authorName}</dd>
                </>
              )}
              <dt>
                <strong>Aangemaakt</strong>
              </dt>
              <dd>{createdAt ? new Date(createdAt).toLocaleDateString('nl-NL') : 'Onbekend'}</dd>
            </dl>
          </div>
          <div className={styles['idea-detail__like']}>
            <IdeaLikeButton
              currentUserDocumentId={currentUserDocumentId}
              ideaDocumentId={ideaDocumentId}
              isLiked={isLiked}
              size="large"
              voteCount={voteCount}
            />
          </div>
        </Column>
      </Grid.Cell>
      <Grid.Cell span="all">
        <Heading level={2}>Reacties</Heading>
        <Reactions compact reactions={feedReactions} />
        <AddReaction currentUserDocumentId={currentUserDocumentId} ideaDocumentId={ideaDocumentId} />
      </Grid.Cell>
    </Grid>
  )
}
