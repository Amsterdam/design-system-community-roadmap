'use client'

import { Menu, PageHeader } from '@amsterdam/design-system-react'

import type { NotificationMenuItem } from '../notifications/NotificationMenu'

import NotificationMenu from '../notifications/NotificationMenu'
import { navItems } from './navItems'

type AppHeaderProps = {
  currentUser?: { name: string }
  notifications?: NotificationMenuItem[]
  onLogout?: () => void
  onMarkAllNotificationsRead?: () => void
  onSelectNotification?: (item: NotificationMenuItem) => void
  pathname?: string
  showShareIdea?: boolean
}

const AppHeader = ({
  currentUser,
  notifications = [],
  onLogout,
  onMarkAllNotificationsRead,
  onSelectNotification,
  pathname,
  showShareIdea = true,
}: AppHeaderProps) => (
  <PageHeader
    brandName="Community Roadmap"
    menuItems={[
      ...(showShareIdea
        ? [
            <PageHeader.MenuLink fixed href="/idee-delen" key="idee-delen">
              Idee delen
            </PageHeader.MenuLink>,
          ]
        : []),
      ...(currentUser
        ? [
            <NotificationMenu
              key="notificaties"
              notifications={notifications}
              onMarkAllRead={onMarkAllNotificationsRead}
              onSelect={onSelectNotification}
            />,
            <PageHeader.MenuLink href="/profiel" key="profiel">
              {currentUser.name}
            </PageHeader.MenuLink>,
            <PageHeader.MenuLink href="/uitloggen" key="uitloggen" onClick={onLogout}>
              Uitloggen
            </PageHeader.MenuLink>,
          ]
        : [
            <PageHeader.MenuLink href="/inloggen" key="inloggen">
              Inloggen
            </PageHeader.MenuLink>,
          ]),
    ]}
    noMenuButtonOnWideWindow
  >
    <Menu>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Menu.Link aria-current={isActive ? 'page' : undefined} href={item.href} icon={item.icon} key={item.id}>
            {item.label}
          </Menu.Link>
        )
      })}
    </Menu>
  </PageHeader>
)

export default AppHeader
