import type { ReactionItem } from '@design-system-community-roadmap/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

import FeatureDetail from '@/components/FeatureDetail'

const mockReactions: ReactionItem[] = [
  {
    author: { name: 'Lieke Smit' },
    content: 'Fijn om te zien dat dit op de planning staat. Wij wachten hier al lang op.',
    id: 1,
  },
  {
    author: { name: 'Bart Hendriks' },
    content: 'Zijn er al Figma-bestanden beschikbaar voor de nieuwe tabelopmaak?',
    id: 2,
  },
  {
    author: { isTeam: true, name: 'Evi' },
    content: 'De designfase is gestart. We delen de Figma-link zodra de eerste versie klaar is.',
    id: 3,
  },
]

const mockStories = [
  {
    title: '[Design] Tabel varianten',
    documentId: 'story-dt-001',
    endDate: '2025-05-10',
    startDate: '2025-04-15',
  },
  {
    title: '[Code] Sorteerbare kolommen',
    documentId: 'story-dt-002',
    endDate: '2025-06-20',
    startDate: '2025-05-12',
  },
  {
    title: '[Code] Paginering integratie',
    documentId: 'story-dt-003',
    endDate: null,
    startDate: '2025-06-23',
  },
]

const meta = {
  title: 'Pages/Feature Detail',
  component: FeatureDetail,
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
} satisfies Meta<typeof FeatureDetail>

export default meta
type Story = StoryObj<typeof meta>

export const InProgress: Story = {
  args: {
    title: 'Data Tabel',
    content:
      'Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.',
    endDate: null,
    featureDocumentId: 'feature-dt-main',
    isLiked: false,
    reactions: mockReactions,
    startDate: '2025-04-15',
    stories: mockStories,
    voteCount: 53,
  },
}

export const Completed: Story = {
  args: {
    title: 'Applicatie-layout',
    content:
      'De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.',
    endDate: '2025-03-28',
    featureDocumentId: 'feature-layout-main',
    isLiked: true,
    reactions: mockReactions.slice(0, 2),
    startDate: '2025-01-10',
    stories: [
      {
        title: '[Design] Achtergrond-kleur voor interne applicaties',
        documentId: 'story-layout-001',
        endDate: '2025-01-31',
        startDate: '2025-01-10',
      },
      {
        title: '[Code] Geneste items en actieve weergave Menu',
        documentId: 'story-layout-002',
        endDate: '2025-03-28',
        startDate: '2025-02-03',
      },
    ],
    voteCount: 38,
  },
}

export const NoStories: Story = {
  args: {
    title: 'Patronen',
    content:
      'Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.',
    endDate: null,
    featureDocumentId: 'feature-patterns-main',
    isLiked: false,
    reactions: [],
    startDate: '2025-05-20',
    stories: [],
    voteCount: 22,
  },
}
