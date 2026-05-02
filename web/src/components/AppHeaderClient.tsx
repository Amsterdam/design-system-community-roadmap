'use client'

import { AppHeader } from '@design-system-community-roadmap/ui'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { logoutAction } from '@/app/actions/login'

function getDisplayUser(): { emoji: string; name: string } | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(/(?:^|;\s*)ams-community-user-display=([^;]*)/)
  if (!match) return undefined
  try {
    return JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return undefined
  }
}

export default function AppHeaderClient() {
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<{ emoji: string; name: string } | undefined>(undefined)

  useEffect(() => {
    setCurrentUser(getDisplayUser())
  }, [pathname])

  return <AppHeader currentUser={currentUser} onLogout={logoutAction} />
}
