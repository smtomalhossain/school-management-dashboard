// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoginRoute = req.nextUrl.pathname === "/login";
  const isBaseRoute = req.nextUrl.pathname === "/";

  const hasCookie = req.cookies.get("user.sms");

  if (hasCookie && (isLoginRoute || isBaseRoute)) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  if (!hasCookie && !isLoginRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
