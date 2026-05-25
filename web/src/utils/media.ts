export function getStrapiMedia(url: string | null) {
  if (url === null) return null
  if (url.startsWith('http') || url.startsWith('//')) return url
  const base = (process.env.NEXT_PUBLIC_STRAPI_URL ?? '').replace(/\/api\/?$/, '')
  return `${base}${url}`
}
