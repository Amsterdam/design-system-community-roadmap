'use client'

import { clsx } from 'clsx'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

import styles from './RoadmapItem.module.scss'

type RoadmapItemProps = {
  columnEnd: number
  columnStart: number
  endDate: string | null
  href?: string
  isDimmed?: boolean
  isSelected?: boolean
  onClick?: () => void
  startDate: string
  title: string
  variant: 'feature' | 'story'
}

const RoadmapItem = ({
  title,
  columnEnd,
  columnStart,
  endDate,
  href,
  isDimmed,
  isSelected,
  onClick,
  startDate,
  variant,
}: RoadmapItemProps) => {
  if (columnEnd <= columnStart) {
    return null
  }

  const formattedStartDate = format(new Date(startDate), 'd MMMM yyyy', { locale: nl })
  const formattedEndDate = endDate ? format(new Date(endDate), 'd MMMM yyyy', { locale: nl }) : 'Onbekend'

  const accessibleLabel = `${variant === 'feature' ? 'Feature' : 'Story'}: ${title}. Van ${formattedStartDate} tot ${formattedEndDate}.`

  const sharedProps = {
    'aria-label': accessibleLabel,
    className: clsx(
      styles['item'],
      variant === 'feature' ? styles['item--feature'] : styles['item--story'],
      isSelected && styles['item--selected'],
      isDimmed && styles['item--dimmed'],
    ),
    style: { gridColumn: `${columnStart} / ${columnEnd}` },
  }

  const inner = (
    <span aria-hidden="true" className={styles['item__title']}>
      {title}
    </span>
  )

  if (href) {
    return (
      <a {...sharedProps} href={href}>
        {inner}
      </a>
    )
  }

  return (
    <button {...sharedProps} aria-pressed={isSelected} onClick={onClick} type="button">
      {inner}
    </button>
  )
}

export default RoadmapItem
