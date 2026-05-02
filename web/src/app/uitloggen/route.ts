import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const cookieStore = await cookies()
  cookieStore.delete('ams-community-user')
  cookieStore.delete('ams-community-user-display')
  return NextResponse.redirect(new URL('/', req.url))
}
