'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { client } from '@/utils/fetch'
import { EndUserSchema, strapiCollection, strapiSingle } from '@/utils/schemas'

export type AuthResult = {
  error?: string
}

const ALLOWED_EMOJIS = new Set([
  '⭐',
  '🌈',
  '🌊',
  '🌵',
  '🌻',
  '🍀',
  '🍉',
  '🍕',
  '🎨',
  '🎭',
  '🎮',
  '🎯',
  '🎸',
  '🏄',
  '🏔️',
  '🐙',
  '🐳',
  '🐸',
  '🐻',
  '🐼',
  '🔮',
  '🦀',
  '🦁',
  '🦄',
  '🦅',
  '🦊',
  '🦋',
  '🧩',
  '🧸',
  '🚀',
])

function validateInputs(name: string, emoji: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) return 'Vul je voornaam in.'
  if (trimmed.length > 50) return 'Naam mag maximaal 50 tekens bevatten.'
  if (!ALLOWED_EMOJIS.has(emoji)) return 'Ongeldige emoji gekozen.'
  return null
}

const SESSION_COOKIE = 'ams-community-user'
const DISPLAY_COOKIE = 'ams-community-user-display'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30

async function setSessionCookies(documentId: string, name: string, emoji: string) {
  const cookieStore = await cookies()
  const secure = process.env.NODE_ENV === 'production'
  cookieStore.set(SESSION_COOKIE, documentId, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure,
  })
  cookieStore.set(DISPLAY_COOKIE, JSON.stringify({ emoji, name }), {
    httpOnly: false,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure,
  })
}

export async function loginAction(name: string, emoji: string): Promise<AuthResult> {
  const validationError = validateInputs(name, emoji)
  if (validationError) return { error: validationError }

  const trimmedName = name.trim()
  const params = new URLSearchParams({
    'filters[emoji][$eq]': emoji,
    'filters[name][$eq]': trimmedName,
    'pagination[pageSize]': '1',
  })

  const res = await client.fetch(`end-users?${params}`)
  if (!res.ok) return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }

  const parsed = strapiCollection(EndUserSchema).safeParse(await res.json())
  if (!parsed.success || parsed.data.data.length === 0) {
    return {
      error: 'Geen account gevonden met deze naam en emoji. Controleer je gegevens of maak een nieuw account aan.',
    }
  }

  const match = parsed.data.data[0]
  await setSessionCookies(match.documentId, match.name, match.emoji)
  return redirect('/')
}

export async function registerAction(name: string, emoji: string): Promise<AuthResult> {
  const validationError = validateInputs(name, emoji)
  if (validationError) return { error: validationError }

  const trimmedName = name.trim()
  const emojiParams = new URLSearchParams({
    'filters[emoji][$eq]': emoji,
    'pagination[pageSize]': '1',
  })

  const emojiCheck = await client.fetch(`end-users?${emojiParams}`)
  if (!emojiCheck.ok) return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }

  const emojiParsed = strapiCollection(EndUserSchema).safeParse(await emojiCheck.json())
  if (emojiParsed.success && emojiParsed.data.data.length > 0) {
    return { error: 'Deze emoji is al in gebruik. Kies een andere emoji.' }
  }

  const res = await client.fetch('end-users', {
    body: JSON.stringify({ data: { emoji, isTeam: false, name: trimmedName } }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[registerAction] Failed to create end-user', res.status, body)
    return { error: `Er is iets misgegaan (${res.status}). Probeer het opnieuw.` }
  }

  const json = await res.json()
  const parsed = strapiSingle(EndUserSchema).safeParse(json)
  if (!parsed.success) {
    console.error('[registerAction] Failed to parse end-user response', parsed.error, json)
    return { error: 'Er is iets misgegaan bij het verwerken van het antwoord.' }
  }

  const newUser = parsed.data.data
  await setSessionCookies(newUser.documentId, newUser.name, newUser.emoji)
  return redirect('/')
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  cookieStore.delete(DISPLAY_COOKIE)
  redirect('/')
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const documentId = cookieStore.get(SESSION_COOKIE)?.value
  if (!documentId) return null

  try {
    const res = await client.fetch(`end-users/${documentId}`)
    if (!res.ok) return null
    const parsed = strapiSingle(EndUserSchema).safeParse(await res.json())
    return parsed.success ? parsed.data.data : null
  } catch {
    return null
  }
}
