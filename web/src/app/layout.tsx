'use client'
import { Page } from '@amsterdam/design-system-react'
import { AppHeader, Navigation } from '@design-system-community-roadmap/ui'
import '@design-system-community-roadmap/ui/styles'

import styles from './layout.module.scss'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        <Page>
          <AppHeader />
          <main className={styles['body']}>
            <Navigation />
            <div className={styles['content']}>{children}</div>
          </main>
        </Page>
      </body>
    </html>
  )
}
