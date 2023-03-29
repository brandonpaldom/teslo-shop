import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!session) {
    const previousPage = req.nextUrl.pathname
    return NextResponse.redirect(new URL(`/auth/login?p=${previousPage}`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/checkout/:path*',
}

// import * as jose from 'jose'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const previousPage = req.nextUrl.pathname

//   if (previousPage.startsWith('/checkout')) {
//     const token = req.cookies.get('token')?.value || ''

//     try {
//       const JWT_SECRET = process.env.JWT_SECRET

//       if (!JWT_SECRET) {
//         throw new Error('JWT_SECRET not set')
//       }

//       await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
//       return NextResponse.next()
//     } catch (error) {
//       console.error(error)
//       return NextResponse.redirect(new URL(`/auth/login?p=${previousPage}`, req.url))
//     }
//   }
// }

// export const config = {
//   matcher: '/checkout/:path*',
// }
