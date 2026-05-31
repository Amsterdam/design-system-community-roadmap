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
    '🧩',
    '🎯',
    '⭐',
    '🌻',
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

  const teamMembers = []
  for (const { emoji, name } of [
    { emoji: '🎯', name: 'Vincent' },
    { emoji: '🚀', name: 'Bas' },
    { emoji: '🌻', name: 'Evi' },
    { emoji: '🧩', name: 'Niels' },
  ]) {
    const member = await strapi.documents('api::end-user.end-user').create({
      data: { emoji, isTeam: true, name },
      status: 'published',
    })
    teamMembers.push(member)
  }

  function randomTeamMember() {
    return teamMembers[Math.floor(Math.random() * teamMembers.length)]
  }

  const ideaData: {
    content: string
    statusIdea: 'accepted' | 'in_review' | 'postponed'
    title: string
  }[] = [
    {
      title: 'Donkere Modus',
      content:
        'Zou het mogelijk zijn om een donkere modus toe te voegen aan het design system? Veel gebruikers vragen hierom voor gebruik in de avond of in omgevingen met weinig licht.',
      statusIdea: 'accepted',
    },
    {
      title: 'Gedeelde Icon Library',
      content:
        'Een centrale plek voor alle iconen die binnen de gemeente worden gebruikt, zodat we consistent blijven en geen dubbele sets bijhouden.',
      statusIdea: 'in_review',
    },
    {
      title: 'Auto-complete voor Adresvelden',
      content:
        'Het invullen van adressen gaat nu vaak fout doordat gebruikers vrije tekst invoeren. Een gestandaardiseerde auto-complete zou de invoerkwaliteit enorm verbeteren.',
      statusIdea: 'in_review',
    },
    {
      title: 'PDF Export Functionaliteit',
      content:
        'Direct vanuit de browser een nette PDF genereren op basis van ADS-componenten. Dit wordt gevraagd voor afschriften en bevestigingsbrieven.',
      statusIdea: 'postponed',
    },
    {
      title: 'Chat Component',
      content:
        'Voor klantcontact via portalen is een standaard chat-component erg gewenst. Dit zou communicatie via meerdere kanalen kunnen stroomlijnen.',
      statusIdea: 'in_review',
    },
    {
      title: 'Kalender Widget',
      content:
        'Een uitgebreide kalender voor het plannen van afspraken bij de balie. Moet tijdsloten, meerdere medewerkers en bezettingsgraad kunnen tonen.',
      statusIdea: 'accepted',
    },
    {
      title: 'Drag and Drop Ondersteuning',
      content:
        'Voor het uploaden van documenten en het herordenen van lijstitems is drag-and-drop erg gewenst. Nu moeten gebruikers altijd via een bestandskiezer werken.',
      statusIdea: 'in_review',
    },
    {
      title: 'Betere TypeScript Ondersteuning',
      content:
        'Sommige typen in de React library zijn nu nog "any". Dit zorgt voor minder veilige code bij teams die TypeScript strict mode gebruiken.',
      statusIdea: 'postponed',
    },
    {
      title: 'Micro-interacties voor Knoppen',
      content:
        'Kleine animaties die directe feedback geven wanneer een gebruiker op een knop klikt of een formulier verstuurt. Verbetert de beleefde snelheid.',
      statusIdea: 'accepted',
    },
    {
      title: 'Skelet Schermen (Skeleton Screens)',
      content:
        'Vervang lege laadstaten door skeleton-schermen zodat de pagina minder "springt" bij het laden van data. Dit is standaard in moderne applicaties.',
      statusIdea: 'accepted',
    },
    {
      title: 'Toast Notificaties',
      content:
        'Een gestandaardiseerd toast-component voor korte meldingen zoals "Wijzigingen opgeslagen" of "Verbinding verbroken". Nu lost elk team dit op zijn eigen manier op.',
      statusIdea: 'in_review',
    },
    {
      title: 'Stappenplan Component (Stepper)',
      content:
        'Voor formulieren met meerdere stappen, zoals aanvragen voor vergunningen, is een Stepper-component erg gewenst. Toont voortgang en helpt gebruikers oriënteren.',
      statusIdea: 'in_review',
    },
    {
      title: 'Bestandsuploader met Preview',
      content:
        'Een uploader die bestanden direct toont voordat ze worden verstuurd, inclusief validatie van bestandstype en grootte. Vooral voor het uploaden van bewijsstukken.',
      statusIdea: 'postponed',
    },
    {
      title: 'Tabbladen Component',
      content:
        'Een toegankelijk Tabs-component dat voldoet aan de WAI-ARIA Authoring Practices. Nu bouwen teams dit zelf, vaak zonder volledige keyboard-ondersteuning.',
      statusIdea: 'in_review',
    },
    {
      title: 'Verbeterde Foutmeldingen',
      content:
        'Foutmeldingen die niet alleen vertellen wat er fout is, maar ook hoe de gebruiker het kan oplossen. Inclusief richtlijnen voor consistent taalgebruik.',
      statusIdea: 'in_review',
    },
    {
      title: 'Data Tabel met Sorteren en Filteren',
      content:
        'Voor het tonen van grote datasets is een tabel met sorteer-, filter- en paginatiefuncties noodzakelijk. Moet ook werken met screenreaders.',
      statusIdea: 'accepted',
    },
    {
      title: 'Modal/Dialog Verbeteringen',
      content:
        'De huidige modal mist focus-trapping en goede ondersteuning voor geneste dialogen. Een herziening volgens de Dialog-pattern van ARIA zou welkom zijn.',
      statusIdea: 'in_review',
    },
    {
      title: 'Tooltip Component',
      content:
        'Een toegankelijke tooltip voor extra context bij iconen of afkortingen. Moet op touch devices ook bruikbaar zijn, niet alleen bij hover.',
      statusIdea: 'in_review',
    },
    {
      title: 'Kleurcontrast Checker in Storybook',
      content:
        'Een addon in Storybook die automatisch het contrast van componenten controleert tegen WCAG AA en AAA. Helpt designers en developers eerder problemen op te sporen.',
      statusIdea: 'postponed',
    },
    {
      title: 'Breadcrumb Component',
      content:
        'Voor diepere navigatiestructuren binnen portalen ontbreekt een gestandaardiseerd breadcrumb-component. Vooral handig bij dossiers en zaaksystemen.',
      statusIdea: 'in_review',
    },
    {
      title: 'Internationalisatie (i18n) Ondersteuning',
      content:
        'Componenten met tekst (zoals datepickers en paginatie) moeten meerdere talen ondersteunen. Belangrijk voor anderstalige inwoners van Amsterdam.',
      statusIdea: 'postponed',
    },
    {
      title: 'Print Templates voor Brieven',
      content:
        'Standaard sjablonen voor officiële brieven die voldoen aan de huisstijl en goed printen op gemeentelijk briefpapier. Bespaart teams veel dubbel werk.',
      statusIdea: 'postponed',
    },
    {
      title: 'Component voor Inloggen met DigiD',
      content:
        'Een herbruikbare knop en flow voor DigiD-authenticatie, inclusief alle visuele richtlijnen van Logius. Nu wordt dit per applicatie opnieuw geïmplementeerd.',
      statusIdea: 'in_review',
    },
    {
      title: 'Animatie Richtlijnen',
      content:
        'Documentatie en tokens voor animaties: duur, easing en wanneer animaties wel of niet gepast zijn. Inclusief respect voor `prefers-reduced-motion`.',
      statusIdea: 'in_review',
    },
    {
      title: 'Pictogrammen voor Voortgangsstatussen',
      content:
        'Een set van duidelijke pictogrammen voor statussen als "in behandeling", "afgerond" en "afgewezen". Helpt gebruikers snel de stand van zaken te zien.',
      statusIdea: 'in_review',
    },
  ]

  const ideas = []
  for (let index = 0; index < ideaData.length; index++) {
    const data = ideaData[index]

    const idea = await strapi.documents('api::idea.idea').create({
      data: {
        ...data,
        end_users: [endUsers[Math.floor(Math.random() * endUsers.length)].documentId],
      },
      status: 'published',
    })
    ideas.push(idea)
  }

  const [ideaDarkMode, , , , , ideaCalendar, , , ideaMicroInteractions, ideaSkeletonScreens, , , , , , ideaDataTable] =
    ideas

  const roadmapData: {
    feature: {
      content: string
      endDate: string
      idea?: { documentId: string }
      startDate: string
      title: string
    }
    stories: {
      content: string
      endDate: string
      startDate: string
      title: string
    }[]
  }[] = [
    {
      feature: {
        title: 'Grijze achtergrond applicaties',
        content:
          'Interne applicaties van de gemeente Amsterdam gebruiken een grijze achtergrond in plaats van de standaard witte. De API is uitgebreid met een achtergrondkleur-prop. PR is afgerond en gemerged in v4.0.0.',
        endDate: '2026-05-17',
        startDate: '2026-05-01',
      },
      stories: [
        {
          title: 'Overleggen met UX',
          content:
            'Ontwerp- en implementatiekeuzes voor de grijze achtergrond afstemmen met het UX-team. Bepaal wanneer grijs de voorkeur heeft boven wit en hoe dit terugkomt in het componentontwerp.',
          endDate: '2026-05-07',
          startDate: '2026-05-01',
        },
        {
          title: 'API bepalen',
          content:
            'De meest passende API bepalen voor de achtergrondkleur-prop. Keuze vastleggen: token-gebaseerde prop, className-variant of thema-data-attribuut.',
          endDate: '2026-05-10',
          startDate: '2026-05-06',
        },
        {
          title: 'Implementeren',
          content:
            'De gekozen API implementeren in de relevante layout-componenten. PR klaarmaken, reviewen en mergen in v4.0.0.',
          endDate: '2026-05-17',
          startDate: '2026-05-09',
        },
      ],
    },
    {
      feature: {
        title: 'Print Stylesheet',
        content:
          'Verbeterde printondersteuning voor alle ADS-componenten. De basis werkte al goed; in deze feature zijn de screen-media-queries gecheckt, alle componenten gevalideerd en brede componenten responsive gemaakt voor A4-papierformaat.',
        endDate: '2026-05-22',
        startDate: '2026-05-01',
      },
      stories: [
        {
          title: 'Bestaande screen-media-queries aanpassen voor print',
          content:
            'Doorloop alle bestaande CSS-regels en zorg dat ze correct gelden voor `@media print`. Verwijder of verberg niet-afdrukbare UI-elementen zoals navigatie, knoppen en interactieve states.',
          endDate: '2026-05-10',
          startDate: '2026-05-01',
        },
        {
          title: 'Alle componenten controleren op printweergave',
          content:
            'Druk elke componentpagina af via printvoorvertoning en documenteer afwijkingen. Prioriteer complexe componenten als Table en Modal.',
          endDate: '2026-05-18',
          startDate: '2026-05-10',
        },
        {
          title: 'Brede componenten responsive maken voor print',
          content:
            'Pas componenten aan die te breed zijn voor A4-papierformaat. Gebruik `overflow-wrap`, responsieve kolommen of page-break hints om een nette afdruk te garanderen.',
          endDate: '2026-05-22',
          startDate: '2026-05-18',
        },
      ],
    },
    {
      feature: {
        title: 'Calendar',
        content:
          'Een Calendar-component voor het weergeven en selecteren van datums in afsprakensystemen en planningsportalen. Een werkende POC staat klaar; deze sprint wordt het component afgebouwd en de Definition of Done bepaald.',
        endDate: '2026-06-06',
        idea: ideaCalendar,
        startDate: '2026-05-05',
      },
      stories: [
        {
          title: 'POC Calendar-component evalueren',
          content:
            'Beoordeel de bestaande POC op toegankelijkheid (ARIA grid-patroon), keyboardnavigatie en integratie met ADS-tokens. Lijst bevindingen en gewenste aanpassingen op.',
          endDate: '2026-05-16',
          startDate: '2026-05-05',
        },
        {
          title: 'Definition of Done bepalen',
          content:
            'Stel de DOD op: welke functies moet de kalender ondersteunen bij v1 (enkelvoudige datum, bereik, lokalisatie nl-NL)? Wat is buiten scope?',
          endDate: '2026-05-24',
          startDate: '2026-05-16',
        },
        {
          title: 'Calendar component afbouwen en documenteren',
          content:
            "Verwerk de bevindingen van de POC-evaluatie, implementeer de ontbrekende DOD-items en schrijf de componentdocumentatie inclusief Storybook-stories met toegankelijkheidsnota's.",
          endDate: '2026-06-06',
          startDate: '2026-05-24',
        },
      ],
    },
    {
      feature: {
        title: 'Data Table',
        content:
          'Uitgebreide functionaliteit voor de ADS Data Table: sortering, filtering, paginering en geselecteerde rijen. POC-feedback is verwerkt; de component wordt snel daarna als voorbeeldtemplate gepubliceerd.',
        endDate: '2026-07-04',
        idea: ideaDataTable,
        startDate: '2026-05-05',
      },
      stories: [
        {
          title: 'Sorting implementeren',
          content:
            'Voeg sorteerbare kolomkoppen toe aan de Data Table met correcte ARIA-attributen (`aria-sort`). Implementeer oplopende/aflopende sortering en toegankelijke aankondiging van volgordeveranderingen.',
          endDate: '2026-05-24',
          startDate: '2026-05-05',
        },
        {
          title: 'Filtering toevoegen',
          content:
            'Bouw een filterrij waarmee gebruikers de getoonde rijen kunnen beperken. Besluit of filtering client-side werkt of via event/callback voor server-side data.',
          endDate: '2026-06-14',
          startDate: '2026-05-24',
        },
        {
          title: 'Paginering',
          content:
            'Integreer de bestaande Pagination-component met de Data Table. Ondersteuning voor instelbaar aantal rijen per pagina en weergave van het totaal aantal resultaten.',
          endDate: '2026-06-28',
          startDate: '2026-06-14',
        },
        {
          title: 'Geselecteerde rij state',
          content:
            'Voeg een selected-state toe aan tabelrijen voor gebruik in selectie-interfaces. Ondersteun enkelvoudige en meervoudige selectie; voeg een "Alles selecteren"-checkbox toe in de kolomkop.',
          endDate: '2026-07-04',
          startDate: '2026-06-28',
        },
      ],
    },
    {
      feature: {
        title: 'Rich Content',
        content:
          'Ondersteuning voor opgemaakte tekst in ADS-toepassingen. Bepaalt welke inline opmaak toegestaan is, biedt een container-component en losse inline-opmaakelementem. Krijgt prioriteit vanwege de nieuwe ADS-website; POC met Card en Field-iteraties ziet er goed uit.',
        endDate: '2026-06-13',
        startDate: '2026-05-06',
      },
      stories: [
        {
          title: 'Bepalen welke opmaak we willen toestaan',
          content:
            'Vaststellen welke HTML-elementen de Rich Content Container ondersteunt: headings, paragrafen, lijsten, links, inline code en citaten. Beslissing vastleggen als ADR.',
          endDate: '2026-05-17',
          startDate: '2026-05-06',
        },
        {
          title: 'Rich Content Container component maken',
          content:
            'Implementeer de `RichContent`-container die de toegestane opmaak styleet en fungeert als veilige wrapper voor CMS-gegenereerde HTML. Inclusief overflowbeveiliging en sanitatie-documentatie.',
          endDate: '2026-06-06',
          startDate: '2026-05-17',
        },
        {
          title: 'Componenten voor inline opmaak',
          content:
            'Bouw losse inline-opmaakelementem: `Mark` (markeertekst), `Kbd` (toetscombinaties) en `Abbr` (afkortingen). Voeg alle nieuwe elementen toe aan de documentatiesite.',
          endDate: '2026-06-13',
          startDate: '2026-06-06',
        },
      ],
    },
    {
      feature: {
        title: 'Animatie',
        content:
          'Standaard animaties voor vloeiende UI-overgangen in ADS-componenten. Focus op inklapbare en uitklapbare disclosure-componenten en subtiele kleurtransities. Animaties worden naast nieuwe features ontwikkeld, niet in plaats van.',
        endDate: '2026-07-18',
        idea: ideaMicroInteractions,
        startDate: '2026-05-12',
      },
      stories: [
        {
          title: 'Experiment inklapbare Progress List',
          content:
            'Bouw een werkend prototype voor het in- en uitklappen van de Progress List met CSS transitions. Documenteer de gekozen aanpak en het gedrag bij `prefers-reduced-motion: reduce`.',
          endDate: '2026-05-31',
          startDate: '2026-05-12',
        },
        {
          title: 'Kleurtransities bij hover en focus',
          content:
            'Voeg vloeiende kleurtransities toe aan interactieve componenten (Button, Link, Card) voor hover- en focusstates. Gebruik design tokens voor duration en easing.',
          endDate: '2026-06-20',
          startDate: '2026-06-01',
        },
        {
          title: 'Animatie in Disclosure-componenten',
          content:
            'Implementeer in- en uitklapanimaties in Accordion en Details. Gebruik de CSS `interpolate-size` property waar ondersteund; bied een JS-fallback aan voor overige browsers.',
          endDate: '2026-07-18',
          startDate: '2026-06-21',
        },
      ],
    },
    {
      feature: {
        title: 'Better Dependabot Integration',
        content:
          'Verbetering van de Dependabot-workflow voor bibliotheekgebruikers. Als library kunnen we de configuratie van afhankelijke applicaties niet direct beïnvloeden, maar we documenteren best practices en leveren kant-en-klare voorbeeldconfiguraties.',
        endDate: '2026-06-27',
        startDate: '2026-06-09',
      },
      stories: [
        {
          title: 'Dependabot best practices documenteren',
          content:
            'Schrijf documentatie over hoe teams Dependabot optimaal instellen voor ADS-pakket-updates. Behandel grouping, labels, reviewers en auto-merge configuratie.',
          endDate: '2026-06-18',
          startDate: '2026-06-09',
        },
        {
          title: 'Documentatie PR publiceren',
          content:
            'Verwerk reviewfeedback op de documentatie-PR en publiceer de pagina op de ADS-website. Voeg voorbeeld `.github/dependabot.yml`-configuraties toe als kopieerbare snippets.',
          endDate: '2026-06-27',
          startDate: '2026-06-18',
        },
      ],
    },
    {
      feature: {
        title: 'Full Screen Layout',
        content:
          'Een Full Screen Layout-component voor applicaties die de volledige viewportruimte nodig hebben, zoals kaartviewers, dataweergaven en interne tools. Kleine scope, maar ontbreekt als gestandaardiseerd component in de ADS.',
        endDate: '2026-07-10',
        startDate: '2026-06-16',
      },
      stories: [
        {
          title: 'Requirements inventariseren',
          content:
            'Inventariseer welke gemeentelijke applicaties een full-screen layout nodig hebben. Bepaal de minimale API: welke slots (header, aside, main, footer), scroll-gedrag en breakpoint-behandeling zijn nodig?',
          endDate: '2026-06-23',
          startDate: '2026-06-16',
        },
        {
          title: 'Full Screen Layout component bouwen',
          content:
            'Implementeer de `FullScreenLayout`-component met de vastgestelde slots. Gebruik CSS Grid; zorg dat de component de viewport vult zonder `height: 100vh` problemen op mobiel.',
          endDate: '2026-07-06',
          startDate: '2026-06-23',
        },
        {
          title: 'Documentatie en Storybook-stories schrijven',
          content:
            'Schrijf de componentdocumentatie met gebruiksrichtlijnen, een interactieve Storybook-story en een voorbeeldpagina die toont hoe Full Screen Layout samenwerkt met de Header en Sidebar-componenten.',
          endDate: '2026-07-10',
          startDate: '2026-07-06',
        },
      ],
    },
    {
      feature: {
        title: 'Navigatie in applicaties',
        content:
          "Verbetering van navigatiepatronen voor applicaties: submenu's in de Menu-component, een duidelijke weergave van het actieve item en veelgebruikte vervolgmenu-ontwerpen in de bestaande API. Mogelijk wordt Tab Navigation als apart component afgesplitst van Tabs.",
        endDate: '2026-08-14',
        startDate: '2026-06-02',
      },
      stories: [
        {
          title: 'Submenu ontwerpen en bouwen',
          content:
            'Ontwerp en implementeer submenu-ondersteuning in de Menu-component. Specificeer keyboardinteractie (pijltjestoetsen, Escape), animatie en de ARIA-structuur (role=menu, aria-haspopup).',
          endDate: '2026-06-28',
          startDate: '2026-06-02',
        },
        {
          title: 'Vormgeving current item',
          content:
            'Definieer een duidelijke visuele weergave voor het actieve of huidige navigatie-item. Stem af met UX op de distinctie tussen "huidig pad" en "gefocust item". Documenteer de `aria-current`-aanpak.',
          endDate: '2026-07-19',
          startDate: '2026-06-28',
        },
        {
          title: "Veelgebruikte ontwerpen vervolgmenu's opnemen in bestaande API",
          content:
            "Inventariseer de meest gebruikte patronen voor vervolgmenu's in gemeentelijke applicaties en codeer deze als API-varianten of voorbeeldtemplates. Onderzoek of Tab Navigation als afzonderlijk component nut heeft.",
          endDate: '2026-08-14',
          startDate: '2026-07-19',
        },
      ],
    },
    {
      feature: {
        title: 'Language Navigation',
        content:
          'Een gestandaardiseerde taalnavigatiecomponent voor meertalige gemeentelijke applicaties en websites. Bevindingen van NLDS worden gebruikt als basis; WCAG-vereisten voor taalwisseling worden gevolgd.',
        endDate: '2026-08-28',
        startDate: '2026-07-06',
      },
      stories: [
        {
          title: 'Check bij NLDS en andere design systems',
          content:
            'Inventariseer hoe NLDS, GOV.UK Design System en andere relevante systemen taalnavigatie implementeren. Documenteer gevonden patronen en WCAG-vereisten (o.a. `hreflang`, `lang`-attribuut op items).',
          endDate: '2026-07-18',
          startDate: '2026-07-06',
        },
        {
          title: 'Taalnavigatie component ontwerpen',
          content:
            'Ontwerp de `LanguageNavigation`-component op basis van het onderzoek. Specificeer de HTML-structuur (nav + list), het visuele ontwerp en de interactie voor zowel desktop als mobiel.',
          endDate: '2026-08-08',
          startDate: '2026-07-18',
        },
        {
          title: 'Implementeren en documenteren',
          content:
            'Bouw de component conform het goedgekeurde ontwerp en schrijf de documentatie met integratie-instructies voor Next.js en andere frameworks die ADS gebruiken.',
          endDate: '2026-08-28',
          startDate: '2026-08-08',
        },
      ],
    },
    {
      feature: {
        title: 'Right-to-left Support',
        content:
          'Formele ondersteuning voor right-to-left tekstrichtingen (Arabisch, Hebreeuws). De ADS-codebase gebruikt al logical properties waardoor de basis gereed is. Aanleiding ontbreekt momenteel, maar de kosten zijn laag.',
        endDate: '2026-08-21',
        startDate: '2026-07-14',
      },
      stories: [
        {
          title: 'Audit op het gebruik van logical properties',
          content:
            'Scan alle componenten op gebruik van fysieke CSS-properties (left, right, margin-left, padding-right, etc.) en vervang ze door logische equivalenten (inline-start, inline-end). Genereer een auditrapport.',
          endDate: '2026-07-28',
          startDate: '2026-07-14',
        },
        {
          title: 'Ontbrekende RTL-aanpassingen doorvoeren',
          content:
            'Verwerk de auditbevindingen: vervang resterende fysieke properties, pas icon-mirror-logica toe waar nodig en test alle componenten met een Arabisch `dir="rtl"`-attribuut.',
          endDate: '2026-08-15',
          startDate: '2026-07-28',
        },
        {
          title: 'RTL-documentatiepagina en testomgeving toevoegen',
          content:
            'Voeg een RTL-testpagina toe aan de documentatiesite waarop alle componenten in RTL-modus te bekijken zijn. Schrijf gebruiksrichtlijnen voor teams die meertalige toepassingen bouwen.',
          endDate: '2026-08-21',
          startDate: '2026-08-15',
        },
      ],
    },
    {
      feature: {
        title: 'Map Patterns',
        content:
          'Gestandaardiseerde patronen voor het integreren van kaartvisualisaties in gemeentelijke applicaties. Gebaseerd op Leaflet en opgebouwd met ADS-componenten, in samenwerking met het Data-team en EE.',
        endDate: '2026-09-18',
        startDate: '2026-07-20',
      },
      stories: [
        {
          title: 'Inventariseren',
          content:
            'Breng in kaart welke teams en applicaties Leaflet, MapLibre of andere kaartbibliotheken gebruiken. Documenteer de gemeenschappelijke patronen: markers, lagen, popups en zoomcontrols.',
          endDate: '2026-08-01',
          startDate: '2026-07-20',
        },
        {
          title: 'Ervaring en code ophalen bij Data',
          content:
            'Ga in gesprek met het Data-team om hun bestaande Leaflet-implementaties te inventariseren. Neem bruikbare code en ontwerpen mee als basis voor de ADS-integratie.',
          endDate: '2026-08-22',
          startDate: '2026-08-01',
        },
        {
          title: 'Leaflet packages bij EE — ADS-componenten integreren',
          content:
            'Bouw en documenteer patronen voor het gebruik van ADS-componenten (Tooltip, Badge, Button) als Leaflet-popup- en overlay-elementen bij EE. Publiceer als voorbeeldtemplates op de documentatiesite.',
          endDate: '2026-09-18',
          startDate: '2026-08-22',
        },
      ],
    },
    {
      feature: {
        title: 'Multiselect',
        content:
          'Ondersteuning voor het selecteren van meerdere opties in een invoerveld. Een scrollende lijst met checkboxes werkt al; de vraag is of een dropdown-variant aansluit bij de ADS-designprincipes. Begint met een expliciet ontwerpbesluit.',
        endDate: '2026-10-02',
        startDate: '2026-08-03',
      },
      stories: [
        {
          title: 'Ontwerpkeuze: dropdown vs. scrollende checkboxes',
          content:
            'Analyseer wanneer een dropdown-multiselect de voorkeur heeft boven een scrollende checkboxes-lijst. Toets aan ADS-designprincipes, WCAG en bevindingen van GOV.UK en NLDS. Leg de keuze vast als ADR.',
          endDate: '2026-08-22',
          startDate: '2026-08-03',
        },
        {
          title: 'Ontwerp en prototype uitwerken',
          content:
            'Maak een gedetailleerd ontwerp voor de gekozen variant. Specificeer interactie, geselecteerde-state weergave, optionele zoekfunctie en het gedrag bij te veel geselecteerde items.',
          endDate: '2026-09-12',
          startDate: '2026-08-22',
        },
        {
          title: 'Implementeren en documenteren',
          content:
            'Bouw de Multiselect-component conform het goedgekeurde ontwerp. Schrijf documentatie met use-case richtlijnen zodat teams weten wanneer Multiselect te verkiezen is boven de standaard checkboxes-lijst.',
          endDate: '2026-10-02',
          startDate: '2026-09-12',
        },
      ],
    },
    {
      feature: {
        title: 'Loading UI',
        content:
          'Gestandaardiseerde laad-UI voor ADS-toepassingen. Op basis van onderzoek bij Mijn Amsterdam en intern onderzoek: voorkeur voor skeleton screens als primaire aanpak. Spinner blijft ook als losse component beschikbaar.',
        endDate: '2026-10-30',
        idea: ideaSkeletonScreens,
        startDate: '2026-08-17',
      },
      stories: [
        {
          title: 'Research skeleton vs. spinner',
          content:
            'Onderzoek wanneer skeleton UI beter is dan een spinner en vice versa. Leg de aanbeveling vast als ADR op basis van bestaande literatuur en de praktijk bij gemeentelijke applicaties.',
          endDate: '2026-09-05',
          startDate: '2026-08-17',
        },
        {
          title: 'Check bij Mijn Amsterdam',
          content:
            'Ga in gesprek met het Mijn Amsterdam-team om hun bestaande loading-implementatie te beoordelen. Bepaal wat herbruikbaar is en wat niet geschikt is als ADS-standaard.',
          endDate: '2026-09-19',
          startDate: '2026-09-05',
        },
        {
          title: 'Skeleton UI component bouwen',
          content:
            'Implementeer een composable `Skeleton`-component met shimmer-animatie en configureerbare afmetingen. Voeg kant-en-klare varianten toe voor Card, Table en List. Respect `prefers-reduced-motion`.',
          endDate: '2026-10-10',
          startDate: '2026-09-19',
        },
        {
          title: 'Spinner component als losse aanbieding',
          content:
            'Bouw of formaliseer een standalone `Spinner`-component voor situaties waar skeleton niet past (bijv. knoppen in laadstaat, globale laadmelding). Documenteer wanneer spinner vs. skeleton de voorkeur heeft.',
          endDate: '2026-10-30',
          startDate: '2026-10-10',
        },
      ],
    },
    {
      feature: {
        title: 'Combobox',
        content:
          'Een Combobox-component: gecombineerde tekst- en selectie-invoer. Niet beschikbaar als native HTML-element; moet in JavaScript worden gebouwd. De implementatiekeuze (library wrappen, headless-aanpak of Adam Silver-aanpak nabouwen) wordt eerst bepaald.',
        endDate: '2026-11-20',
        startDate: '2026-09-07',
      },
      stories: [
        {
          title: 'Aanpak bepalen: library wrappen, headless of custom',
          content:
            'Evalueer drie implementatiestrategieën: (1) OS-library wrappen (Downshift, Headless UI), (2) headless `useCombobox` hook, (3) de Adam Silver-implementatie in React nabouwen. Toets op toegankelijkheid en onderhoudbaarheid.',
          endDate: '2026-09-26',
          startDate: '2026-09-07',
        },
        {
          title: 'Proof-of-concept bouwen',
          content:
            'Bouw een werkend POC op basis van de gekozen aanpak. Valideer op de ARIA Combobox-vereisten: focus-management, lijstfiltering, keyboardnavigatie (pijltjes, Escape, Enter) en schermlezerondersteuning.',
          endDate: '2026-10-17',
          startDate: '2026-09-26',
        },
        {
          title: 'Toegankelijkheid valideren',
          content:
            'Voer een uitgebreide toegankelijkheidstest uit met NVDA, VoiceOver en axe-core. Verwerk bevindingen in de implementatie en vraag feedback van de gemeentelijke toegankelijkheidsexpert.',
          endDate: '2026-11-07',
          startDate: '2026-10-17',
        },
        {
          title: 'Implementeren en documenteren',
          content:
            'Finaliseer de Combobox-component en schrijf de volledige documentatie: API-referentie, use-case richtlijnen, integratie met formuliervalidatie en een Storybook-story met play-functies.',
          endDate: '2026-11-20',
          startDate: '2026-11-07',
        },
      ],
    },
    {
      feature: {
        title: 'Dark Mode',
        content:
          'Donkere modus voor het Amsterdam Design System. De tokenarchitectuur is er klaar voor. Een volledig uitgewerkt dark-mode themasysteem dat automatisch meebeweegt met `prefers-color-scheme` en via een `data-theme`-attribuut handmatig instelbaar is.',
        endDate: '2026-12-18',
        idea: ideaDarkMode,
        startDate: '2026-10-05',
      },
      stories: [
        {
          title: 'Design tokens dark-mode mapping uitwerken',
          content:
            'Maak een volledige semantische mapping van bestaande kleurtokens naar dark-mode equivalenten. Valideer op WCAG AA contrast voor alle combinaties. Leg de tokenstructuur vast als ADR.',
          endDate: '2026-10-24',
          startDate: '2026-10-05',
        },
        {
          title: 'CSS custom properties dark-mode layer implementeren',
          content:
            'Exporteer de dark-mode tokens als CSS custom properties onder `[data-theme="dark"]`. Integreer automatische activatie via `@media (prefers-color-scheme: dark)` en bied een handmatige override aan.',
          endDate: '2026-11-14',
          startDate: '2026-10-24',
        },
        {
          title: 'Alle componenten testen in donker thema',
          content:
            'Doorloop alle ADS-componenten in donker thema en los visuele problemen op. Let extra op hardcoded kleurwaarden, box-shadows, borders en afbeeldingen die niet goed schalen in dark mode.',
          endDate: '2026-12-05',
          startDate: '2026-11-14',
        },
        {
          title: 'Documentatie en migratiegids schrijven',
          content:
            'Schrijf een themapagina op de ADS-website: activatie-instructies, `prefers-color-scheme`-integratie, richtlijnen voor custom componenten en een migratieguide voor bestaande applicaties.',
          endDate: '2026-12-18',
          startDate: '2026-12-05',
        },
      ],
    },
  ]

  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date())

  function seedProgressStatus(startDate: string, endDate: string): 'Bezig' | 'Voltooid' | undefined {
    if (endDate < today) return 'Voltooid'
    if (startDate <= today) return 'Bezig'
    return undefined
  }

  const allCreatedFeatures = []
  const allCreatedStories = []

  for (let featureIndex = 0; featureIndex < roadmapData.length; featureIndex++) {
    const entry = roadmapData[featureIndex]
    const featureStatus = seedProgressStatus(entry.feature.startDate, entry.feature.endDate)

    const feature = await strapi.documents('api::feature.feature').create({
      data: {
        title: entry.feature.title,
        content: entry.feature.content,
        endDate: entry.feature.endDate,
        idea: entry.feature.idea?.documentId,
        rank: featureIndex + 1,
        startDate: entry.feature.startDate,
        ...(featureStatus ? { progressStatus: featureStatus } : {}),
      },
    })
    allCreatedFeatures.push(feature)

    for (let storyIndex = 0; storyIndex < entry.stories.length; storyIndex++) {
      const storyData = entry.stories[storyIndex]
      const storyStatus = seedProgressStatus(storyData.startDate, storyData.endDate)

      const story = await strapi.documents('api::story.story').create({
        data: {
          title: storyData.title,
          content: storyData.content,
          endDate: storyData.endDate,
          feature: feature.documentId,
          rank: storyIndex + 1,
          startDate: storyData.startDate,
          ...(storyStatus ? { progressStatus: storyStatus } : {}),
        },
      })
      allCreatedStories.push(story)
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

  const teamReactionsIdeaAccepted = [
    'Dank voor je idee! We hebben dit opgepakt en het staat inmiddels op de roadmap. Je kunt de voortgang volgen onder Features.',
    'Goed punt! Dit sluit aan op onze visie en we zijn er inmiddels mee aan de slag. Zie de roadmap voor details.',
    'Bedankt voor het delen! Dit idee is omgezet in een feature op de roadmap.',
  ]

  const teamReactionsIdeaPostponed = [
    'Bedankt voor je suggestie! Helaas hebben we op dit moment geen capaciteit om dit op te pakken. We bewaren het op de backlog voor een volgend kwartaal.',
    'Een mooi voorstel, maar door beperkte resources binnen het team kunnen we hier nu geen prioriteit aan geven. We komen er zeker op terug.',
    'We hebben dit intern besproken. Door andere prioriteiten lukt het ons nu niet om dit in te plannen, maar we waarderen je input.',
    'Bedankt voor het meedenken! We zien de waarde, maar gezien de capaciteit van het team moeten we dit nu nog parkeren.',
  ]

  const teamReactionsFeatureStory = [
    'Bedankt voor de feedback! We nemen dit mee in de uitwerking.',
    'Goede vraag! We zoeken dit uit en komen erop terug.',
    'Mooie suggestie, we kijken of we dit nog kunnen meenemen in deze sprint.',
    'Dit punt nemen we mee in het ontwerp. Bedankt!',
    'We werken hieraan. Hou de roadmap in de gaten voor updates.',
  ]

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

    if (idea.statusIdea === 'accepted') {
      reactions.push({
        content: teamReactionsIdeaAccepted[Math.floor(Math.random() * teamReactionsIdeaAccepted.length)],
        end_user: randomTeamMember().documentId,
      })
    } else if (idea.statusIdea === 'postponed') {
      reactions.push({
        content: teamReactionsIdeaPostponed[Math.floor(Math.random() * teamReactionsIdeaPostponed.length)],
        end_user: randomTeamMember().documentId,
      })
    }

    await strapi.documents('api::idea.idea').update({
      data: { reactions } as never,
      documentId: idea.documentId,
      status: 'published',
    })

    const numLikes = Math.floor(Math.random() * 10) + 1
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

  const entities = [...allCreatedFeatures, ...allCreatedStories]
  const entityTypes = [
    ...allCreatedFeatures.map(() => 'api::feature.feature' as const),
    ...allCreatedStories.map(() => 'api::story.story' as const),
  ]
  const likeTypes = [
    ...allCreatedFeatures.map(() => 'api::feature-like.feature-like' as const),
    ...allCreatedStories.map(() => 'api::story-like.story-like' as const),
  ]
  const relationFields = [
    ...allCreatedFeatures.map(() => 'feature' as const),
    ...allCreatedStories.map(() => 'story' as const),
  ]

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]
    const type = entityTypes[i]
    const likeType = likeTypes[i]
    const relationField = relationFields[i]

    const reactions = []
    const numReactions = Math.floor(Math.random() * 3) + 1
    for (let j = 0; j < numReactions; j++) {
      reactions.push({
        content: dutchReactions[Math.floor(Math.random() * dutchReactions.length)],
        end_user: endUsers[Math.floor(Math.random() * endUsers.length)].documentId,
      })
    }

    if (Math.random() > 0.4) {
      reactions.push({
        content: teamReactionsFeatureStory[Math.floor(Math.random() * teamReactionsFeatureStory.length)],
        end_user: randomTeamMember().documentId,
      })
    }

    await strapi.documents(type).update({
      data: { reactions } as never,
      documentId: entity.documentId,
      status: 'published',
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
