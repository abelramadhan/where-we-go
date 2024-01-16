import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);

    const session = await supabase.auth.getSession();

    const pathname = request.nextUrl.pathname;

    const isRouteProtected = protectedRoutes.reduce((acc, route) => {
      return acc || pathname.startsWith(route);
    }, false);

    if (isRouteProtected && session.data.session === null) {
      return NextResponse.redirect(new URL('/', request.url));
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
