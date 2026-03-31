import { NextResponse } from 'next/server';

export const proxy = async (request) => {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  
// Allow all RSC requests
if (request.nextUrl.searchParams.has("_rsc")) {
  return NextResponse.next();
}


  // These API routes must ALWAYS bypass auth
  if (request.method === 'POST' && (path === '/api/login' || path === '/api/register' || path === '/api/logout'|| path === '/api/profile')) {
    return NextResponse.next();
  }

  // These GET calls from RSC must be treated as public
  if (path.startsWith('/login') || path === '/' || path.startsWith('/register')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected pages or APIs
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next|static|.*\\..*).*)'], 
};