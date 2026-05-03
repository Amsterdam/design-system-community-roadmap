'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { client } from '@/utils/fetch'

import { getCurrentUser } from './login'

export type CreateIdeaResult = {
  error?: string
  fieldErrors?: { content?: string; title?: string }
}

export async function createIdeaAction(formData: FormData): Promise<CreateIdeaResult> {
  const user = await getCurrentUser()
  if (!user) redirect('/inloggen')

  const title = (formData.get('title') as string | null)?.trim() ?? ''
  const content = (formData.get('content') as string | null)?.trim() ?? ''
  const imageFile = formData.get('image')

  const fieldErrors: { content?: string; title?: string } = {}
  if (!title) fieldErrors.title = 'Vul een titel in.'
  else if (title.length > 140) fieldErrors.title = 'Titel mag maximaal 140 tekens bevatten.'
  if (!content) fieldErrors.content = 'Vul een samenvatting in.'
  else if (content.length > 10000) fieldErrors.content = 'Samenvatting mag maximaal 10.000 tekens bevatten.'

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  let imageId: number | undefined

  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      const uploadData = new FormData()
      uploadData.append('files', imageFile)
      const uploadRes = await client.fetch('upload', { body: uploadData, method: 'POST' })
      if (uploadRes.ok) {
        const uploaded = await uploadRes.json()
        imageId = uploaded[0]?.id
      }
    } catch {
      // non-critical — idea is still created without image
    }
  }

  let documentId: string
  try {
    const res = await client.fetch('ideas', {
      body: JSON.stringify({
        data: {
          title,
          content,
          end_users: [user.documentId],
          publishedAt: new Date().toISOString(),
          ...(imageId !== undefined ? { images: [imageId] } : {}),
        },
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error('[createIdeaAction] Failed', res.status, body)
      return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }
    }

    const json = await res.json()
    documentId = json.data?.documentId
    if (!documentId) return { error: 'Er is iets misgegaan bij het verwerken van het antwoord.' }
  } catch (err) {
    console.error('[createIdeaAction] Error:', err)
    return { error: 'Er is iets misgegaan. Probeer het opnieuw.' }
  }

  revalidatePath('/')
  return redirect(`/ideeen/${documentId}`)
}
