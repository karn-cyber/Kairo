import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'kairo_session';

export function middleware(request) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  // If signed in and visiting landing or signup, send to members area
  if (sessionCookie && (pathname === '/' || pathname === '/signup' || pathname === '/signup/')) {
    const profileUrl = new URL('/trip-hub/', request.url);
    return NextResponse.redirect(profileUrl);
  }

  // Protect member-only routes: redirect unauthenticated users to landing page
  const protectedPrefixes = ['/explore', '/trip-hub', '/reels', '/chat', '/community', '/profile', '/album', '/trip', '/trip-detail'];
  const isProtected = protectedPrefixes.some(p => pathname === p || pathname.startsWith(p + '/'));

  if (!sessionCookie && isProtected) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup', '/signup/', '/explore/:path*', '/trip-hub/:path*', '/reels/:path*', '/chat/:path*', '/community/:path*', '/profile/:path*', '/album/:path*', '/trip/:path*', '/trip-detail/:path*'],
};
