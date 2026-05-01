import { PageHeader } from '@amsterdam/design-system-react'

const AppHeader = () => (
  <PageHeader
    brandName="Community Roadmap"
    menuItems={[
      <PageHeader.MenuLink fixed href="/zoeken" key="zoeken">
        Zoeken
      </PageHeader.MenuLink>,
      <PageHeader.MenuLink href="/inloggen" key="inloggen">
        Inloggen
      </PageHeader.MenuLink>,
    ]}
  />
)

export default AppHeader
