export const ADMIN_COOKIE_NAME = "oneirova_admin";

export function isAdminEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function verifyAdminPassword(raw: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return raw === expected;
}

