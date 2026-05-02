'use client'

import { Grid, Heading, Paragraph } from '@amsterdam/design-system-react'

import LoginClient from './LoginClient'

export default function LoginPageContent() {
  return (
    <Grid>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 6, wide: 6 }}>
        <Heading level={1} size="level-2">
          Inloggen
        </Heading>
        <Paragraph>Vul je naam en emoji in om in te loggen.</Paragraph>
        <LoginClient />
      </Grid.Cell>
    </Grid>
  )
}
