import type { Core } from '@strapi/strapi'

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  console.log('Starting seeding...')

  const endUserNames = [
    'Bram',
    'Daan',
    'Sem',
    'Lucas',
    'Luuk',
    'Levi',
    'Mees',
    'Finn',
    'James',
    'Milan',
    'Julia',
    'Sophie',
    'Emma',
    'Tess',
    'Zoë',
    'Mila',
    'Sara',
    'Eva',
    'Noor',
    'Yara',
    'Lars',
    'Jesse',
    'Hugo',
    'Thijs',
    'Sander',
    'Lotte',
    'Lieke',
    'Isa',
    'Fleur',
    'Anne',
  ]

  const EMOJI_OPTIONS = [
    '🦊',
    '🐼',
    '🦁',
    '🐸',
    '🦋',
    '🐙',
    '🦄',
    '🐻',
    '🦅',
    '🐳',
    '🌵',
    '🍕',
    '🎸',
    '🚀',
    '🌈',
    '🎯',
    '⭐',
    '🌻',
    '🍀',
    '🎮',
    '🏄',
    '🧩',
    '🎨',
    '🔮',
    '🏔️',
    '🌊',
    '🦀',
    '🍉',
    '🎭',
    '🧸',
  ]

  const endUsers = []
  for (const name of endUserNames) {
    const user = await strapi.documents('api::end-user.end-user').create({
      data: {
        emoji: EMOJI_OPTIONS[Math.floor(Math.random() * EMOJI_OPTIONS.length)],
        isTeam: false,
        name,
      },
      status: 'published',
    })
    endUsers.push(user)
  }

  const teamUser = await strapi.documents('api::end-user.end-user').create({
    data: {
      emoji: '❌',
      isTeam: true,
      name: 'Amsterdam Design System Team',
    },
    status: 'published',
  })

  const ideaData: { content: string; status: 'in_review' | 'accepted' | 'postponed'; title: string }[] = [
    {
      title: 'Donkere Modus',
      content:
        'Zou het mogelijk zijn om een donkere modus toe te voegen aan het design system? Veel gebruikers vragen hierom voor gebruik in de avond.',
      status: 'accepted',
    },
    {
      title: 'Gedeelde Icon Library',
      content:
        'Een centrale plek voor alle iconen die binnen de gemeente worden gebruikt, zodat we consistent blijven.',
      status: 'in_review',
    },
    {
      title: 'Auto-complete voor Adresvelden',
      content: 'Het invullen van adressen gaat nu vaak fout. Een betere auto-complete zou enorm helpen.',
      status: 'accepted',
    },
    {
      title: 'PDF Export Functionaliteit',
      content: 'Direct vanuit de browser een nette PDF genereren op basis van de ADS componenten.',
      status: 'postponed',
    },
    {
      title: 'Chat Component',
      content: 'Voor klantcontact is een standaard chat component erg gewenst.',
      status: 'in_review',
    },
    {
      title: 'Kalender Widget',
      content: 'Een uitgebreide kalender voor het plannen van afspraken bij de balie.',
      status: 'accepted',
    },
    {
      title: 'Drag and Drop Ondersteuning',
      content: 'Voor het uploaden van documenten en het sorteren van lijsten.',
      status: 'in_review',
    },
    {
      title: 'Betere TypeScript Ondersteuning',
      content: 'Sommige types in de React library zijn nu nog "any". Dit kan beter.',
      status: 'accepted',
    },
    {
      title: 'Micro-interacties voor Knoppen',
      content: 'Kleine animaties die feedback geven wanneer een gebruiker op een knop klikt.',
      status: 'in_review',
    },
    {
      title: 'Skelet Schermen (Skeleton Screens)',
      content: 'Voor een betere beleving tijdens het laden van data.',
      status: 'accepted',
    },
  ]

  const ideas = []
  for (const data of ideaData) {
    const idea = await strapi.documents('api::idea.idea').create({
      data: {
        ...data,
        end_users: [endUsers[Math.floor(Math.random() * endUsers.length)].documentId],
      },
      status: 'published',
    })
    ideas.push(idea)
  }

  const roadmapData = [
    {
      title: 'Donkere Modus Ondersteuning',
      content: 'Het implementeren van een volledig thema-systeem met ondersteuning voor donkere modus.',
      endDate: '2026-06-15',
      features: [
        {
          title: 'Onderzoek kleurenpallet',
          content: 'Analyse van bestaande kleuren en hoe deze vertalen naar dark mode.',
          endDate: '2026-04-15',
          startDate: '2026-04-01',
        },
        {
          title: 'Design Tokens aanpassen',
          content: 'Het updaten van de tokens in Figma en code.',
          endDate: '2026-05-10',
          startDate: '2026-04-16',
        },
        {
          title: 'Implementatie React components',
          content: 'Aanpassen van alle basis componenten in de React library.',
          endDate: '2026-06-01',
          startDate: '2026-05-11',
        },
        {
          title: 'Documentatie schrijven',
          content: 'Richtlijnen toevoegen aan de website.',
          endDate: '2026-06-15',
          startDate: '2026-06-02',
        },
      ],
      idea: ideas[0],
      startDate: '2026-04-01',
    },
    {
      title: 'Data Visualisatie Componenten',
      content: 'Een set van toegankelijke grafieken en diagrammen.',
      endDate: '2026-08-30',
      features: [
        {
          title: 'Bar chart component',
          content: 'Basis staafdiagram met ondersteuning voor schermlezers.',
          endDate: '2026-06-15',
          startDate: '2026-05-15',
        },
        {
          title: 'Line chart component',
          content: 'Lijngrafiek voor tijdreeksen.',
          endDate: '2026-07-15',
          startDate: '2026-06-16',
        },
        {
          title: 'Interactiviteit toevoegen',
          content: 'Tooltips en zoom functionaliteit.',
          endDate: '2026-08-10',
          startDate: '2026-07-16',
        },
        {
          title: 'Theming voor charts',
          content: 'Zorgen dat grafieken de ADS kleuren gebruiken.',
          endDate: '2026-08-30',
          startDate: '2026-08-11',
        },
      ],
      idea: ideas[1],
      startDate: '2026-05-15',
    },
    {
      title: 'Formulier Validatie Library',
      content: 'Een krachtige library voor complexe formulier validatie.',
      endDate: '2026-09-15',
      features: [
        {
          title: 'Validatie regels opstellen',
          content: 'Definiëren van standaard validatie voor adressen, BSN, etc.',
          endDate: '2026-06-30',
          startDate: '2026-06-01',
        },
        {
          title: 'React Hooks integratie',
          content: 'Naadloze aansluiting op React Hook Form.',
          endDate: '2026-08-15',
          startDate: '2026-07-01',
        },
        {
          title: 'Foutmeldingen UI',
          content: 'Toegankelijke weergave van foutmeldingen bij invoervelden.',
          endDate: '2026-09-15',
          startDate: '2026-08-16',
        },
      ],
      idea: ideas[2],
      startDate: '2026-06-01',
    },
    {
      title: 'Layout Grid Systeem v2',
      content: 'Verbeteringen aan het grid systeem voor meer flexibiliteit.',
      endDate: '2026-10-31',
      features: [
        {
          title: 'Flexbox naar CSS Grid migratie',
          content: 'De kern van het grid systeem moderniseren.',
          endDate: '2026-08-31',
          startDate: '2026-08-01',
        },
        {
          title: 'Nieuwe breakpoints',
          content: 'Betere ondersteuning voor ultrawide monitoren.',
          endDate: '2026-09-15',
          startDate: '2026-09-01',
        },
        {
          title: 'Auto-layout componenten',
          content: 'Componenten die zichzelf indelen op basis van beschikbare ruimte.',
          endDate: '2026-10-31',
          startDate: '2026-09-16',
        },
      ],
      idea: ideas[4],
      startDate: '2026-08-01',
    },
    {
      title: 'Animatie Library',
      content: 'Standaard animaties voor een vloeibare gebruikerservaring.',
      endDate: '2026-11-30',
      features: [
        {
          title: 'Framer Motion integratie',
          content: 'Onderzoek naar de beste basis library.',
          endDate: '2026-09-30',
          startDate: '2026-09-01',
        },
        {
          title: 'Standaard transities',
          content: 'Fade, slide en scale animaties voor modals en dropdowns.',
          endDate: '2026-10-31',
          startDate: '2026-10-01',
        },
        {
          title: 'Reduced motion support',
          content: 'Optie om animaties uit te schakelen voor toegankelijkheid.',
          endDate: '2026-11-30',
          startDate: '2026-11-01',
        },
      ],
      idea: ideas[8],
      startDate: '2026-09-01',
    },
    {
      title: 'Toegankelijkheids Audit Tool',
      content: 'Een tool die automatisch de toegankelijkheid van ADS applicaties checkt.',
      endDate: '2026-07-15',
      features: [
        {
          title: 'Axe-core integratie',
          content: 'Automatische tests in de browser console.',
          endDate: '2026-05-15',
          startDate: '2026-04-15',
        },
        {
          title: 'Dashboard voor rapportages',
          content: 'Overzicht van gevonden problemen.',
          endDate: '2026-06-30',
          startDate: '2026-05-16',
        },
        {
          title: 'CI/CD plugin',
          content: 'Blokkeer deployments bij ernstige toegankelijkheidsfouten.',
          endDate: '2026-07-15',
          startDate: '2026-07-01',
        },
      ],
      idea: ideas[9],
      startDate: '2026-04-15',
    },
  ]

  for (const sData of roadmapData) {
    const story = await strapi.documents('api::story.story').create({
      data: {
        title: sData.title,
        content: sData.content,
        endDate: sData.endDate,
        startDate: sData.startDate,
      },
      status: 'published',
    })

    for (const fData of sData.features) {
      await strapi.documents('api::feature.feature').create({
        data: {
          title: fData.title,
          content: fData.content,
          endDate: fData.endDate,
          idea: sData.idea.documentId,
          startDate: fData.startDate,
          story: story.documentId,
        },
        status: 'published',
      })
    }
  }

  const dutchReactions = [
    'Dit zou echt helpen voor onze formulieren!',
    'Is dit ook toegankelijk voor schermlezers?',
    'We hebben dit hard nodig voor het nieuwe portaal.',
    'Kan dit ook in een donker thema?',
    'Zijn hier al voorbeelden van in Figma?',
    'Ik loop hier vaak tegenaan bij het bouwen van componenten.',
    'Goede toevoeging, bespaart ons veel tijd.',
    'Komt er ook ondersteuning voor mobiel?',
    'Wanneer verwachten jullie dit op te leveren?',
    'Mooi initiatief, ik denk graag mee!',
    'Zou fijn zijn als dit ook met Tailwind werkt.',
    'Eindelijk! Hier zaten we op te wachten.',
    'Wat betekent dit voor de huidige componenten?',
    'Krijgt de documentatie ook een update?',
    'Heel gaaf, ik ga dit meteen testen zodra het af is.',
  ]

  const teamReactions = [
    'Bedankt voor het meedenken! We gaan dit meenemen in de planning voor Q3.',
    'Dit idee sluit goed aan bij onze visie. We gaan het implementeren!',
    'Op dit moment hebben we hier helaas geen capaciteit voor, maar we houden het in gedachten.',
    'We hebben dit besproken en besloten om het voorlopig niet te doen.',
    'Interessant punt! Kun je hier meer details over geven?',
  ]

  const allStories = await strapi.documents('api::story.story').findMany()
  const allFeatures = await strapi.documents('api::feature.feature').findMany()
  const allIdeas = await strapi.documents('api::idea.idea').findMany()

  for (const idea of allIdeas) {
    const reactions = []
    const numReactions = Math.floor(Math.random() * 4) + 1
    for (let i = 0; i < numReactions; i++) {
      reactions.push({
        content: dutchReactions[Math.floor(Math.random() * dutchReactions.length)],
        end_user: endUsers[Math.floor(Math.random() * endUsers.length)].documentId,
      })
    }

    if (Math.random() > 0.4) {
      reactions.push({
        content: teamReactions[Math.floor(Math.random() * teamReactions.length)],
        end_user: teamUser.documentId,
      })
    }

    await strapi.documents('api::idea.idea').update({
      data: { reactions },
      documentId: idea.documentId,
    })

    const numLikes = Math.floor(Math.random() * 10)
    for (let i = 0; i < numLikes; i++) {
      await strapi.documents('api::idea-like.idea-like').create({
        data: {
          end_user: endUsers[Math.floor(Math.random() * endUsers.length)].documentId,
          idea: idea.documentId,
        },
        status: 'published',
      })
    }
  }

  const entities = [...allStories, ...allFeatures]
  const entityTypes = [...allStories.map(() => 'api::story.story'), ...allFeatures.map(() => 'api::feature.feature')]
  const likeTypes = [
    ...allStories.map(() => 'api::story-like.story-like'),
    ...allFeatures.map(() => 'api::feature-like.feature-like'),
  ]
  const relationFields = [...allStories.map(() => 'story'), ...allFeatures.map(() => 'feature')]

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]
    const type = entityTypes[i] as any
    const likeType = likeTypes[i] as any
    const relationField = relationFields[i]

    const reactions = []
    const numReactions = Math.floor(Math.random() * 3)
    for (let j = 0; j < numReactions; j++) {
      reactions.push({
        content: dutchReactions[Math.floor(Math.random() * dutchReactions.length)],
        end_user: endUsers[Math.floor(Math.random() * endUsers.length)].documentId,
      })
    }

    await strapi.documents(type).update({
      data: { reactions },
      documentId: entity.documentId,
    })

    const numLikes = Math.floor(Math.random() * 5)
    for (let j = 0; j < numLikes; j++) {
      await strapi.documents(likeType).create({
        data: {
          end_user: endUsers[Math.floor(Math.random() * endUsers.length)].documentId,
          [relationField]: entity.documentId,
        },
        status: 'published',
      })
    }
  }

  console.log('Seeding completed!')
}
