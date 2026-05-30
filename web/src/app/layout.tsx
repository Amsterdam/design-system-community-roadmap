'use client'
import { Page } from '@amsterdam/design-system-react'
import '@design-system-community-roadmap/ui/styles'

import HeaderClient from '@/components/HeaderClient'

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        <Page>
          <HeaderClient />
          <main>{children}</main>
        </Page>
      </body>
    </html>
  )
}
