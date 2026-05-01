'use client'

import { Card as AmsCard, Paragraph } from '@amsterdam/design-system-react'
import { clsx } from 'clsx'

import LikeButton from '../like-button/LikeButton'
import styles from './Card.module.scss'

type CardVariant = 'big' | 'small'

type CardProps = {
  description: string
  href?: string
  isLiked?: boolean
  onLike?: (isLiked: boolean) => void
  title: string
  variant?: CardVariant
  voteCount: number
}

const Card = ({ title, description, href, isLiked, onLike, variant = 'big', voteCount }: CardProps) => {
  const isBig = variant === 'big'

  return (
    <AmsCard className={clsx(styles['card'], isBig ? styles['cardBig'] : styles['cardSmall'])}>
      <AmsCard.Heading level={3} size={isBig ? 'level-3' : 'level-4'}>
        {href ? <AmsCard.Link href={href}>{title}</AmsCard.Link> : title}
      </AmsCard.Heading>
      <Paragraph className={styles['description']} size="small">
        {description}
      </Paragraph>
      <div className={styles['footer']}>
        <LikeButton count={voteCount} isLiked={isLiked} onToggle={onLike} size={isBig ? 'default' : 'small'} />
      </div>
    </AmsCard>
  )
}

export default Card
