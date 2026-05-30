'use client'

import { Grid, Heading, LinkList, PageFooter, Paragraph } from '@amsterdam/design-system-react'
import NextLink from 'next/link'

export default function Footer() {
  return (
    <PageFooter>
      <PageFooter.Spotlight>
        <Grid paddingVertical="x-large">
          <Grid.Cell span={4}>
            <Heading className="ams-mb-s" color="inverse" level={2} size="level-3">
              Community Roadmap
            </Heading>
            <Paragraph className="ams-mb-m" color="inverse">
              Deel je ideeën en volg waar we aan werken.
            </Paragraph>
          </Grid.Cell>
          <Grid.Cell span={4}>
            <Heading className="ams-mb-s" color="inverse" level={2} size="level-3">
              Ontdekken
            </Heading>
            <LinkList>
              <NextLink href="/" legacyBehavior passHref>
                <LinkList.Link color="inverse">Ideeën</LinkList.Link>
              </NextLink>
              <NextLink href="/roadmap" legacyBehavior passHref>
                <LinkList.Link color="inverse">Roadmap</LinkList.Link>
              </NextLink>
              <NextLink href="/idee-delen" legacyBehavior passHref>
                <LinkList.Link color="inverse">Idee delen</LinkList.Link>
              </NextLink>
            </LinkList>
          </Grid.Cell>
          <Grid.Cell span={4}>
            <Heading className="ams-mb-s" color="inverse" level={2} size="level-3">
              Account
            </Heading>
            <LinkList>
              <NextLink href="/inloggen" legacyBehavior passHref>
                <LinkList.Link color="inverse">Inloggen</LinkList.Link>
              </NextLink>
              <NextLink href="/aanmelden" legacyBehavior passHref>
                <LinkList.Link color="inverse">Aanmelden</LinkList.Link>
              </NextLink>
              <NextLink href="/profiel" legacyBehavior passHref>
                <LinkList.Link color="inverse">Profiel</LinkList.Link>
              </NextLink>
            </LinkList>
          </Grid.Cell>
        </Grid>
      </PageFooter.Spotlight>
      <PageFooter.Menu>
        <PageFooter.MenuLink href="#">Over deze site</PageFooter.MenuLink>
        <PageFooter.MenuLink href="#">Privacy</PageFooter.MenuLink>
        <PageFooter.MenuLink href="#">Cookies</PageFooter.MenuLink>
        <PageFooter.MenuLink href="#">Toegankelijkheid</PageFooter.MenuLink>
      </PageFooter.Menu>
    </PageFooter>
  )
}
