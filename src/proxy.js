import { NextResponse } from 'next/server';

export const proxy = async (request) => {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  const isRSC = request.nextUrl.searchParams.has('_rsc');
  const publicPaths = ['/', '/login', '/register'];

  if (isRSC && publicPaths.includes(path)) {
    return NextResponse.next();
  }

  if (
    request.method === 'POST' &&
    ['/api/login', '/api/register', '/api/logout', '/api/profile'].includes(path)
  ) {
    return NextResponse.next();
  }

  if (publicPaths.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

console.log('🔥 PROXY RUNNING ON:', request.nextUrl.pathname);

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/(.*)',
    '/checkout',
    '/checkout/(.*)',
    '/logout'
  ]
};