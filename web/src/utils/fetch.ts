import { strapi } from '@strapi/client'

const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL
const auth = process.env.STRAPI_API_TOKEN

if (!baseURL || !auth) {
  throw new Error('Missing enviorment variables')
}

export const client = strapi({
  baseURL,
  ...(auth && { auth }),
})
