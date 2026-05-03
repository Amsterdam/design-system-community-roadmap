import type { ReactionItem } from '@design-system-community-roadmap/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

import StoryDetail from '../../../../web/src/components/StoryDetail'

const mockReactions: ReactionItem[] = [
  {
    author: { name: 'Emma Bakker' },
    content: 'Wanneer is dit beschikbaar in de npm package?',
    id: 1,
  },
  {
    author: { name: 'Joost van Dam' },
    content: 'De Figma-bestanden zijn al bijgewerkt, top!',
    id: 2,
  },
  {
    author: { isTeam: true, name: 'Amsterdam Design System Team' },
    content: 'We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!',
    id: 3,
  },
]

const meta = {
  title: 'Pages/Story Detail',
  component: StoryDetail,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof StoryDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '[Design] Achtergrond-kleur voor interne applicaties',
    content:
      'Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.',
    endDate: null,
    featureDocumentId: 'feature-layout-001',
    isLiked: false,
    parentFeature: {
      title: 'Applicatie-layout',
      documentId: 'feature-layout-001',
    },
    reactions: mockReactions,
    startDate: '2025-03-01',
    voteCount: 14,
  },
}

export const WithEndDate: Story = {
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content:
      'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27,
  },
}

export const WithoutParentFeature: Story = {
  args: {
    ...Default.args,
    title: 'Rich Text editor onderzoek',
    content:
      'Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.',
    endDate: null,
    parentFeature: null,
    reactions: [],
    startDate: '2025-06-01',
    voteCount: 9,
  },
}

export const Empty: Story = {
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content:
      'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5,
  },
}
