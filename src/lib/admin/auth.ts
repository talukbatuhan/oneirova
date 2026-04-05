import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME } from "./constants";
import { verifyAdminSessionToken } from "./session";

export { ADMIN_COOKIE_NAME };

export function isAdminEnabled(): boolean {
  const password = process.env.ADMIN_PASSWORD?.trim();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim();
  return Boolean(password && sessionSecret && sessionSecret.length >= 16);
}

function sha256Utf8(s: string): Buffer {
  return createHash("sha256").update(s, "utf8").digest();
}

export function verifyAdminPassword(raw: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = sha256Utf8(raw);
  const b = sha256Utf8(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Route handler ve benzeri yerler için (redirect kullanmadan). */
export async function isAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(ADMIN_COOKIE_NAME)?.value);
}

/** Server action ve server component’lerde: oturum yoksa girişe yönlendirir. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdminSession())) {
    redirect("/admin/login");
  }
}
