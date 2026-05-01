'use client'

import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'
import '@amsterdam/design-system-tokens/dist/index.css'
import { Menu, PageHeader } from '@amsterdam/design-system-react'
import { LightBulbIcon, MapIcon } from '@amsterdam/design-system-react-icons'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'

import styles from './Navigation.module.scss'

const navItems = [
  { href: '/ideeen', icon: <LightBulbIcon />, id: 'ideeen', label: 'Ideeën', shortcut: ['C', 'I'] },
  { href: '/roadmap', icon: <MapIcon />, id: 'roadmap', label: 'Roadmap', shortcut: ['C', 'R'] },
]

const Navigation = () => {
  const [active, setActive] = useState(navItems[0].id)
  const pendingKey = useRef<string | null>(null)
  const pendingTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const match = navItems.find((item) => item.href === window.location.pathname)
    if (match) setActive(match.id)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return

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
        setActive(match.id)
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
    <>
      <PageHeader
        brandName="Community Roadmap"
        menuItems={[
          <PageHeader.MenuLink href="/inloggen" key="inloggen">
            Inloggen
          </PageHeader.MenuLink>,
          <PageHeader.MenuLink fixed href="/zoeken" key="zoeken">
            Zoeken
          </PageHeader.MenuLink>,
        ]}
      />
      <Menu className={styles['menu']} inWideWindow>
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <Menu.Link
              aria-current={isActive ? 'page' : undefined}
              className={clsx(isActive && styles['linkActive'])}
              href={item.href}
              icon={item.icon}
              key={item.id}
              onClick={() => setActive(item.id)}
            >
              <span className={styles['label']}>{item.label}</span>
              <span aria-hidden="true" className={styles['shortcut']}>
                {item.shortcut.map((k) => (
                  <kbd key={k}>{k}</kbd>
                ))}
              </span>
            </Menu.Link>
          )
        })}
      </Menu>
    </>
  )
}

export default Navigation
