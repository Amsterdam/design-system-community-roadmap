'use client'

import { Grid, Heading, Link, LinkList, Paragraph } from '@amsterdam/design-system-react'
import NextLink from 'next/link'

type ProfielContentProps = {
  ideas: Array<{ documentId: string; title: string }>
  user: { name: string }
}

export default function ProfielContent({ ideas, user }: ProfielContentProps) {
  return (
    <Grid gapVertical="large">
      <Grid.Cell className="ams-prose" span={{ narrow: 4, medium: 8, wide: 8 }}>
        <Heading level={1} size="level-2">
          {user.name}
        </Heading>
        <Paragraph>Hier vind je een overzicht van de ideeën die jij hebt gedeeld.</Paragraph>

        <Heading level={2} size="level-3">
          Mijn ideeën
        </Heading>
        {ideas.length === 0 && (
          <Paragraph>
            Je hebt nog geen ideeën gedeeld.{' '}
            <NextLink href="/idee-delen" legacyBehavior passHref>
              <Link>Deel je eerste idee</Link>
            </NextLink>
            .
          </Paragraph>
        )}
        {ideas.length > 0 && (
          <LinkList>
            {ideas.map((idea) => (
              <LinkList.Link href={`/ideeen/${idea.documentId}`} key={idea.documentId}>
                {idea.title}
              </LinkList.Link>
            ))}
          </LinkList>
        )}

        <Heading level={2} size="level-3">
          Account
        </Heading>
        <LinkList>
          <LinkList.Link href="/uitloggen">Uitloggen</LinkList.Link>
        </LinkList>
      </Grid.Cell>
    </Grid>
  )
}
