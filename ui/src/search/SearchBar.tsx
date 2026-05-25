'use client'

import type { KeyboardEvent } from 'react'

import { SearchField } from '@amsterdam/design-system-react'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'

import styles from './SearchBar.module.scss'

export type SearchResultType = 'idea' | 'story' | 'feature'

export type SearchResult = {
  description?: string
  href: string
  id: string
  title: string
  type: SearchResultType
}

type SearchBarProps = {
  onSearch: (query: string) => Promise<SearchResult[]>
  placeholder?: string
}

const groupLabels: Record<SearchResultType, string> = {
  feature: 'Features',
  idea: 'Ideeën',
  story: 'Stories',
}

const groupOrder: SearchResultType[] = ['idea', 'story', 'feature']

const SearchBar = ({ onSearch, placeholder = 'Zoek op ideeën, stories of features' }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsLoading(false)
      return () => {}
    }

    let cancelled = false
    setIsLoading(true)
    const timer = setTimeout(async () => {
      try {
        const found = await onSearch(query.trim())
        if (!cancelled) setResults(found)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query, onSearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const grouped = groupOrder
    .map((type) => ({ items: results.filter((r) => r.type === type), type }))
    .filter((g) => g.items.length > 0)

  const flatResults = grouped.flatMap((g) => g.items)
  const showDropdown = isOpen && query.trim().length > 0

  useEffect(() => {
    setActiveIndex(-1)
  }, [query])

  useEffect(() => {
    if (activeIndex < 0) return
    const el = itemRefs.current[activeIndex]
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
      return
    }

    if (!showDropdown || flatResults.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % flatResults.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i <= 0 ? flatResults.length - 1 : i - 1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      const item = flatResults[activeIndex]
      if (item) window.location.href = item.href
    }
  }

  let runningIndex = -1

  return (
    <div className={styles['search-bar']} ref={wrapperRef}>
      <SearchField
        className={styles['search-bar__field']}
        onSubmit={(e) => {
          e.preventDefault()
          setIsOpen(true)
        }}
      >
        <SearchField.Input
          aria-activedescendant={activeIndex >= 0 ? `search-bar-option-${activeIndex}` : undefined}
          label="Zoeken"
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={query}
        />
        <SearchField.Button />
      </SearchField>

      {showDropdown && (
        <div className={styles['search-bar__dropdown']} role="listbox">
          {isLoading && results.length === 0 && <p className={styles['search-bar__status']}>Zoeken…</p>}

          {!isLoading && results.length === 0 && (
            <p className={styles['search-bar__status']}>Geen resultaten gevonden</p>
          )}

          {grouped.map((group) => (
            <div className={styles['search-bar__group']} key={group.type}>
              <p className={styles['search-bar__group-heading']}>{groupLabels[group.type]}</p>
              <ul className={styles['search-bar__list']}>
                {group.items.map((item) => {
                  runningIndex += 1
                  const index = runningIndex
                  const isActive = index === activeIndex
                  return (
                    <li key={`${item.type}-${item.id}`}>
                      <a
                        aria-selected={isActive}
                        className={clsx(styles['search-bar__item'], isActive && styles['search-bar__item--active'])}
                        href={item.href}
                        id={`search-bar-option-${index}`}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setActiveIndex(index)}
                        ref={(el) => {
                          itemRefs.current[index] = el
                        }}
                        role="option"
                      >
                        <span className={styles['search-bar__item-title']}>{item.title}</span>
                        {item.description && (
                          <span className={styles['search-bar__item-description']}>{item.description}</span>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
