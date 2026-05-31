'use client'

import { Card as AmsCard, Paragraph } from '@amsterdam/design-system-react'

import LikeButton from '../like-button/LikeButton'
import styles from './Card.module.scss'

type CardProps = {
  author?: {
    name: string
  }
  description: string
  href?: string
  isLiked?: boolean
  onLike?: (isLiked: boolean) => void
  readOnly?: boolean
  title: string
  voteCount: number
}

const Card = ({ title, author, description, href, isLiked, onLike, readOnly, voteCount }: CardProps) => (
  <AmsCard className={styles['card']}>
    {author ? (
      <AmsCard.HeadingGroup tagline={`Idee van ${author.name}`}>
        <AmsCard.Heading level={2}>{href ? <AmsCard.Link href={href}>{title}</AmsCard.Link> : title}</AmsCard.Heading>
      </AmsCard.HeadingGroup>
    ) : (
      <AmsCard.Heading level={2}>{href ? <AmsCard.Link href={href}>{title}</AmsCard.Link> : title}</AmsCard.Heading>
    )}
    <Paragraph className={styles['card__description']} size="small">
      {description}
    </Paragraph>
    <div className={styles['card__footer']}>
      <LikeButton count={voteCount} isLiked={isLiked} onToggle={onLike} readOnly={readOnly} />
    </div>
  </AmsCard>
)

export default Card
