'use client'

import { useCallback, useRef, useState } from 'react'

import type { RoadmapFeature, RoadmapStory, RoadmapViewRange } from './dateUtils'

import { getDays, getDefaultRangeForFeatures, getGranularity, panRange, zoomRange } from './dateUtils'
import styles from './Roadmap.module.scss'
import RoadmapSidebar from './RoadmapSidebar'
import RoadmapTimeline from './RoadmapTimeline'

type SelectedItem = { id: number; type: 'feature' } | { id: number; type: 'story' } | null

type RoadmapProps = {
  features: RoadmapFeature[]
  initialRange?: RoadmapViewRange
  onStoryNavigate?: (story: RoadmapStory) => void
  standaloneStories?: RoadmapStory[]
}

const Roadmap = ({ features, initialRange, onStoryNavigate, standaloneStories = [] }: RoadmapProps) => {
  const resolvedInitialRange = useRef(initialRange ?? getDefaultRangeForFeatures(features, standaloneStories)).current

  const [range, setRange] = useState<RoadmapViewRange>(resolvedInitialRange)
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)
  const [expandedFeatureIds, setExpandedFeatureIds] = useState<number[]>([])

  const granularity = getGranularity(range)
  const days = getDays(range)

  const zoom = useCallback((factor: number, pivotDate: Date) => {
    setRange((previousRange) => zoomRange(previousRange, factor, pivotDate))
  }, [])

  const pan = useCallback((daysCount: number) => {
    setRange((previousRange) => panRange(previousRange, daysCount))
  }, [])

  const selectFeature = useCallback(
    (feature: RoadmapFeature) => {
      const isDeselecting = selectedItem?.type === 'feature' && selectedItem.id === feature.id

      if (isDeselecting) {
        setSelectedItem(null)
        setRange(resolvedInitialRange)
        return
      }

      setSelectedItem({ id: feature.id, type: 'feature' })
      setExpandedFeatureIds([feature.id])

      const startDate = new Date(feature.startDate)
      const endDate = new Date(feature.endDate)
      const paddingMilliseconds = 3 * 24 * 60 * 60 * 1000
      setRange({
        start: new Date(startDate.getTime() - paddingMilliseconds),
        end: new Date(endDate.getTime() + paddingMilliseconds),
      })
    },
    [resolvedInitialRange, selectedItem],
  )

  const selectStory = useCallback(
    (story: RoadmapStory) => {
      const isDeselecting = selectedItem?.type === 'story' && selectedItem.id === story.id

      if (isDeselecting) {
        setSelectedItem(null)
        setRange(resolvedInitialRange)
        return
      }

      setSelectedItem({ id: story.id, type: 'story' })

      const startDate = new Date(story.startDate)
      const endDate = story.endDate ? new Date(story.endDate) : new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      const paddingMilliseconds = 2 * 24 * 60 * 60 * 1000
      setRange({
        start: new Date(startDate.getTime() - paddingMilliseconds),
        end: new Date(endDate.getTime() + paddingMilliseconds),
      })
    },
    [resolvedInitialRange, selectedItem],
  )

  const toggleFeature = useCallback((id: number) => {
    setExpandedFeatureIds((previousIds) => {
      if (previousIds.includes(id)) {
        return []
      }
      return [id]
    })
  }, [])

  const setFeaturesExpanded = useCallback((ids: number[], expanded: boolean) => {
    setExpandedFeatureIds((previousIds) => {
      let nextIds = [...previousIds]
      if (expanded) {
        ids.forEach((id) => {
          if (!nextIds.includes(id)) {
            nextIds.push(id)
          }
        })
      } else {
        nextIds = nextIds.filter((id) => !ids.includes(id))
      }
      return nextIds
    })
  }, [])

  const roadmapRef = useRef<HTMLDivElement>(null)

  const handleFeatureClick = useCallback(
    (feature: RoadmapFeature) => {
      selectFeature(feature)
    },
    [selectFeature],
  )

  const handleStoryClick = useCallback(
    (story: RoadmapStory) => {
      selectStory(story)
      onStoryNavigate?.(story)
    },
    [selectStory, onStoryNavigate],
  )

  const handleHeaderHeightChange = useCallback((height: number) => {
    roadmapRef.current?.style.setProperty('--roadmap-header-height', `${height}px`)
  }, [])

  return (
    <div className={styles['roadmap']} ref={roadmapRef}>
      <RoadmapSidebar
        expandedFeatureIds={expandedFeatureIds}
        features={features}
        onFeatureClick={handleFeatureClick}
        onStoryClick={handleStoryClick}
        onToggleFeature={toggleFeature}
        selectedId={selectedItem}
        standaloneStories={standaloneStories}
      />
      <div className={styles['roadmap__timeline-wrapper']}>
        <RoadmapTimeline
          days={days}
          expandedFeatureIds={expandedFeatureIds}
          features={features}
          granularity={granularity}
          onFeatureClick={handleFeatureClick}
          onHeaderHeightChange={handleHeaderHeightChange}
          onPan={pan}
          onStoryClick={handleStoryClick}
          onToggleFeature={toggleFeature}
          onZoom={zoom}
          selectedId={selectedItem}
          setFeaturesExpanded={setFeaturesExpanded}
          standaloneStories={standaloneStories}
        />
      </div>
    </div>
  )
}

export default Roadmap
