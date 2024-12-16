import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { routes } from '@/constants';

const authRoutes = [
  routes.admin,
  routes.courses,
  routes.leaderboards,
  routes.learn,
  routes.shop,
  routes.units,
] as const;

export default auth(async (req) => {
  const { pathname, origin } = req.nextUrl;

  const isAuthorized = !!req.auth;
  const isGuestRoute = pathname === '/';
  const isAuthRoute = isGuestRoute
    ? false
    : authRoutes.some((route) => pathname.startsWith(route));

  if (!isAuthorized && !isGuestRoute) {
    const newUrl = new URL(routes.home, origin);
    return NextResponse.redirect(newUrl);
  }

  if (isAuthorized && (isGuestRoute || !isAuthRoute)) {
    const newUrl = new URL(routes.learn, origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
