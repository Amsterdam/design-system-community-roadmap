import { PageHeader } from '@amsterdam/design-system-react'

import type { NotificationMenuItem } from '../notifications/NotificationMenu'

import NotificationMenu from '../notifications/NotificationMenu'

type AppHeaderProps = {
  currentUser?: { emoji: string; name: string }
  notifications?: NotificationMenuItem[]
  onLogout?: () => void
  onMarkAllNotificationsRead?: () => void
  onSelectNotification?: (item: NotificationMenuItem) => void
}

const AppHeader = ({
  currentUser,
  notifications = [],
  onLogout,
  onMarkAllNotificationsRead,
  onSelectNotification,
}: AppHeaderProps) => (
  <PageHeader
    brandName="Community Roadmap"
    menuItems={[
      <PageHeader.MenuLink fixed href="/idee-delen" key="idee-delen">
        Idee delen
      </PageHeader.MenuLink>,
      <PageHeader.MenuLink fixed href="/zoeken" key="zoeken">
        Zoeken
      </PageHeader.MenuLink>,
      ...(currentUser
        ? [
            <NotificationMenu
              key="notificaties"
              notifications={notifications}
              onMarkAllRead={onMarkAllNotificationsRead}
              onSelect={onSelectNotification}
            />,
            <PageHeader.MenuLink href="/uitloggen" key="uitloggen" onClick={onLogout}>
              {currentUser.emoji} {currentUser.name}
            </PageHeader.MenuLink>,
          ]
        : [
            <PageHeader.MenuLink href="/inloggen" key="inloggen">
              Inloggen
            </PageHeader.MenuLink>,
          ]),
    ]}
  />
)

export default AppHeader
