import { Image, ImageSlider } from '@amsterdam/design-system-react'

import type { StrapiImage } from '@/utils/schemas'

import { getStrapiMedia } from '@/utils/media'

type StrapiImageBlockProps = {
  fallbackAlt: string
  images?: StrapiImage[] | null
}

export default function StrapiImageBlock({ fallbackAlt, images }: StrapiImageBlockProps) {
  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return (
      <Image alt={images[0].alternativeText ?? fallbackAlt} src={getStrapiMedia(images[0].url) ?? ''} width="100%" />
    )
  }

  return (
    <ImageSlider
      images={images.map((img) => ({
        alt: img.alternativeText ?? fallbackAlt,
        src: getStrapiMedia(img.url) ?? '',
      }))}
    />
  )
}
