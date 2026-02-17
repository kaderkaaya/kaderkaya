import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "admin_token";
const AUTH_MOCK_TOKEN = "mock-jwt-token-kaderkaya-2025";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (token !== AUTH_MOCK_TOKEN) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (token === AUTH_MOCK_TOKEN) {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
