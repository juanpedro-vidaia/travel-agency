import { NextRequest, NextResponse } from 'next/server'
import { ENABLED_LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/config/languages.config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1]
  if (ENABLED_LANGUAGES.includes(firstSegment)) return NextResponse.next()
  return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|.*\\.\\w+$).*)'],
}
