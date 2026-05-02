'use server'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'

import type { ActionResponse } from './likes'

import { getCurrentUser } from './login'

export async function addIdeaReactionAction(ideaDocumentId: string, content: string): Promise<ActionResponse> {
  const user = await getCurrentUser()
  if (!user) return { needsLogin: true }

  const normalizedContent = typeof content === 'string' ? content.trim() : ''
  if (!normalizedContent) return { error: 'Reactie mag niet leeg zijn.' }

  try {
    const res = await client.fetch('reactions', {
      body: JSON.stringify({ data: { content: normalizedContent, end_user: user.documentId, idea: ideaDocumentId } }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (!res.ok) return { error: 'Kon reactie niet toevoegen.' }

    revalidatePath(`/ideeen/${ideaDocumentId}`)
    return { success: true }
  } catch (err) {
    console.error('[addIdeaReactionAction] Error:', err)
    return { error: 'Er is een onverwachte fout opgetreden.' }
  }
}
