import { AppHeader } from '@design-system-community-roadmap/ui'

import { getCurrentUser } from '@/app/actions/login'

export default async function HeaderServer() {
  const user = await getCurrentUser()

  return <AppHeader currentUser={user ? { emoji: user.emoji, name: user.name } : undefined} />
}
