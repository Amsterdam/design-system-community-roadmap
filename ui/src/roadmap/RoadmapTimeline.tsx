'use client'

import { clsx } from 'clsx'
import { format, isToday } from 'date-fns'
import { nl } from 'date-fns/locale'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { RoadmapFeature, RoadmapGranularity, RoadmapStory } from './dateUtils'

import {
  clampToRange,
  formatDayLabel,
  getDayIndex,
  getMonthBands,
  getYearBands,
  resolveEndDate,
  shouldShowDayLabel,
} from './dateUtils'
import RoadmapItem from './RoadmapItem'
import styles from './RoadmapTimeline.module.scss'

type RoadmapTimelineProps = {
  days: Date[]
  expandedFeatureIds: number[]
  features: RoadmapFeature[]
  granularity: RoadmapGranularity
  onFeatureClick: (feature: RoadmapFeature) => void
  onFeatureNavigate?: (feature: RoadmapFeature) => void
  onHeaderHeightChange: (height: number) => void
  onPan: (daysCount: number) => void
  onStoryClick: (story: RoadmapStory) => void
  onStoryNavigate?: (story: RoadmapStory) => void
  onZoom: (factor: number, pivotDate: Date) => void
  selectedId: { id: number; type: 'feature' | 'story' } | null
  setFeaturesExpanded: (ids: number[], expanded: boolean) => void
  standaloneStories: RoadmapStory[]
}

const RoadmapTimeline = ({
  days,
  expandedFeatureIds,
  features,
  granularity,
  onFeatureClick,
  onFeatureNavigate,
  onHeaderHeightChange,
  onPan,
  onStoryClick,
  onStoryNavigate,
  onZoom,
  selectedId,
  setFeaturesExpanded,
  standaloneStories,
}: RoadmapTimelineProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const dayCount = days.length
  const columnWidthPixels = containerWidth > 0 && dayCount > 0 ? containerWidth / dayCount : 0
  const columnWidth = columnWidthPixels > 0 ? `${columnWidthPixels}px` : '1px'

  // Refs for wheel/drag to avoid stale closures in listeners
  const daysRef = useRef(days)
  const onZoomRef = useRef(onZoom)
  const onPanRef = useRef(onPan)
  const colWidthPxRef = useRef(columnWidthPixels)

  daysRef.current = days
  onZoomRef.current = onZoom
  onPanRef.current = onPan
  colWidthPxRef.current = columnWidthPixels

  const prevGranularityRef = useRef(granularity)

  // Expand/collapse features when zooming crosses day/week threshold
  useEffect(() => {
    const shouldBeExpanded = granularity === 'day' || granularity === 'week'
    const wasExpanded = prevGranularityRef.current === 'day' || prevGranularityRef.current === 'week'

    if (shouldBeExpanded !== wasExpanded && selectedId?.type !== 'feature') {
      setFeaturesExpanded(
        features.map((feature) => feature.id),
        shouldBeExpanded,
      )
    }
    prevGranularityRef.current = granularity
  }, [granularity, features, selectedId, setFeaturesExpanded])

  // Native wheel listener for non-passive zooming and horizontal panning
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return undefined

    let accumulatedDeltaX = 0

    const handleWheelNative = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const factor = e.deltaY > 0 ? 1.05 : 0.95
        const rect = el.getBoundingClientRect()
        if (colWidthPxRef.current === 0) return

        const offsetX = e.clientX - rect.left
        const hoveredIndex = Math.floor(offsetX / colWidthPxRef.current)
        const pivot = daysRef.current[Math.max(0, Math.min(hoveredIndex, daysRef.current.length - 1))]
        onZoomRef.current(factor, pivot)
      } else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        accumulatedDeltaX += e.deltaX
        const threshold = colWidthPxRef.current || 20
        if (Math.abs(accumulatedDeltaX) >= threshold) {
          const daysToPan = Math.round(accumulatedDeltaX / threshold)
          onPanRef.current(daysToPan)
          accumulatedDeltaX -= daysToPan * threshold
        }
      }
    }

    el.addEventListener('wheel', handleWheelNative, { passive: false })
    return () => el.removeEventListener('wheel', handleWheelNative)
  }, [])

  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const accumulatedDragXRef = useRef(0)

  // Mouse move handler for click-and-drag horizontal panning
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      const deltaX = e.clientX - lastXRef.current
      lastXRef.current = e.clientX
      accumulatedDragXRef.current -= deltaX

      const threshold = colWidthPxRef.current || 20
      if (Math.abs(accumulatedDragXRef.current) >= threshold) {
        const daysToPan = Math.round(accumulatedDragXRef.current / threshold)
        onPan(daysToPan)
        accumulatedDragXRef.current -= daysToPan * threshold
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      document.body.style.cursor = ''
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [onPan])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    if ((e.target as Element).closest('button, a')) return
    isDraggingRef.current = true
    lastXRef.current = e.clientX
    accumulatedDragXRef.current = 0
    document.body.style.cursor = 'grabbing'
  }

  // Update container width for grid calculation
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return undefined
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width))
    observer.observe(el)
    setContainerWidth(el.getBoundingClientRect().width)
    return () => observer.disconnect()
  }, [])

  // Inform parent of sticky header height for sidebar alignment
  useEffect(() => {
    const el = headerRef.current
    if (!el) return undefined
    const observer = new ResizeObserver(([entry]) => onHeaderHeightChange(entry.contentRect.height))
    observer.observe(el)
    onHeaderHeightChange(el.getBoundingClientRect().height)
    return () => observer.disconnect()
  }, [onHeaderHeightChange])

  const todayIndex = useMemo(() => {
    const index = days.findIndex((day) => isToday(day))
    return index >= 0 ? index : null
  }, [days])

  const timelineBands = granularity === 'month' || granularity === 'year' ? getYearBands(days) : getMonthBands(days)
  const rangeStart = days[0]

  const getColStart = (dateStr: string) => clampToRange(getDayIndex(new Date(dateStr), rangeStart), dayCount)
  const getColEnd = (dateStr: string | null, startStr: string) => {
    return clampToRange(getDayIndex(resolveEndDate(dateStr, startStr), rangeStart) + 1, dayCount)
  }

  const majorLineIndexes = useMemo(
    () => days.flatMap((day, index) => (shouldShowDayLabel(granularity, day) ? [index] : [])),
    [days, granularity],
  )

  return (
    <section
      aria-label="Tijdlijn Roadmap"
      className={styles['wrapper']}
      onMouseDown={handleMouseDown}
      ref={wrapperRef}
      style={
        {
          '--roadmap-col-width': columnWidth,
          '--roadmap-day-count': dayCount,
          cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        } as React.CSSProperties
      }
    >
      <header className={styles['timeline__header']} ref={headerRef}>
        <div className={styles['timeline__bands']}>
          {timelineBands.map((band) => (
            <div
              className={styles['timeline__band']}
              key={band.label}
              style={{ gridColumnEnd: band.end, gridColumnStart: band.start }}
            >
              <span className={styles['timeline__band-label']}>{band.label}</span>
            </div>
          ))}
        </div>

        <div className={styles['timeline__day-labels']}>
          {days.map((day, index) => {
            const label = formatDayLabel(day, granularity)
            const isDayToday = isToday(day)
            const show = (columnWidthPixels >= 2 || granularity === 'year') && shouldShowDayLabel(granularity, day)
            const isMajor = majorLineIndexes.includes(index)

            if (!show && !isMajor) return null

            return (
              <div
                className={clsx(
                  styles['timeline__day-label'],
                  isDayToday && styles['timeline__day-label--today'],
                  !show && styles['timeline__day-label--hidden'],
                )}
                key={day.toISOString()}
                style={{ gridColumnStart: index + 1 }}
              >
                {granularity === 'day' ? (
                  <>
                    <span className={styles['timeline__day-name']}>
                      <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'EEE', { locale: nl })}</time>
                    </span>
                    <span className={styles['timeline__day-num']}>{format(day, 'd')}</span>
                  </>
                ) : (
                  <span className={styles['timeline__label-text']}>
                    <time dateTime={format(day, 'yyyy-MM-dd')}>{label}</time>
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </header>

      <div aria-readonly="true" className={styles['timeline__body']} role="grid">
        <div aria-hidden="true" className={styles['timeline__grid-lines']}>
          {majorLineIndexes.map((index) => (
            <div className={styles['timeline__grid-line']} key={index} style={{ gridColumnStart: index + 1 }} />
          ))}
        </div>

        {todayIndex !== null && (
          <div
            aria-hidden="true"
            className={styles['timeline__today-line']}
            style={{ '--today-col-index': todayIndex } as React.CSSProperties}
          />
        )}

        {features.map((feature) => {
          const isExpanded = expandedFeatureIds.includes(feature.id)
          const isSelected = selectedId?.type === 'feature' && selectedId.id === feature.id
          const isDimmed = selectedId?.type === 'feature' && selectedId.id !== feature.id

          return (
            <div className={styles['timeline__feature-group']} key={feature.id} role="rowgroup">
              <div className={clsx(styles['timeline__row'], styles['timeline__row--feature'])} role="row">
                <RoadmapItem
                  columnEnd={getColEnd(feature.endDate, feature.startDate)}
                  columnStart={getColStart(feature.startDate)}
                  endDate={feature.endDate}
                  isDimmed={isDimmed}
                  isSelected={isSelected}
                  onClick={() => onFeatureClick(feature)}
                  onOpenDetail={onFeatureNavigate ? () => onFeatureNavigate(feature) : undefined}
                  openDetailHref={`/features/${feature.documentId}`}
                  openDetailLabel={`Bekijk feature: ${feature.title}`}
                  startDate={feature.startDate}
                  title={feature.title}
                  variant="feature"
                />
              </div>

              {isExpanded &&
                (feature.stories || []).map((story) => {
                  const isStorySelected = selectedId?.type === 'story' && selectedId.id === story.id
                  return (
                    <div
                      className={clsx(styles['timeline__row'], styles['timeline__row--story'])}
                      key={story.id}
                      role="row"
                    >
                      <RoadmapItem
                        columnEnd={getColEnd(story.endDate, story.startDate)}
                        columnStart={getColStart(story.startDate)}
                        endDate={story.endDate}
                        isSelected={isStorySelected}
                        onClick={() => onStoryClick(story)}
                        onOpenDetail={onStoryNavigate ? () => onStoryNavigate(story) : undefined}
                        openDetailHref={`/stories/${story.documentId}`}
                        openDetailLabel={`Bekijk story: ${story.title}`}
                        startDate={story.startDate}
                        title={story.title}
                        variant="story"
                      />
                    </div>
                  )
                })}
            </div>
          )
        })}

        {standaloneStories.map((story) => {
          const isStorySelected = selectedId?.type === 'story' && selectedId.id === story.id
          return (
            <div className={clsx(styles['timeline__row'], styles['timeline__row--story'])} key={story.id} role="row">
              <RoadmapItem
                columnEnd={getColEnd(story.endDate, story.startDate)}
                columnStart={getColStart(story.startDate)}
                endDate={story.endDate}
                isSelected={isStorySelected}
                onClick={() => onStoryClick(story)}
                onOpenDetail={onStoryNavigate ? () => onStoryNavigate(story) : undefined}
                openDetailHref={`/stories/${story.documentId}`}
                openDetailLabel={`Bekijk story: ${story.title}`}
                startDate={story.startDate}
                title={story.title}
                variant="story"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RoadmapTimeline
