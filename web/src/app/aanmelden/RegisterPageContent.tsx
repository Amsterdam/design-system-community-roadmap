'use client'

import { Column, Grid, Heading, Paragraph, StandaloneLink } from '@amsterdam/design-system-react'
import NextLink from 'next/link'

import RegisterClient from './RegisterClient'

export default function RegisterPageContent() {
  return (
    <Grid>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 5, wide: 6 }}>
        <Heading level={1} size="level-2">
          Account aanmaken
        </Heading>
        <Paragraph>Kies je voornaam en een emoji.</Paragraph>
        <RegisterClient />
      </Grid.Cell>
      <Grid.Cell span={{ narrow: 4, medium: 3, wide: 4 }} start={{ narrow: 1, medium: 6, wide: 9 }}>
        <Column gap="small">
          <Heading level={2} size="level-4">
            Al een account?
          </Heading>
          <Paragraph>Log in met je voornaam en emoji.</Paragraph>
          <NextLink href="/inloggen" legacyBehavior passHref>
            <StandaloneLink>Inloggen</StandaloneLink>
          </NextLink>
        </Column>
      </Grid.Cell>
    </Grid>
  )
}
