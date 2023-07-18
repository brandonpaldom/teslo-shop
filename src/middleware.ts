import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const requestedPage = req.nextUrl.pathname
  const roles = ['admin']

  if (!session) {
    const previousPage = req.nextUrl.pathname

    if (requestedPage.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.redirect(new URL(`/auth/login?p=${previousPage}`, req.url))
  }

  if (requestedPage.startsWith('/admin') && !roles.includes(session.user.role)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (requestedPage.startsWith('/api/admin') && !roles.includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/((?!api/)/admin/:path.*)'],
}
