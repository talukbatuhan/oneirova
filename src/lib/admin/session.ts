import { SignJWT, jwtVerify } from "jose";

const alg = "HS256";
const issuer = "oneirova";
const audience = "admin";

function getSecretBytes(): Uint8Array | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(secret);
}

/** Giriş sonrası httpOnly çereze yazılır (Edge + Node uyumlu). */
export async function createAdminSessionToken(): Promise<string | null> {
  const secret = getSecretBytes();
  if (!secret) return null;
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg })
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(secret);
}

/** İmza ve süre kontrolü; gizli yok veya token geçersizse false. */
export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  const secret = getSecretBytes();
  if (!secret || !token?.trim()) return false;
  try {
    await jwtVerify(token.trim(), secret, {
      algorithms: [alg],
      issuer,
      audience,
    });
    return true;
  } catch {
    return false;
  }
}
