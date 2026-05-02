import { PageHeader } from '@amsterdam/design-system-react'

type AppHeaderProps = {
  currentUser?: { emoji: string; name: string }
}

const AppHeader = ({ currentUser }: AppHeaderProps) => (
  <PageHeader
    brandName="Community Roadmap"
    menuItems={[
      <PageHeader.MenuLink fixed href="/zoeken" key="zoeken">
        Zoeken
      </PageHeader.MenuLink>,
      ...(currentUser
        ? [
            <PageHeader.MenuLink href="/uitloggen" key="uitloggen">
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
