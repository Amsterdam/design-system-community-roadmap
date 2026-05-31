'use client'

import { Page } from '@amsterdam/design-system-react'

import Footer from '@/components/Footer'
import HeaderClient from '@/components/HeaderClient'

// The sercer renders layout.tsx, but the Page component from ADS needs use client, this shell provides Use Client for the Page component.
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <HeaderClient />
      <main>{children}</main>
      <Footer />
    </Page>
  )
}
