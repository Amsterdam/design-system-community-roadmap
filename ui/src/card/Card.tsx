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
  title: string
  voteCount: number
}

const Card = ({ title, author, description, href, isLiked, onLike, voteCount }: CardProps) => (
  <AmsCard className={styles['card']}>
    <AmsCard.Heading level={2} size="level-3">
      {href ? <AmsCard.Link href={href}>{title}</AmsCard.Link> : title}
    </AmsCard.Heading>
    <Paragraph className={styles['card__description']} size="small">
      {description}
    </Paragraph>
    <div className={styles['card__footer']}>
      {author && (
        <Paragraph className={styles['card__author']} size="small">
          Idee van {author.name}
        </Paragraph>
      )}
      <LikeButton count={voteCount} isLiked={isLiked} onToggle={onLike} size="default" />
    </div>
  </AmsCard>
)

export default Card
