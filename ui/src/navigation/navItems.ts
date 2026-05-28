import { LightBulbIcon, MapIcon } from '@amsterdam/design-system-react-icons'

export const navItems = [
  { href: '/', icon: LightBulbIcon, id: 'ideeen', label: 'Ideeën', shortcut: ['C', 'I'] as const },
  { href: '/roadmap', icon: MapIcon, id: 'roadmap', label: 'Roadmap', shortcut: ['C', 'R'] as const },
] as const

export type NavItem = (typeof navItems)[number]
