import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'kairo_session';

export function middleware(request) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (sessionCookie && (pathname === '/' || pathname === '/signup' || pathname === '/signup/')) {
    const profileUrl = new URL('/trip-hub/', request.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup', '/signup/'],
};
