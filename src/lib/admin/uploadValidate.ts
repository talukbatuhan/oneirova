/** İstemciden gelen `bucket` kabul edilmez; tek kaynak burası (veya env). */
export const ADMIN_UPLOAD_BUCKET =
  process.env.ADMIN_STORAGE_BUCKET?.trim().match(/^[a-z0-9-]{1,63}$/)?.[0] ?? "oneirova";

export const MAX_ADMIN_UPLOAD_BYTES = 5 * 1024 * 1024;

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/**
 * Supabase object key: güvenli segmentler, path traversal yok.
 * Örnek: dreams/my-slug/cover.webp
 */
export function sanitizeUploadPath(raw: string): string | null {
  const normalized = raw.trim().replace(/\\/g, "/");
  if (!normalized || normalized.startsWith("/") || normalized.includes("..")) return null;
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0 || segments.length > 12) return null;
  for (const seg of segments) {
    if (seg === "." || seg === "..") return null;
    if (seg.length > 200) return null;
    if (!/^[\p{L}\p{N}._-]+$/u.test(seg)) return null;
  }
  return segments.join("/");
}

function matchesImageMagic(buf: ArrayBuffer, declared: string): boolean {
  const u = new Uint8Array(buf.slice(0, 14));
  if (u.length < 4) return false;
  const isJpeg = u[0] === 0xff && u[1] === 0xd8 && u[2] === 0xff;
  const isPng = u[0] === 0x89 && u[1] === 0x50 && u[2] === 0x4e && u[3] === 0x47;
  const isGif = u[0] === 0x47 && u[1] === 0x49 && u[2] === 0x46 && u[3] === 0x38;
  const isWebp =
    u.length >= 12 &&
    u[0] === 0x52 &&
    u[1] === 0x49 &&
    u[2] === 0x46 &&
    u[3] === 0x46 &&
    u[8] === 0x57 &&
    u[9] === 0x45 &&
    u[10] === 0x42 &&
    u[11] === 0x50;
  if (declared === "image/jpeg") return isJpeg;
  if (declared === "image/png") return isPng;
  if (declared === "image/gif") return isGif;
  if (declared === "image/webp") return isWebp;
  return false;
}

export async function validateAdminImageUpload(
  file: File,
): Promise<{ ok: true; buffer: ArrayBuffer; contentType: string } | { ok: false; error: string }> {
  if (!(file instanceof File)) return { ok: false, error: "Dosya gerekli." };
  if (file.size === 0) return { ok: false, error: "Boş dosya." };
  if (file.size > MAX_ADMIN_UPLOAD_BYTES) {
    return { ok: false, error: "Dosya çok büyük (en fazla 5 MB)." };
  }
  const type = (file.type || "").toLowerCase().split(";")[0]?.trim() ?? "";
  if (!ALLOWED_TYPES.has(type)) {
    return { ok: false, error: "Yalnızca JPEG, PNG, WebP veya GIF yüklenebilir." };
  }
  const buffer = await file.arrayBuffer();
  if (!matchesImageMagic(buffer, type)) {
    return { ok: false, error: "Dosya içeriği seçilen görsel türü ile uyuşmuyor." };
  }
  return { ok: true, buffer, contentType: type };
}
