import type { Metadata } from 'next'

import Navigation from '@design-system-community-roadmap/ui'

import './globals.css'

export const metadata: Metadata = {
  title: 'Community Roadmap',
  description: 'De community roadmap van het Amsterdam Design System',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
