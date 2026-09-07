import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to the login page itself to avoid infinite redirect loops
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check for the presence of a Supabase auth session cookie
  // Matches sb-[project-ref]-auth-token, chunked sb-*-auth-token.*, or supabase-auth-token
  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (cookie) =>
      (cookie.name.startsWith("sb-") && cookie.name.includes("-auth-token")) ||
      cookie.name === "supabase-auth-token" ||
      cookie.name.includes("auth-token")
  );

  if (!hasAuthCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
