import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, Dialog } from '@amsterdam/design-system-react'
import { EditModal } from '@design-system-community-roadmap/ui'

const meta = {
  title: 'Molecules/Edit Modal',
  component: EditModal,
  decorators: [
    (Story, { args }) => (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => Dialog.open(`#${args.id}`)} type="button">
          Bewerken
        </Button>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EditModal>

export default meta
type Story = StoryObj<typeof meta>

export const EditIdea: Story = {
  args: {
    id: 'edit-modal-idea',
    initialValues: {
      title: 'Gebruikersprofiel aanpassen',
      content: 'Het zou handig zijn als gebruikers zelf hun profiel kunnen aanpassen.',
      statusIdea: 'in_review',
    },
    onSubmit: (values) => {
      console.log('Opslaan:', values)
      return true
    },
    type: 'idea',
  },
}

export const EditFeature: Story = {
  args: {
    id: 'edit-modal-feature',
    initialValues: {
      title: 'Donkere modus',
      content: 'Implementeer een donkere modus voor de hele applicatie.',
      endDate: '2025-09-30',
      startDate: '2025-07-01',
    },
    onSubmit: (values) => {
      console.log('Opslaan:', values)
      return true
    },
    type: 'feature',
  },
}

export const EditStory: Story = {
  args: {
    id: 'edit-modal-story',
    initialValues: {
      title: 'Donkere modus instellen',
      content: 'Als gebruiker wil ik een donkere modus kunnen inschakelen.',
      endDate: '2025-08-15',
      startDate: '2025-07-01',
    },
    onSubmit: (values) => {
      console.log('Opslaan:', values)
      return true
    },
    type: 'story',
  },
}

export const WithError: Story = {
  args: {
    error: 'Er is iets misgegaan. Probeer het opnieuw.',
    id: 'edit-modal-error',
    initialValues: {
      title: 'Idee met foutmelding',
      content: 'Beschrijving van het idee.',
      statusIdea: 'accepted',
    },
    onSubmit: (values) => {
      console.log('Opslaan:', values)
      return false
    },
    type: 'idea',
  },
}

export const WithFieldErrors: Story = {
  args: {
    fieldErrors: {
      title: 'Titel mag maximaal 140 tekens bevatten.',
      endDate: 'Einddatum moet op of na de startdatum liggen.',
    },
    id: 'edit-modal-field-errors',
    initialValues: {
      title:
        'Een veel te lange titel die de maximale lengte van honderdveertig tekens overschrijdt en dus een validatiefout veroorzaakt bij het opslaan…',
      content: 'Implementeer een donkere modus voor de hele applicatie.',
      endDate: '2025-06-01',
      startDate: '2025-07-01',
    },
    onSubmit: (values) => {
      console.log('Opslaan:', values)
      return false
    },
    type: 'feature',
  },
}

export const Loading: Story = {
  args: {
    id: 'edit-modal-loading',
    initialValues: {
      title: 'Donkere modus',
      content: 'Implementeer een donkere modus voor de hele applicatie.',
      endDate: '2025-09-30',
      startDate: '2025-07-01',
    },
    loading: true,
    onSubmit: (values) => {
      console.log('Opslaan:', values)
      return true
    },
    type: 'feature',
  },
}
