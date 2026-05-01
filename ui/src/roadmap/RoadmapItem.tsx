'use client'

import { clsx } from 'clsx'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

import styles from './RoadmapItem.module.scss'

type RoadmapItemProps = {
  columnEnd: number
  columnStart: number
  endDate: string | null
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

  return (
    <button
      aria-label={accessibleLabel}
      aria-pressed={isSelected}
      className={clsx(
        styles['item'],
        variant === 'feature' ? styles['item--feature'] : styles['item--story'],
        isSelected && styles['item--selected'],
      )}
      onClick={onClick}
      style={{ gridColumn: `${columnStart} / ${columnEnd}` }}
      type="button"
    >
      <span aria-hidden="true" className={styles['item__title']}>
        {title}
      </span>
    </button>
  )
}

export default RoadmapItem
