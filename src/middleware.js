import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://nathanespejo.com",
  "https://www.nathanespejo.com",
  "https://nathanespejo.tech",
  "https://www.nathanespejo.tech",
];

const SESSION_COOKIE = "__session";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (!pathname.startsWith("/api") && !request.cookies.has(SESSION_COOKIE)) {
    response.cookies.set(SESSION_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  if (pathname.startsWith("/api/chat")) {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const source = origin || (referer ? new URL(referer).origin : "");

    if (!source || !ALLOWED_ORIGINS.includes(source)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!request.cookies.has(SESSION_COOKIE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)"],
};
