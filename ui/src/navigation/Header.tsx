'use client'

import { PageHeader } from '@amsterdam/design-system-react'

import type { NotificationMenuItem } from '../notifications/NotificationMenu'

import NotificationMenu from '../notifications/NotificationMenu'
import { navItems } from './navItems'

type HeaderProps = {
  currentUser?: { name: string }
  notifications?: NotificationMenuItem[]
  onMarkAllNotificationsRead?: () => void
  onSelectNotification?: (item: NotificationMenuItem) => void
  pathname?: string
}

const Header = ({
  currentUser,
  notifications = [],
  onMarkAllNotificationsRead,
  onSelectNotification,
  pathname,
}: HeaderProps) => (
  <PageHeader
    brandName="Community Roadmap"
    menuItems={[
      ...navItems.map((item) => (
        <PageHeader.MenuLink
          aria-current={pathname === item.href ? 'page' : undefined}
          fixed
          href={item.href}
          key={item.id}
        >
          {item.label}
        </PageHeader.MenuLink>
      )),
      ...(currentUser
        ? [
            <NotificationMenu
              key="notificaties"
              notifications={notifications}
              onMarkAllRead={onMarkAllNotificationsRead}
              onSelect={onSelectNotification}
            />,
            <PageHeader.MenuLink fixed href="/profiel" key="profiel">
              {currentUser.name}
            </PageHeader.MenuLink>,
          ]
        : [
            <PageHeader.MenuLink fixed href="/inloggen" key="inloggen">
              Inloggen
            </PageHeader.MenuLink>,
          ]),
    ]}
  />
)

export default Header
