import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/ruya/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/ruya\//, "/dream/");
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/dream/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/dream\//, "/ruya/");
    return NextResponse.redirect(url, 308);
  }

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookie === "1") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/ruya/:path*", "/dream/:path*"],
};

