'use client'

import { Heading, IconButton } from '@amsterdam/design-system-react'
import { ChevronDownIcon, ChevronForwardIcon, DocumentIcon } from '@amsterdam/design-system-react-icons'
import { clsx } from 'clsx'

import type { RoadmapFeature, RoadmapStory } from './dateUtils'

import styles from './RoadmapSidebar.module.scss'

type RoadmapSidebarProps = {
  expandedFeatureIds: number[]
  features: RoadmapFeature[]
  onFeatureClick: (feature: RoadmapFeature) => void
  onFeatureNavigate?: (feature: RoadmapFeature) => void
  onStoryClick: (story: RoadmapStory) => void
  onStoryNavigate?: (story: RoadmapStory) => void
  onToggleFeature: (id: number) => void
  selectedId: { id: number; type: 'feature' | 'story' } | null
  standaloneStories: RoadmapStory[]
}

const RoadmapSidebar = ({
  expandedFeatureIds,
  features,
  onFeatureClick,
  onFeatureNavigate,
  onStoryClick,
  onStoryNavigate,
  onToggleFeature,
  selectedId,
  standaloneStories,
}: RoadmapSidebarProps) => (
  <nav aria-label="Roadmap features en stories" className={styles['sidebar']}>
    <header className={styles['sidebar__header']}>
      <Heading className={styles['sidebar__header-title']} level={2} size="level-3">
        Features
      </Heading>
    </header>
    <ul className={styles['sidebar__list']} role="list">
      {features.map((feature) => {
        const isExpanded = expandedFeatureIds.includes(feature.id)
        const isSelected = selectedId?.type === 'feature' && selectedId.id === feature.id
        const hasStories = feature.stories.length > 0

        return (
          <li className={styles['sidebar__feature-item']} key={feature.id}>
            <div
              className={clsx(styles['sidebar__feature-row'], isSelected && styles['sidebar__feature-row--selected'])}
            >
              {hasStories ? (
                <button
                  aria-controls={`stories-of-${feature.id}`}
                  aria-expanded={isExpanded}
                  aria-label={
                    isExpanded ? `Inklappen stories voor ${feature.title}` : `Uitklappen stories voor ${feature.title}`
                  }
                  className={styles['sidebar__toggle-button']}
                  onClick={() => onToggleFeature(feature.id)}
                  type="button"
                >
                  <span aria-hidden="true" className={styles['chevronIcon']}>
                    {isExpanded ? <ChevronDownIcon /> : <ChevronForwardIcon />}
                  </span>
                </button>
              ) : (
                <span className={styles['sidebar__toggle-spacer']} />
              )}

              <button
                aria-current={isSelected ? 'true' : undefined}
                className={styles['sidebar__feature-button']}
                onClick={() => onFeatureClick(feature)}
                type="button"
              >
                <Heading className={styles['sidebar__feature-title']} level={3} size="level-5">
                  {feature.title}
                </Heading>
              </button>

              {onFeatureNavigate && (
                <IconButton
                  className={styles['sidebar__open-button']}
                  label={`Bekijk feature: ${feature.title}`}
                  onClick={() => onFeatureNavigate(feature)}
                  size="small"
                  svg={DocumentIcon}
                />
              )}
            </div>

            {isExpanded && feature.stories.length > 0 && (
              <ul className={styles['sidebar__story-list']} id={`stories-of-${feature.id}`} role="list">
                {feature.stories.map((story) => {
                  const isStorySelected = selectedId?.type === 'story' && selectedId.id === story.id
                  return (
                    <li className={styles['sidebar__story-item']} key={story.id}>
                      <div
                        className={clsx(
                          styles['sidebar__story-row'],
                          isStorySelected && styles['sidebar__story-row--selected'],
                        )}
                      >
                        <button
                          aria-current={isStorySelected ? 'true' : undefined}
                          className={clsx(
                            styles['sidebar__story-button'],
                            isStorySelected && styles['sidebar__story-button--selected'],
                          )}
                          onClick={() => onStoryClick(story)}
                          type="button"
                        >
                          <span className={styles['sidebar__story-title']}>{story.title}</span>
                        </button>

                        {onStoryNavigate && (
                          <IconButton
                            className={styles['sidebar__open-button']}
                            label={`Bekijk story: ${story.title}`}
                            onClick={() => onStoryNavigate(story)}
                            size="small"
                            svg={DocumentIcon}
                          />
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}

      {standaloneStories.map((story) => {
        const isStorySelected = selectedId?.type === 'story' && selectedId.id === story.id
        return (
          <li className={styles['sidebar__story-item']} key={story.id}>
            <div
              className={clsx(styles['sidebar__story-row'], isStorySelected && styles['sidebar__story-row--selected'])}
            >
              <button
                aria-current={isStorySelected ? 'true' : undefined}
                className={clsx(
                  styles['sidebar__story-button'],
                  isStorySelected && styles['sidebar__story-button--selected'],
                  styles['sidebar__story-button--standalone'],
                )}
                onClick={() => onStoryClick(story)}
                type="button"
              >
                <span className={styles['sidebar__story-title']}>{story.title}</span>
              </button>

              {onStoryNavigate && (
                <IconButton
                  className={styles['sidebar__open-button']}
                  label={`Bekijk story: ${story.title}`}
                  onClick={() => onStoryNavigate(story)}
                  size="small"
                  svg={DocumentIcon}
                />
              )}
            </div>
          </li>
        )
      })}
    </ul>
  </nav>
)

export default RoadmapSidebar
