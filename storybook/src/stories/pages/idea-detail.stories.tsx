import type { ReactionItem } from '@design-system-community-roadmap/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

import IdeaDetail from '@/components/IdeaDetail'

const mockReactions: ReactionItem[] = [
  {
    author: { name: 'Jan de Vries' },
    content: 'Dit is een erg goed idee! Wij lopen hier al tijden tegenaan.',
    id: 1,
  },
  {
    author: { name: 'Sophie Meijer' },
    content: 'Zou dit ook werken voor mobiele schermformaten?',
    id: 2,
  },
  {
    author: { name: 'Piet Klaassen' },
    content: 'Helemaal mee eens, dit mist nu echt in het design system.',
    id: 3,
  },
]

const teamReaction: ReactionItem = {
  author: { isTeam: true, name: 'Evi' },
  content: 'Bedankt voor dit idee! We nemen het mee in onze volgende planningssessie en komen hier snel op terug.',
  id: 99,
}

const mockFeatures = [
  {
    title: 'Multi Select – Designfase',
    documentId: 'feature-abc1',
    endDate: '2025-04-15',
    startDate: '2025-03-01',
  },
  {
    title: 'Multi Select – Implementatie',
    documentId: 'feature-abc2',
    endDate: '2025-06-30',
    startDate: '2025-04-16',
  },
]

const meta = {
  title: 'Pages/Idea Detail',
  component: IdeaDetail,
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
} satisfies Meta<typeof IdeaDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Multi Select Component',
    authorName: 'Jan de Vries',
    content:
      'In een formulier wil ik meerdere opties tegelijkertijd kunnen selecteren. Het huidige design system biedt alleen een enkelvoudige selectie aan via de Select component. Een Multi Select component zou formulieren een stuk gebruiksvriendelijker maken, zeker voor gevallen zoals het filteren van meerdere categorieën.',
    createdAt: '2025-01-15T10:30:00Z',
    features: mockFeatures,
    ideaDocumentId: 'idea-001',
    isLiked: false,
    reactions: mockReactions,
    status: 'accepted',
    voteCount: 42,
  },
}

export const WithTeamReaction: Story = {
  args: {
    ...Default.args,
    title: 'Donkere modus ondersteuning',
    content:
      'Steeds meer applicaties bieden een donkere modus aan. Het zou fijn zijn als het Amsterdam Design System hier ondersteuning voor biedt, zodat teams dit eenvoudig kunnen implementeren zonder zelf kleurtokens te hoeven definiëren.',
    reactions: [teamReaction, ...mockReactions],
    status: 'in_review',
  },
}

export const NoFeatures: Story = {
  args: {
    ...Default.args,
    title: 'Exporteren naar PDF',
    content:
      'Vanuit meerdere applicaties is de wens om pagina-inhoud te kunnen exporteren naar PDF. Een gestandaardiseerde aanpak vanuit het design system zou veel teams tijd besparen.',
    features: [],
    status: 'in_review',
    voteCount: 18,
  },
}

export const Postponed: Story = {
  args: {
    ...Default.args,
    title: 'Drag and drop interface',
    content:
      'Voor het ordenen van lijstitems zou een drag-and-drop interface heel handig zijn. Denk aan het herschikken van taken of het sorteren van zoekresultaten door de gebruiker zelf.',
    features: [],
    isLiked: true,
    reactions: mockReactions.slice(0, 1),
    status: 'postponed',
    voteCount: 11,
  },
}
