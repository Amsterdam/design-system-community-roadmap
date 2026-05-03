import type { Meta, StoryObj } from '@storybook/react-vite'

import Navigation from '@design-system-community-roadmap/ui'

import styles from './page-layout.module.scss'

const meta = {
  title: 'Organisms/Navigation',
  component: Navigation,
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      story: { autoplay: true },
    },
  },
}

export const WithContent: Story = {
  render: () => (
    <>
      <Navigation />
      <main className={styles.main}>
        <h1>Welkom</h1>
        <p>
          Hier vind je alle ideeën en plannen voor de Community Roadmap. Bekijk de ingediende ideeën of ga naar de
          roadmap om te zien wat er op de planning staat.
        </p>
        <ul>
          <li>
            <a href="#">Idee: Verbeterde zoekfunctie</a>
          </li>
          <li>
            <a href="#">Idee: Dark mode ondersteuning</a>
          </li>
          <li>
            <a href="#">Idee: Exporteren naar PDF</a>
          </li>
        </ul>
      </main>
    </>
  ),
}
