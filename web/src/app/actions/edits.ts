'use server'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'

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

const VALID_STATUSES = ['in_review', 'accepted', 'postponed'] as const
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function validateTitleAndContent(title: string, content: string): { content?: string; title?: string } {
  const fieldErrors: { content?: string; title?: string } = {}

  if (!title) {
    fieldErrors.title = 'Vul een titel in.'
  } else if (title.length > 140) {
    fieldErrors.title = 'Titel mag maximaal 140 tekens bevatten.'
  }

  if (!content) {
    fieldErrors.content = 'Vul een inhoud in.'
  } else if (content.length > 10000) {
    fieldErrors.content = 'Inhoud mag maximaal 10.000 tekens bevatten.'
  }

  return fieldErrors
}

export async function updateIdeaAction(
  documentId: string,
  input: { content: string; statusIdea: string; title: string },
): Promise<EditResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Geen toegang.' }

  const trimmedTitle = input.title.trim()
  const trimmedContent = input.content.trim()

  const fieldErrors: EditResponse['fieldErrors'] = {
    ...validateTitleAndContent(trimmedTitle, trimmedContent),
  }

  if (!VALID_STATUSES.includes(input.statusIdea as (typeof VALID_STATUSES)[number])) {
    fieldErrors.statusIdea = 'Ongeldige status.'
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  try {
    const response = await client.fetch(`ideas/${documentId}`, {
      body: JSON.stringify({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          statusIdea: input.statusIdea,
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[updateIdeaAction] Failed', response.status, body)
      return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }
    }
  } catch (error) {
    console.error('[updateIdeaAction] Error:', error)
    return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }
  }

  revalidatePath('/')
  revalidatePath(`/ideeen/${documentId}`)

  return { success: true }
}

export async function updateFeatureAction(
  documentId: string,
  input: { content: string; endDate: string | null; startDate: string; title: string },
): Promise<EditResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Geen toegang.' }

  const trimmedTitle = input.title.trim()
  const trimmedContent = input.content.trim()
  const trimmedStartDate = (input.startDate ?? '').trim()
  const trimmedEndDate = (input.endDate ?? '').trim()

  const fieldErrors: EditResponse['fieldErrors'] = {
    ...validateTitleAndContent(trimmedTitle, trimmedContent),
  }

  if (!trimmedStartDate) {
    fieldErrors.startDate = 'Vul een startdatum in.'
  } else if (!DATE_PATTERN.test(trimmedStartDate)) {
    fieldErrors.startDate = 'Voer een geldige datum in.'
  }

  if (trimmedEndDate) {
    if (!DATE_PATTERN.test(trimmedEndDate)) {
      fieldErrors.endDate = 'Voer een geldige datum in.'
    } else if (trimmedStartDate && trimmedEndDate < trimmedStartDate) {
      fieldErrors.endDate = 'Einddatum moet op of na de startdatum liggen.'
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
          startDate: trimmedStartDate,
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[updateFeatureAction] Failed', response.status, body)
      return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }
    }
  } catch (error) {
    console.error('[updateFeatureAction] Error:', error)
    return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')
  revalidatePath(`/features/${documentId}`)

  return { success: true }
}

export async function updateStoryAction(
  documentId: string,
  input: { content: string; endDate: string; startDate: string; title: string },
): Promise<EditResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }
  if (!user.isTeam) return { error: 'Geen toegang.' }

  const trimmedTitle = input.title.trim()
  const trimmedContent = input.content.trim()
  const trimmedStartDate = (input.startDate ?? '').trim()
  const trimmedEndDate = (input.endDate ?? '').trim()

  const fieldErrors: EditResponse['fieldErrors'] = {
    ...validateTitleAndContent(trimmedTitle, trimmedContent),
  }

  if (!trimmedStartDate) {
    fieldErrors.startDate = 'Vul een startdatum in.'
  } else if (!DATE_PATTERN.test(trimmedStartDate)) {
    fieldErrors.startDate = 'Voer een geldige datum in.'
  }

  if (!trimmedEndDate) {
    fieldErrors.endDate = 'Vul een einddatum in.'
  } else if (!DATE_PATTERN.test(trimmedEndDate)) {
    fieldErrors.endDate = 'Voer een geldige datum in.'
  }

  if (!fieldErrors.startDate && !fieldErrors.endDate) {
    if (trimmedEndDate < trimmedStartDate) {
      fieldErrors.endDate = 'Einddatum moet op of na de startdatum liggen.'
    }
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  try {
    const response = await client.fetch(`stories/${documentId}`, {
      body: JSON.stringify({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          endDate: trimmedEndDate,
          startDate: trimmedStartDate,
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[updateStoryAction] Failed', response.status, body)
      return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }
    }
  } catch (error) {
    console.error('[updateStoryAction] Error:', error)
    return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }
  }

  revalidatePath('/')
  revalidatePath('/roadmap')
  revalidatePath(`/stories/${documentId}`)

  return { success: true }
}
