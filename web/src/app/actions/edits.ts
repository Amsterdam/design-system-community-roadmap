'use server'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'
import { strapi } from '@/utils/strapi'

import { getCurrentUser } from './login'

export type EditResponse = {
  error?: string
  fieldErrors?: {
    content?: string
    endDate?: string
    startDate?: string
    statusIdea?: string
    title?: string
  }
  needsLogin?: boolean
  success?: boolean
}

export type DeleteResponse = {
  error?: string
  needsLogin?: boolean
  success?: boolean
}

export type CreateResponse = {
  documentId?: string
  error?: string
  fieldErrors?: EditResponse['fieldErrors']
  needsLogin?: boolean
  success?: boolean
}

const VALID_STATUSES = ['in_review', 'accepted', 'postponed'] as const
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function validateTitleAndContent(title: string, content: string): { content?: string; title?: string } {
  const fieldErrors: { content?: string; title?: string } = {}

  if (!title) {
    fieldErrors.title = 'Vul een titel in.'
  } else if (title.length > 140) {
    fieldErrors.title = 'De titel is te lang. Gebruik maximaal 140 tekens.'
  }

  if (!content) {
    fieldErrors.content = 'Vul een beschrijving in.'
  } else if (content.length > 10000) {
    fieldErrors.content = 'De beschrijving is te lang. Gebruik maximaal 10.000 tekens.'
  }

  return fieldErrors
}

export async function updateIdeaAction(
  documentId: string,
  input: {
    content: string
    featureDocumentId?: string | null
    imageIds?: number[]
    statusIdea?: string
    title: string
  },
): Promise<EditResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }

  if (!user.isTeam) {
    let isAuthor: boolean
    try {
      const ideaResponse = await strapi.ideas.findOne(documentId)
      isAuthor = ideaResponse.data.end_users?.some((author) => author.documentId === user.documentId) ?? false
    } catch (error) {
      console.error('[updateIdeaAction] Failed to load idea for ownership check:', error)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
    if (!isAuthor) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }
  }

  const trimmedTitle = input.title.trim()
  const trimmedContent = input.content.trim()
  const featureDocumentId = user.isTeam ? (input.featureDocumentId?.trim() ?? null) : undefined

  const fieldErrors: EditResponse['fieldErrors'] = {
    ...validateTitleAndContent(trimmedTitle, trimmedContent),
  }

  if (user.isTeam) {
    if (!input.statusIdea || !VALID_STATUSES.includes(input.statusIdea as (typeof VALID_STATUSES)[number])) {
      fieldErrors.statusIdea = 'Kies een geldige status uit de lijst.'
    }
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  try {
    const response = await client.fetch(`ideas/${documentId}`, {
      body: JSON.stringify({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          ...(user.isTeam ? { statusIdea: input.statusIdea } : {}),
          ...(featureDocumentId !== undefined ? { features: featureDocumentId ? [featureDocumentId] : [] } : {}),
          ...(input.imageIds !== undefined ? { images: input.imageIds } : {}),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[updateIdeaAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
  } catch (error) {
    console.error('[updateIdeaAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')
  revalidatePath(`/ideeen/${documentId}`)
  if (featureDocumentId) revalidatePath(`/features/${featureDocumentId}`)

  return { success: true }
}

export async function updateFeatureAction(
  documentId: string,
  input: {
    content: string
    endDate: string | null
    ideaDocumentId?: string | null
    imageIds?: number[]
    progressStatus?: string | null
    startDate: string
    title: string
  },
): Promise<EditResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }

  const trimmedTitle = input.title.trim()
  const trimmedContent = input.content.trim()
  const trimmedStartDate = (input.startDate ?? '').trim()
  const trimmedEndDate = (input.endDate ?? '').trim()
  const ideaDocumentId = input.ideaDocumentId?.trim() || null

  const fieldErrors: EditResponse['fieldErrors'] = {
    ...validateTitleAndContent(trimmedTitle, trimmedContent),
  }

  if (!trimmedStartDate) {
    fieldErrors.startDate = 'Vul een startdatum in, bijvoorbeeld 01-01-2025.'
  } else if (!DATE_PATTERN.test(trimmedStartDate)) {
    fieldErrors.startDate = 'Vul een geldige datum in, bijvoorbeeld 01-01-2025.'
  }

  if (trimmedEndDate) {
    if (!DATE_PATTERN.test(trimmedEndDate)) {
      fieldErrors.endDate = 'Vul een geldige datum in, bijvoorbeeld 01-01-2025.'
    } else if (trimmedStartDate && trimmedEndDate < trimmedStartDate) {
      fieldErrors.endDate = 'De einddatum moet op of na de startdatum liggen.'
    }
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  try {
    const response = await client.fetch(`features/${documentId}`, {
      body: JSON.stringify({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          endDate: trimmedEndDate || null,
          idea: ideaDocumentId,
          progressStatus: input.progressStatus || null,
          startDate: trimmedStartDate,
          ...(input.imageIds !== undefined ? { images: input.imageIds } : {}),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[updateFeatureAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
  } catch (error) {
    console.error('[updateFeatureAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')
  revalidatePath(`/features/${documentId}`)
  if (ideaDocumentId) revalidatePath(`/ideeen/${ideaDocumentId}`)

  return { success: true }
}

export async function updateStoryAction(
  documentId: string,
  input: { content: string; endDate: string | null; imageIds?: number[]; startDate: string; title: string },
): Promise<EditResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }

  const trimmedTitle = input.title.trim()
  const trimmedContent = input.content.trim()
  const trimmedStartDate = (input.startDate ?? '').trim()
  const trimmedEndDate = (input.endDate ?? '').trim()

  const fieldErrors: EditResponse['fieldErrors'] = {
    ...validateTitleAndContent(trimmedTitle, trimmedContent),
  }

  if (!trimmedStartDate) {
    fieldErrors.startDate = 'Vul een startdatum in, bijvoorbeeld 01-01-2025.'
  } else if (!DATE_PATTERN.test(trimmedStartDate)) {
    fieldErrors.startDate = 'Vul een geldige datum in, bijvoorbeeld 01-01-2025.'
  }

  if (trimmedEndDate) {
    if (!DATE_PATTERN.test(trimmedEndDate)) {
      fieldErrors.endDate = 'Vul een geldige datum in, bijvoorbeeld 01-01-2025.'
    } else if (trimmedStartDate && trimmedEndDate < trimmedStartDate) {
      fieldErrors.endDate = 'De einddatum moet op of na de startdatum liggen.'
    }
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  try {
    const response = await client.fetch(`stories/${documentId}`, {
      body: JSON.stringify({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          endDate: trimmedEndDate || null,
          startDate: trimmedStartDate,
          ...(input.imageIds !== undefined ? { images: input.imageIds } : {}),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[updateStoryAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
  } catch (error) {
    console.error('[updateStoryAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')
  revalidatePath(`/stories/${documentId}`)

  return { success: true }
}

export async function createFeatureAction(input: {
  content: string
  endDate: string | null
  imageIds?: number[]
  startDate: string
  title: string
}): Promise<CreateResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }

  const trimmedTitle = input.title.trim()
  const trimmedContent = input.content.trim()
  const trimmedStartDate = (input.startDate ?? '').trim()
  const trimmedEndDate = (input.endDate ?? '').trim()

  const fieldErrors: CreateResponse['fieldErrors'] = {
    ...validateTitleAndContent(trimmedTitle, trimmedContent),
  }

  if (!trimmedStartDate) {
    fieldErrors.startDate = 'Vul een startdatum in, bijvoorbeeld 01-01-2025.'
  } else if (!DATE_PATTERN.test(trimmedStartDate)) {
    fieldErrors.startDate = 'Vul een geldige datum in, bijvoorbeeld 01-01-2025.'
  }

  if (trimmedEndDate) {
    if (!DATE_PATTERN.test(trimmedEndDate)) {
      fieldErrors.endDate = 'Vul een geldige datum in, bijvoorbeeld 01-01-2025.'
    } else if (trimmedStartDate && trimmedEndDate < trimmedStartDate) {
      fieldErrors.endDate = 'De einddatum moet op of na de startdatum liggen.'
    }
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  let documentId: string | undefined
  try {
    const response = await client.fetch('features', {
      body: JSON.stringify({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          endDate: trimmedEndDate || null,
          publishedAt: new Date().toISOString(),
          startDate: trimmedStartDate,
          ...(input.imageIds && input.imageIds.length > 0 ? { images: input.imageIds } : {}),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[createFeatureAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }

    const json = await response.json()
    documentId = json.data?.documentId
    if (!documentId)
      return {
        error:
          'Het verzoek is verstuurd, maar de bevestiging is niet ontvangen. Ververs de pagina om te zien of de wijziging is doorgekomen.',
      }
  } catch (error) {
    console.error('[createFeatureAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')

  return { documentId, success: true }
}

export async function createStoryAction(input: {
  content: string
  endDate: string | null
  featureDocumentId?: string
  imageIds?: number[]
  startDate: string
  title: string
}): Promise<CreateResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }

  const trimmedTitle = input.title.trim()
  const trimmedContent = input.content.trim()
  const trimmedStartDate = (input.startDate ?? '').trim()
  const trimmedEndDate = (input.endDate ?? '').trim()
  const featureDocumentId = input.featureDocumentId?.trim() || undefined

  const fieldErrors: CreateResponse['fieldErrors'] = {
    ...validateTitleAndContent(trimmedTitle, trimmedContent),
  }

  if (!trimmedStartDate) {
    fieldErrors.startDate = 'Vul een startdatum in, bijvoorbeeld 01-01-2025.'
  } else if (!DATE_PATTERN.test(trimmedStartDate)) {
    fieldErrors.startDate = 'Vul een geldige datum in, bijvoorbeeld 01-01-2025.'
  }

  if (trimmedEndDate) {
    if (!DATE_PATTERN.test(trimmedEndDate)) {
      fieldErrors.endDate = 'Vul een geldige datum in, bijvoorbeeld 01-01-2025.'
    } else if (trimmedStartDate && trimmedEndDate < trimmedStartDate) {
      fieldErrors.endDate = 'De einddatum moet op of na de startdatum liggen.'
    }
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  let documentId: string | undefined
  try {
    const response = await client.fetch('stories', {
      body: JSON.stringify({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          endDate: trimmedEndDate || null,
          publishedAt: new Date().toISOString(),
          startDate: trimmedStartDate,
          ...(featureDocumentId ? { feature: featureDocumentId } : {}),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[createStoryAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }

    const json = await response.json()
    documentId = json.data?.documentId
    if (!documentId)
      return {
        error:
          'Het verzoek is verstuurd, maar de bevestiging is niet ontvangen. Ververs de pagina om te zien of de wijziging is doorgekomen.',
      }
  } catch (error) {
    console.error('[createStoryAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')
  if (featureDocumentId) revalidatePath(`/features/${featureDocumentId}`)

  return { documentId, success: true }
}

export async function deleteIdeaAction(documentId: string): Promise<DeleteResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }

  if (!user.isTeam) {
    let isAuthor: boolean
    try {
      const ideaResponse = await strapi.ideas.findOne(documentId)
      isAuthor = ideaResponse.data.end_users?.some((author) => author.documentId === user.documentId) ?? false
    } catch (error) {
      console.error('[deleteIdeaAction] Failed to load idea for ownership check:', error)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
    if (!isAuthor) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }
  }

  try {
    const response = await client.fetch(`ideas/${documentId}`, { method: 'DELETE' })
    if (!response.ok && response.status !== 204) {
      const body = await response.text().catch(() => '')
      console.error('[deleteIdeaAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
  } catch (error) {
    console.error('[deleteIdeaAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  revalidatePath('/profiel')
  revalidatePath(`/ideeen/${documentId}`)

  return { success: true }
}

export async function deleteFeatureAction(documentId: string): Promise<DeleteResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }

  try {
    const response = await client.fetch(`features/${documentId}`, { method: 'DELETE' })
    if (!response.ok && response.status !== 204) {
      const body = await response.text().catch(() => '')
      console.error('[deleteFeatureAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
  } catch (error) {
    console.error('[deleteFeatureAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')
  revalidatePath(`/features/${documentId}`)

  return { success: true }
}

export async function deleteStoryAction(documentId: string): Promise<DeleteResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }

  try {
    const response = await client.fetch(`stories/${documentId}`, { method: 'DELETE' })
    if (!response.ok && response.status !== 204) {
      const body = await response.text().catch(() => '')
      console.error('[deleteStoryAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
  } catch (error) {
    console.error('[deleteStoryAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')
  revalidatePath(`/stories/${documentId}`)

  return { success: true }
}

export async function updateStoryProgressAction(
  documentId: string,
  input: { progressStatus?: string | null; rank?: number },
): Promise<EditResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }

  try {
    const response = await client.fetch(`stories/${documentId}`, {
      body: JSON.stringify({ data: input }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })
    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[updateStoryProgressAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
  } catch (error) {
    console.error('[updateStoryProgressAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/roadmap')
  revalidatePath(`/stories/${documentId}`)

  return { success: true }
}

export async function updateFeatureProgressAction(
  documentId: string,
  input: { progressStatus?: string | null; rank?: number },
): Promise<EditResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Je hebt geen rechten om deze actie uit te voeren.' }

  try {
    const response = await client.fetch(`features/${documentId}`, {
      body: JSON.stringify({ data: input }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })
    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[updateFeatureProgressAction] Failed', response.status, body)
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }
  } catch (error) {
    console.error('[updateFeatureProgressAction] Error:', error)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/roadmap')
  revalidatePath(`/features/${documentId}`)

  return { success: true }
}
