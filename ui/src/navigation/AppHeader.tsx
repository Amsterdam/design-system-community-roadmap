'use client'

import { PageHeader } from '@amsterdam/design-system-react'

import type { NotificationMenuItem } from '../notifications/NotificationMenu'
import type { SearchResult } from '../search/SearchBar'

import NotificationMenu from '../notifications/NotificationMenu'
import SearchBar from '../search/SearchBar'
import styles from './AppHeader.module.scss'

type AppHeaderProps = {
  currentUser?: { emoji: string; name: string }
  notifications?: NotificationMenuItem[]
  onLogout?: () => void
  onMarkAllNotificationsRead?: () => void
  onSearch?: (query: string) => Promise<SearchResult[]>
  onSelectNotification?: (item: NotificationMenuItem) => void
}

const AppHeader = ({
  currentUser,
  notifications = [],
  onLogout,
  onMarkAllNotificationsRead,
  onSearch,
  onSelectNotification,
}: AppHeaderProps) => (
  <PageHeader
    brandName="Community Roadmap"
    menuItems={[
      ...(onSearch
        ? [
            <li
              className={`ams-page-header__menu-item ams-page-header__menu-item--fixed ${styles['app-header__search-item']}`}
              key="search"
            >
              <SearchBar onSearch={onSearch} placeholder="Zoeken" />
            </li>,
          ]
        : []),
      <PageHeader.MenuLink fixed href="/idee-delen" key="idee-delen">
        Idee delen
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
