import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/auth";

export async function POST(req: Request) {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return NextResponse.redirect(new URL("/admin/login", req.url), 303);
}

