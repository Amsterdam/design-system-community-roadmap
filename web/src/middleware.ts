import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === 'production' && req.headers.get('x-forwarded-proto') === 'http') {
    const url = req.nextUrl.clone()
    url.protocol = 'https'
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}
