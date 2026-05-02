'use client'

import { Grid, Heading, Paragraph } from '@amsterdam/design-system-react'

import RegisterClient from './RegisterClient'

export default function RegisterPageContent() {
  return (
    <Grid>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 6, wide: 6 }}>
        <Heading level={1} size="level-2">
          Account aanmaken
        </Heading>
        <Paragraph>Kies je voornaam en een emoji.</Paragraph>
        <RegisterClient />
      </Grid.Cell>
    </Grid>
  )
}
