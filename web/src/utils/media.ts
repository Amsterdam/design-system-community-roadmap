export function getStrapiMedia(url: string | null) {
  if (url === null) return null
  if (url.startsWith('http') || url.startsWith('//')) return url
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`
}
