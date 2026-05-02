'use server'

import { revalidatePath } from 'next/cache'

import { client } from '@/utils/fetch'
import { IdeaLikeSchema, strapiCollection } from '@/utils/schemas'

import { getCurrentUser } from './login'

export type ActionResponse = {
  error?: string
  needsLogin?: boolean
  success?: boolean
}

export async function toggleIdeaLikeAction(ideaDocumentId: string, isLiked: boolean): Promise<ActionResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return { needsLogin: true }
  }

  try {
    if (isLiked) {
      // Create a new like
      const res = await client.fetch('idea-likes', {
        body: JSON.stringify({
          data: {
            end_user: user.documentId,
            idea: ideaDocumentId,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!res.ok) {
        return { error: 'Kon like niet toevoegen.' }
      }
    } else {
      // Find and remove existing like
      const params = new URLSearchParams({
        'filters[end_user][documentId][$eq]': user.documentId,
        'filters[idea][documentId][$eq]': ideaDocumentId,
      })

      const searchRes = await client.fetch(`idea-likes?${params}`)
      if (!searchRes.ok) {
        return { error: 'Kon like niet vinden om te verwijderen.' }
      }

      const searchData = await searchRes.json()
      const parsed = strapiCollection(IdeaLikeSchema).safeParse(searchData)

      if (!parsed.success) {
        console.error('[toggleIdeaLikeAction] Invalid idea-likes response:', parsed.error)
        return { error: 'Kon like niet verwerken om te verwijderen.' }
      }

      if (parsed.data.data.length > 0) {
        const likeDocumentId = parsed.data.data[0].documentId
        const deleteRes = await client.fetch(`idea-likes/${likeDocumentId}`, {
          method: 'DELETE',
        })

        if (!deleteRes.ok) {
          return { error: 'Kon like niet verwijderen.' }
        }
      }
    }

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('[toggleIdeaLikeAction] Error:', error)
    return { error: 'Er is een onverwachte fout opgetreden.' }
  }
}
