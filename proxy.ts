// proxy.ts 
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = [
  '/accounts',
  '/dashboard', 
  '/hr',
  '/lms',
  '/profile',
  '/settings',
  '/divisions',
  '/student',
  '/enrollment',

]

const authRoutes = ['/login', '/register']
const publicRoutes = ['/', '/about']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // NextAuth token get করুন
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isAuthenticated = !!token

  // যদি user already authenticated থাকে এবং auth routes এ আসে
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // যদি user authenticated না থাকে এবং protected routes এ access করতে চায়
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/accounts/:path*',
    '/dashboard/:path*',
    '/hr/:path*',
    '/lms/:path*', 
    '/profile/:path*',
    '/settings/:path*',
    '/divisions/:path*',
    '/student/:path*',
    '/enrollment/:path*',
    '/login',
    '/register'
  ]
}