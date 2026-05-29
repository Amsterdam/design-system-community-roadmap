import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const cookieStore = await cookies()
  cookieStore.delete('ams-community-user')
  cookieStore.delete('ams-community-user-display')
  redirect('/')
}

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('ams-community-user')
  cookieStore.delete('ams-community-user-display')
  redirect('/')
}
