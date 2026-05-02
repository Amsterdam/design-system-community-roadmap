import type { RoadmapFeature, RoadmapStory } from '@design-system-community-roadmap/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Roadmap } from '@design-system-community-roadmap/ui'
import { addDays, format, subDays } from 'date-fns'

const today = new Date()
const fmt = (d: Date) => format(d, 'yyyy-MM-dd')

const mockFeatures: RoadmapFeature[] = [
  {
    title: 'Applicatie-layout',
    documentId: 'feature-1',
    endDate: fmt(addDays(today, 30)),
    id: 1,
    startDate: fmt(subDays(today, 5)),
    stories: [
      {
        title: '[Design] Achtergrond-kleur voor interne applicaties',
        documentId: 'story-1-1',
        endDate: fmt(addDays(today, 8)),
        id: 11,
        startDate: fmt(subDays(today, 3)),
      },
      {
        title: '[Code] Geneste items en actieve weergave Menu',
        documentId: 'story-1-3',
        endDate: fmt(addDays(today, 30)),
        id: 13,
        startDate: fmt(addDays(today, 17)),
      },
    ],
  },
  {
    title: 'Data tabel',
    documentId: 'feature-2',
    endDate: fmt(addDays(today, 55)),
    id: 2,
    startDate: fmt(addDays(today, 15)),
    stories: [
      {
        title: '[Design] Tabel varianten',
        documentId: 'story-2-1',
        endDate: fmt(addDays(today, 35)),
        id: 21,
        startDate: fmt(addDays(today, 15)),
      },
      {
        title: '[Code] Sorteerbare kolommen',
        documentId: 'story-2-2',
        endDate: fmt(addDays(today, 55)),
        id: 22,
        startDate: fmt(addDays(today, 36)),
      },
    ],
  },
  {
    title: 'Patronen',
    documentId: 'feature-3',
    endDate: fmt(addDays(today, 45)),
    id: 3,
    startDate: fmt(addDays(today, 20)),
    stories: [],
  },
  {
    title: 'Form Control Design',
    documentId: 'feature-4',
    endDate: fmt(addDays(today, 80)),
    id: 4,
    startDate: fmt(addDays(today, 40)),
    stories: [
      {
        title: '[Design] Form layout richtlijnen',
        documentId: 'story-4-1',
        endDate: fmt(addDays(today, 60)),
        id: 41,
        startDate: fmt(addDays(today, 40)),
      },
    ],
  },
]

const mockStandaloneStories: RoadmapStory[] = [
  {
    title: 'Testen',
    documentId: 'story-standalone-1',
    endDate: fmt(addDays(today, 25)),
    id: 101,
    startDate: fmt(addDays(today, 10)),
  },
  {
    title: 'Rich Text editor onderzoek',
    documentId: 'story-standalone-2',
    endDate: null,
    id: 102,
    startDate: fmt(addDays(today, 50)),
  },
]

const meta = {
  title: 'Roadmap',
  component: Roadmap,
  args: {
    features: mockFeatures,
    standaloneStories: mockStandaloneStories,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Roadmap>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithExpandedFeature: Story = {
  play: async () => {},
  render: (args) => {
    return <Roadmap {...args} features={mockFeatures.map((f, i) => (i === 0 ? { ...f } : f))} />
  },
}

export const FeaturesOnly: Story = {
  args: {
    standaloneStories: [],
  },
}
