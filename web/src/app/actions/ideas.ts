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
  if (!title) fieldErrors.title = 'Vul een titel in voor je idee.'
  else if (title.length > 140) fieldErrors.title = 'De titel is te lang. Gebruik maximaal 140 tekens.'
  if (!content) fieldErrors.content = 'Beschrijf je idee kort in de samenvatting.'
  else if (content.length > 10000) fieldErrors.content = 'De samenvatting is te lang. Gebruik maximaal 10.000 tekens.'

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
      return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
    }

    const json = await res.json()
    documentId = json.data?.documentId
    if (!documentId)
      return {
        error:
          'Het verzoek is verstuurd, maar de bevestiging is niet ontvangen. Ververs de pagina om te zien of de wijziging is doorgekomen.',
      }
  } catch (err) {
    console.error('[createIdeaAction] Error:', err)
    return { error: 'Dat is helaas niet gelukt. Probeer het opnieuw of kom later terug.' }
  }

  revalidatePath('/')
  return redirect(`/ideeen/${documentId}`)
}
