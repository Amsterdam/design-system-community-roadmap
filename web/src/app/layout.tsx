'use client'
import { Page } from '@amsterdam/design-system-react'
import { Navigation } from '@design-system-community-roadmap/ui'
import '@design-system-community-roadmap/ui/styles'

import AppHeaderClient from '@/components/AppHeaderClient'

import styles from './layout.module.scss'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        <Page>
          <AppHeaderClient />
          <div className={styles['layout']}>
            <Navigation />
            <main className={styles['content']}>{children}</main>
          </div>
        </Page>
      </body>
    </html>
  )
}
