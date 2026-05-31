'use client'

import { addDays } from 'date-fns'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { RoadmapFeature, RoadmapStory, RoadmapViewRange } from './dateUtils'

import { getDays, getDefaultRangeForFeatures, getGranularity, panRange, resolveEndDate, zoomRange } from './dateUtils'
import styles from './Roadmap.module.scss'
import RoadmapSidebar from './RoadmapSidebar'
import RoadmapTimeline from './RoadmapTimeline'

type SelectedItem = { id: number; type: 'feature' } | { id: number; type: 'story' } | null

type RoadmapProps = {
  features: RoadmapFeature[]
  initialRange?: RoadmapViewRange
  onFeatureNavigate?: (feature: RoadmapFeature) => void
  onStoryNavigate?: (story: RoadmapStory) => void
  standaloneStories?: RoadmapStory[]
}

function paddedRange(startDate: Date, endDate: Date, paddingDays: number): RoadmapViewRange {
  return {
    start: addDays(startDate, -paddingDays),
    end: addDays(endDate, paddingDays),
  }
}

const Roadmap = ({
  features,
  initialRange,
  onFeatureNavigate,
  onStoryNavigate,
  standaloneStories = [],
}: RoadmapProps) => {
  const resolvedInitialRange = useRef(initialRange ?? getDefaultRangeForFeatures(features, standaloneStories)).current

  const [range, setRange] = useState<RoadmapViewRange>(resolvedInitialRange)
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)
  const [expandedFeatureIds, setExpandedFeatureIds] = useState<number[]>([])

  const granularity = getGranularity(range)
  const days = getDays(range)

  const rangeRef = useRef(range)
  rangeRef.current = range
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const animateToRange = useCallback((target: RoadmapViewRange) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRange(target)
      return
    }

    const from = rangeRef.current
    const startTime = performance.now()
    const duration = 160

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setRange({
        start: new Date(from.start.getTime() + (target.start.getTime() - from.start.getTime()) * easedProgress),
        end: new Date(from.end.getTime() + (target.end.getTime() - from.end.getTime()) * easedProgress),
      })
      rafRef.current = progress < 1 ? requestAnimationFrame(tick) : null
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const pan = useCallback((daysCount: number) => {
    setRange((previousRange) => panRange(previousRange, daysCount))
  }, [])

  const focusFeature = useCallback(
    (feature: RoadmapFeature) => {
      setSelectedItem({ id: feature.id, type: 'feature' })
      setExpandedFeatureIds([feature.id])
      animateToRange(paddedRange(new Date(feature.startDate), resolveEndDate(feature.endDate, feature.startDate), 3))
    },
    [animateToRange],
  )

  const clearFocus = useCallback(() => {
    setSelectedItem(null)
    setExpandedFeatureIds([])
    animateToRange(resolvedInitialRange)
  }, [animateToRange, resolvedInitialRange])

  const selectFeature = useCallback(
    (feature: RoadmapFeature) => {
      if (selectedItem?.type === 'feature' && selectedItem.id === feature.id) {
        clearFocus()
        return
      }
      focusFeature(feature)
    },
    [clearFocus, focusFeature, selectedItem],
  )

  const selectStory = useCallback(
    (story: RoadmapStory) => {
      if (selectedItem?.type === 'story' && selectedItem.id === story.id) {
        setSelectedItem(null)
        animateToRange(resolvedInitialRange)
        return
      }

      setSelectedItem({ id: story.id, type: 'story' })

      animateToRange(paddedRange(new Date(story.startDate), resolveEndDate(story.endDate, story.startDate), 2))
    },
    [animateToRange, resolvedInitialRange, selectedItem],
  )

  const handleToggleFeature = useCallback(
    (id: number) => {
      if (expandedFeatureIds.includes(id)) {
        setExpandedFeatureIds([])
      } else {
        const feature = features.find((candidate) => candidate.id === id)
        if (feature) focusFeature(feature)
      }
    },
    [expandedFeatureIds, features, focusFeature],
  )

  const setFeaturesExpanded = useCallback((ids: number[], expanded: boolean) => {
    setExpandedFeatureIds((previousIds) => {
      const idSet = new Set(previousIds)
      ids.forEach((id) => (expanded ? idSet.add(id) : idSet.delete(id)))
      return [...idSet]
    })
  }, [])

  const roadmapRef = useRef<HTMLDivElement>(null)

  const handleHeaderHeightChange = useCallback((height: number) => {
    roadmapRef.current?.style.setProperty('--roadmap-header-height', `${height}px`)
  }, [])

  return (
    <div className={styles['roadmap']} ref={roadmapRef}>
      <RoadmapSidebar
        expandedFeatureIds={expandedFeatureIds}
        features={features}
        onFeatureClick={selectFeature}
        onFeatureNavigate={onFeatureNavigate}
        onStoryClick={selectStory}
        onStoryNavigate={onStoryNavigate}
        onToggleFeature={handleToggleFeature}
        selectedId={selectedItem}
        standaloneStories={standaloneStories}
      />
      <div className={styles['roadmap__timeline-wrapper']}>
        <RoadmapTimeline
          days={days}
          expandedFeatureIds={expandedFeatureIds}
          features={features}
          granularity={granularity}
          onFeatureClick={selectFeature}
          onFeatureNavigate={onFeatureNavigate}
          onHeaderHeightChange={handleHeaderHeightChange}
          onPan={pan}
          onStoryClick={selectStory}
          onStoryNavigate={onStoryNavigate}
          onZoom={(factor, pivotDate) => setRange((previousRange) => zoomRange(previousRange, factor, pivotDate))}
          selectedId={selectedItem}
          setFeaturesExpanded={setFeaturesExpanded}
          standaloneStories={standaloneStories}
        />
      </div>
    </div>
  )
}

export default Roadmap
