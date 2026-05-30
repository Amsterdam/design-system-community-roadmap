'use client'

import { Breadcrumb } from '@amsterdam/design-system-react'
import NextLink from 'next/link'

export type BreadcrumbItem = {
  href: string
  label: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      {items.map((item) => (
        <NextLink href={item.href} key={item.href} legacyBehavior passHref>
          <Breadcrumb.Link>{item.label}</Breadcrumb.Link>
        </NextLink>
      ))}
    </Breadcrumb>
  )
}
