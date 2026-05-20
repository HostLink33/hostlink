import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/inscription", "/connexion", "/nav"];
const PROTECTED_ROUTES = ["/dashboard", "/matching", "/concierge", "/paiements"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("hostlink-token")?.value;
  const path = req.nextUrl.pathname;

  const isProtected = PROTECTED_ROUTES.some(r => path.startsWith(r));
  const isPublic = PUBLIC_ROUTES.some(r => path === r);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/connexion", req.url));
  }

  if ((path === "/connexion" || path === "/inscription") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
