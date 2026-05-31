import type { Core } from '@strapi/strapi'

type MetaEntry = {
  edit: { description?: string; label?: string; mainField?: string; placeholder?: string; visible?: boolean }
  list: { label?: string }
}

type Patch = {
  layouts?: unknown
  metadatas?: Record<string, Partial<MetaEntry>>
  settings?: Record<string, unknown>
}

function labelPatch(fields: Record<string, Partial<MetaEntry>>) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, val]) => [key, { edit: val.edit ?? {}, list: val.list ?? {} }]),
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function patchConfig(service: any, model: unknown, patch: Patch) {
  const svc = service
  const current = (await svc.findConfiguration(model)) as Record<string, unknown>
  const next = structuredClone(current)

  if (patch.settings) {
    next.settings = { ...(next.settings as object), ...patch.settings }
  }

  if (patch.metadatas) {
    for (const [field, meta] of Object.entries(patch.metadatas)) {
      const existing = (next.metadatas as Record<string, MetaEntry>)[field] ?? { edit: {}, list: {} }
      if (meta.edit) Object.assign(existing.edit, meta.edit)
      if (meta.list) Object.assign(existing.list, meta.list)
      ;(next.metadatas as Record<string, MetaEntry>)[field] = existing
    }
  }

  if (patch.layouts) {
    next.layouts = patch.layouts
  }

  await svc.updateConfiguration(model, next)
}

export default async function configureCmsViews({ strapi }: { strapi: Core.Strapi }) {
  const service = strapi.plugin('content-manager').service('content-types')

  await patchConfig(service, strapi.getModel('api::idea.idea'), {
    metadatas: labelPatch({
      title: { edit: { label: 'Titel' }, list: { label: 'Titel' } },
      content: { edit: { label: 'Samenvatting' }, list: { label: 'Samenvatting' } },
      end_users: { edit: { label: 'Indieners', mainField: 'name' }, list: { label: 'Indieners' } },
      features: { edit: { label: 'Features' }, list: { label: 'Features' } },
      images: { edit: { label: 'Afbeeldingen' }, list: { label: 'Afbeeldingen' } },
      likes: { edit: { label: 'Likes', visible: false }, list: { label: 'Likes' } },
      reactions: { edit: { label: 'Reacties' }, list: { label: 'Reacties' } },
      statusIdea: { edit: { label: 'Status' }, list: { label: 'Status' } },
    }),
  })

  await patchConfig(service, strapi.getModel('api::feature.feature'), {
    layouts: {
      edit: [
        [{ name: 'title', size: 12 }],
        [{ name: 'content', size: 12 }],
        [
          { name: 'rank', size: 4 },
          { name: 'progressStatus', size: 6 },
        ],
        [
          { name: 'startDate', size: 4 },
          { name: 'endDate', size: 4 },
        ],
        [{ name: 'images', size: 6 }],
        [{ name: 'idea', size: 6 }],
        [{ name: 'stories', size: 6 }],
        [{ name: 'reactions', size: 12 }],
      ],
      list: ['title', 'rank', 'progressStatus', 'startDate', 'endDate'],
    },
    metadatas: labelPatch({
      title: { edit: { label: 'Titel' }, list: { label: 'Titel' } },
      content: { edit: { label: 'Inhoud' }, list: { label: 'Inhoud' } },
      endDate: { edit: { label: 'Einddatum' }, list: { label: 'Einddatum' } },
      idea: { edit: { label: 'Gekoppeld idee', mainField: 'title' }, list: { label: 'Gekoppeld idee' } },
      images: { edit: { label: 'Afbeeldingen' }, list: { label: 'Afbeeldingen' } },
      likes: { edit: { label: 'Likes', visible: false }, list: { label: 'Likes' } },
      progressStatus: {
        edit: { description: 'Voortgangsstatus van deze feature.', label: 'Voortgang' },
        list: { label: 'Voortgang' },
      },
      rank: {
        edit: { description: 'Lager getal = eerder in de voortgangslijst.', label: 'Volgorde', placeholder: '1' },
        list: { label: 'Volgorde' },
      },
      reactions: { edit: { label: 'Reacties' }, list: { label: 'Reacties' } },
      startDate: { edit: { label: 'Startdatum' }, list: { label: 'Startdatum' } },
      stories: { edit: { label: 'Stories', mainField: 'title' }, list: { label: 'Stories' } },
    }),
    settings: { defaultSortBy: 'rank', defaultSortOrder: 'ASC' },
  })

  await patchConfig(service, strapi.getModel('api::story.story'), {
    layouts: {
      edit: [
        [{ name: 'title', size: 12 }],
        [{ name: 'content', size: 12 }],
        [
          { name: 'rank', size: 4 },
          { name: 'progressStatus', size: 6 },
        ],
        [
          { name: 'startDate', size: 4 },
          { name: 'endDate', size: 4 },
        ],
        [{ name: 'feature', size: 6 }],
        [{ name: 'images', size: 6 }],
        [{ name: 'reactions', size: 12 }],
      ],
      list: ['title', 'rank', 'progressStatus', 'startDate', 'endDate'],
    },
    metadatas: labelPatch({
      title: { edit: { label: 'Titel' }, list: { label: 'Titel' } },
      content: { edit: { label: 'Inhoud' }, list: { label: 'Inhoud' } },
      endDate: { edit: { label: 'Einddatum' }, list: { label: 'Einddatum' } },
      feature: { edit: { label: 'Feature', mainField: 'title' }, list: { label: 'Feature' } },
      images: { edit: { label: 'Afbeeldingen' }, list: { label: 'Afbeeldingen' } },
      likes: { edit: { label: 'Likes', visible: false }, list: { label: 'Likes' } },
      progressStatus: {
        edit: { description: 'Voortgangsstatus van deze story.', label: 'Voortgang' },
        list: { label: 'Voortgang' },
      },
      rank: {
        edit: { description: 'Lager getal = eerder in de voortgangslijst.', label: 'Volgorde', placeholder: '1' },
        list: { label: 'Volgorde' },
      },
      reactions: { edit: { label: 'Reacties' }, list: { label: 'Reacties' } },
      startDate: { edit: { label: 'Startdatum' }, list: { label: 'Startdatum' } },
    }),
    settings: { defaultSortBy: 'rank', defaultSortOrder: 'ASC' },
  })

  await patchConfig(service, strapi.getModel('api::end-user.end-user'), {
    metadatas: labelPatch({
      emoji: { edit: { label: 'Emoji' }, list: { label: 'Emoji' } },
      feature_likes: { edit: { label: 'Feature likes', visible: false }, list: { label: 'Feature likes' } },
      idea_likes: { edit: { label: 'Idee likes', visible: false }, list: { label: 'Idee likes' } },
      ideas: { edit: { label: 'Ideeën', mainField: 'title' }, list: { label: 'Ideeën' } },
      isTeam: { edit: { label: 'Teamlid' }, list: { label: 'Teamlid' } },
      name: { edit: { label: 'Naam' }, list: { label: 'Naam' } },
      notifications: { edit: { label: 'Notificaties', visible: false }, list: { label: 'Notificaties' } },
      story_likes: { edit: { label: 'Story likes', visible: false }, list: { label: 'Story likes' } },
    }),
  })

  await patchConfig(service, strapi.getModel('api::notification.notification'), {
    metadatas: labelPatch({
      href: { edit: { label: 'Link' }, list: { label: 'Link' } },
      message: { edit: { label: 'Bericht' }, list: { label: 'Bericht' } },
      read: { edit: { label: 'Gelezen' }, list: { label: 'Gelezen' } },
      recipient: { edit: { label: 'Ontvanger', mainField: 'name' }, list: { label: 'Ontvanger' } },
      type: { edit: { label: 'Type' }, list: { label: 'Type' } },
    }),
  })

  await patchConfig(service, strapi.getModel('api::idea-like.idea-like'), {
    metadatas: labelPatch({
      end_user: { edit: { label: 'Gebruiker', mainField: 'name' }, list: { label: 'Gebruiker' } },
      idea: { edit: { label: 'Idee', mainField: 'title' }, list: { label: 'Idee' } },
    }),
  })

  await patchConfig(service, strapi.getModel('api::feature-like.feature-like'), {
    metadatas: labelPatch({
      end_user: { edit: { label: 'Gebruiker', mainField: 'name' }, list: { label: 'Gebruiker' } },
      feature: { edit: { label: 'Feature', mainField: 'title' }, list: { label: 'Feature' } },
    }),
  })

  await patchConfig(service, strapi.getModel('api::story-like.story-like'), {
    metadatas: labelPatch({
      end_user: { edit: { label: 'Gebruiker', mainField: 'name' }, list: { label: 'Gebruiker' } },
      story: { edit: { label: 'Story', mainField: 'title' }, list: { label: 'Story' } },
    }),
  })
}
