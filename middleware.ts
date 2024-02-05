import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

const PROTECTED_ROUTES = ['/dashboard', '/join'];
const AUTH_ROUTE = '/auth';

const DASHBOARD_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/auth/login';

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);

    const session = await supabase.auth.getSession();
    const isAuth = session.data.session !== null;

    const pathname = request.nextUrl.pathname;

    const isAuthRoute = pathname.startsWith(AUTH_ROUTE);

    const isRouteProtected = PROTECTED_ROUTES.reduce((acc, route) => {
      return acc || pathname.startsWith(route);
    }, false);

    if (isAuthRoute && isAuth) {
      return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
    }

    if (isRouteProtected && !isAuth) {
      return NextResponse.redirect(new URL(`${LOGIN_ROUTE}?redirectTo=${pathname}`, request.url));
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|login|/).*)',
    '/dashboard/:path*',
  ],
};
