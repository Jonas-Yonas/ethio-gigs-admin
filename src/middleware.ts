import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname, origin } = request.nextUrl;

  // Define protected routes (can be expanded as needed)
  const protectedRoutes = ["/dashboard", "/admin", "/settings", "/profile"];

  // Define auth routes (where logged-in users shouldn't access)
  const authRoutes = ["/signin", "/signup", "/auth"];

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current route is auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Handle protected routes
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/signin", origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Handle auth routes for authenticated users
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  // Special case: redirect root to appropriate page
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", origin));
    }
    return NextResponse.next(); // or redirect to marketing page
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     * - public folder (e.g., /public/images)
     * - auth callbacks (e.g., /api/auth)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|api/auth).*)",
  ],
};
