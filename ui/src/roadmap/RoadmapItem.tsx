'use client'

import { StandaloneLink } from '@amsterdam/design-system-react'
import { DocumentIcon } from '@amsterdam/design-system-react-icons'
import { clsx } from 'clsx'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

import styles from './RoadmapItem.module.scss'

type RoadmapItemProps = {
  columnEnd: number
  columnStart: number
  endDate: string | null
  isDimmed?: boolean
  isSelected?: boolean
  onClick?: () => void
  onOpenDetail?: () => void
  openDetailHref?: string
  openDetailLabel?: string
  startDate: string
  title: string
  variant: 'feature' | 'story'
}

const RoadmapItem = ({
  title,
  columnEnd,
  columnStart,
  endDate,
  isDimmed,
  isSelected,
  onClick,
  onOpenDetail,
  openDetailHref,
  openDetailLabel,
  startDate,
  variant,
}: RoadmapItemProps) => {
  if (columnEnd <= columnStart) {
    return null
  }

  const formattedStartDate = format(new Date(startDate), 'd MMMM yyyy', { locale: nl })
  const formattedEndDate = endDate ? format(new Date(endDate), 'd MMMM yyyy', { locale: nl }) : 'Onbekend'

  const variantLabel = variant === 'feature' ? 'Feature' : 'Story'
  const accessibleLabel = `${variantLabel}: ${title}. Van ${formattedStartDate} tot ${formattedEndDate}.`

  return (
    <div
      className={clsx(
        styles['item'],
        variant === 'feature' ? styles['item--feature'] : styles['item--story'],
        isSelected && styles['item--selected'],
        isDimmed && styles['item--dimmed'],
      )}
      style={{ gridColumn: `${columnStart} / ${columnEnd}` }}
    >
      <button
        aria-label={accessibleLabel}
        aria-pressed={isSelected}
        className={styles['item__focus']}
        onClick={onClick}
        title={`Zoom in op ${title}`}
        type="button"
      >
        <span aria-hidden="true" className={styles['item__title']}>
          {title}
        </span>
      </button>

      {isSelected && openDetailHref && (
        <StandaloneLink
          aria-label={openDetailLabel}
          className={styles['item__open']}
          color="inverse"
          href={openDetailHref}
          icon={DocumentIcon}
          onClick={
            onOpenDetail
              ? (event) => {
                  event.preventDefault()
                  onOpenDetail()
                }
              : undefined
          }
        >
          Bekijk
        </StandaloneLink>
      )}
    </div>
  )
}

export default RoadmapItem
