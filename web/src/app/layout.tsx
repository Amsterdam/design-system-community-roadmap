import type { Metadata } from 'next'

import '@design-system-community-roadmap/ui/styles'

import AppShell from '@/components/AppShell'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Community Roadmap',
    template: '%s | Community Roadmap',
  },
  description: 'Deel ideeën voor het Amsterdam Design System, stem op voorstellen en volg de roadmap.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
