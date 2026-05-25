'use client'

import { Menu } from '@amsterdam/design-system-react'
import { LightBulbIcon, MapIcon } from '@amsterdam/design-system-react-icons'
import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'

import styles from './Navigation.module.scss'

const navItems = [
  { href: '/', icon: <LightBulbIcon />, id: 'ideeen', label: 'Ideeën', shortcut: ['C', 'I'] },
  { href: '/roadmap', icon: <MapIcon />, id: 'roadmap', label: 'Roadmap', shortcut: ['C', 'R'] },
]

type NavigationProps = {
  pathname?: string
}

const Navigation = ({ pathname }: NavigationProps) => {
  const pendingKey = useRef<string | null>(null)
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target
      if (!(target instanceof HTMLElement)) return
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable) return

      const key = e.key.toUpperCase()

      if (!pendingKey.current) {
        if (key !== 'C') return
        pendingKey.current = 'C'
        pendingTimer.current = setTimeout(() => {
          pendingKey.current = null
        }, 1500)
        return
      }

      clearTimeout(pendingTimer.current)
      pendingKey.current = null
      const match = navItems.find((item) => item.shortcut[1] === key)
      if (match) {
        window.location.href = match.href
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(pendingTimer.current)
    }
  }, [])

  return (
    <Menu className={styles['navigation']} inWideWindow>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Menu.Link
            aria-current={isActive ? 'page' : undefined}
            className={clsx(isActive && styles['navigation__link--active'])}
            href={item.href}
            icon={item.icon}
            key={item.id}
          >
            <span className={styles['navigation__label']}>{item.label}</span>
            <span
              aria-hidden="true"
              className={styles['navigation__shortcut']}
              style={{ marginInlineStart: '0.25rem' }}
            >
              {item.shortcut.map((k) => (
                <kbd className={styles['navigation__shortcut-key']} key={k}>
                  {k}
                </kbd>
              ))}
            </span>
          </Menu.Link>
        )
      })}
    </Menu>
  )
}

export default Navigation
