'use client'

import { Column, Grid, Heading, Paragraph, StandaloneLink } from '@amsterdam/design-system-react'
import NextLink from 'next/link'

import LoginClient from './LoginClient'

export default function LoginPageContent() {
  return (
    <Grid>
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 5, wide: 6 }}>
        <Heading level={1} size="level-2">
          Inloggen
        </Heading>
        <Paragraph>Vul je naam en emoji in om in te loggen.</Paragraph>
        <LoginClient />
      </Grid.Cell>
      <Grid.Cell span={{ narrow: 4, medium: 3, wide: 4 }} start={{ narrow: 1, medium: 6, wide: 9 }}>
        <Column gap="small">
          <Heading level={2} size="level-4">
            Geen account?
          </Heading>
          <Paragraph>Maak eenmalig een account aan met je voornaam en een emoji.</Paragraph>
          <NextLink href="/aanmelden" legacyBehavior passHref>
            <StandaloneLink>Account aanmaken</StandaloneLink>
          </NextLink>
        </Column>
      </Grid.Cell>
    </Grid>
  )
}
