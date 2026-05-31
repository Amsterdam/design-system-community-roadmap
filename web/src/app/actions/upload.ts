'use server'

import { client } from '@/utils/fetch'
import { MAX_IMAGE_SIZE, MAX_IMAGES } from '@/utils/images'

type UploadResult = {
  error?: string
  ids?: number[]
}

export async function uploadImages(files: File[]): Promise<UploadResult> {
  if (files.length === 0) return { ids: [] }

  if (files.length > MAX_IMAGES) {
    return { error: `Je kunt maximaal ${MAX_IMAGES} afbeeldingen uploaden.` }
  }
  for (const file of files) {
    if (file.size > MAX_IMAGE_SIZE) {
      return { error: 'Een of meer afbeeldingen zijn te groot (max 5 MB per afbeelding).' }
    }
  }

  const uploadForm = new FormData()
  for (const file of files) {
    uploadForm.append('files', file)
  }

  try {
    const uploadRes = await client.fetch('upload', { body: uploadForm, method: 'POST' })
    if (!uploadRes.ok) {
      return { error: 'Het uploaden van de afbeeldingen is mislukt. Probeer het opnieuw.' }
    }
    const uploaded = await uploadRes.json()
    const ids = Array.isArray(uploaded) ? uploaded.map((item: { id: number }) => item.id) : []
    return { ids }
  } catch (error) {
    console.error('[uploadImages] Error:', error)
    return { error: 'Het uploaden van de afbeeldingen is mislukt. Probeer het opnieuw.' }
  }
}
