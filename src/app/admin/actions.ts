"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cmsDeleteDream, cmsUpsertDream } from "@/lib/cms/dreams";
import type { CmsDreamStatus } from "@/lib/cms/dreams";

function parseLines(value: FormDataEntryValue | null): string[] {
  const raw = String(value ?? "");
  return raw
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseJson<T>(value: FormDataEntryValue | null, fallback: T): T {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

type DreamPayload = {
  slug?: unknown;
  title?: unknown;
  excerpt?: unknown;
  themes?: unknown;
  quickMeaning?: unknown;
  sections?: unknown;
  status?: unknown;
  publishedAt?: unknown;
  coverImageUrl?: unknown;
  ogImageUrl?: unknown;
  seo?: unknown;
};

function safeReturnTo(value: FormDataEntryValue | null): string {
  const raw = String(value ?? "").trim();
  if (raw.startsWith("/admin")) return raw;
  return "/admin";
}

function redirectWithErr(returnTo: string, message: string): never {
  const url = `${returnTo}?err=${encodeURIComponent(message)}`;
  redirect(url);
  throw new Error("redirect");
}

function toStringLines(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((x) => String(x ?? "").trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return [];
}

function toSections(value: unknown): { title: string; body: string[] }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((x) => {
      const obj = x as any;
      const title = String(obj?.title ?? "").trim();
      const body = toStringLines(obj?.body);
      if (!title) return null;
      return { title, body };
    })
    .filter((x): x is { title: string; body: string[] } => Boolean(x));
}

function normalizeRequiredString(value: unknown): string {
  const s = String(value ?? "").trim();
  if (!s) return "";
  const lowered = s.toLowerCase();
  if (lowered === "undefined" || lowered === "null") return "";
  return s;
}

function parseDreamPayload(value: FormDataEntryValue | null, returnTo: string) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;

  let parsed: DreamPayload | null = null;
  try {
    parsed = JSON.parse(raw) as DreamPayload;
  } catch {
    redirectWithErr(returnTo, "JSON geçersiz. (Not: ``` işaretlerini eklemeyin, sadece saf JSON yapıştırın.)");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    redirectWithErr(returnTo, "JSON bir nesne olmalı: { ... }");
  }

  const slug = normalizeRequiredString(parsed?.slug);
  const title = normalizeRequiredString(parsed?.title);
  const excerpt = normalizeRequiredString(parsed?.excerpt);
  const themes = toStringLines(parsed?.themes);
  const quickMeaning = toStringLines(parsed?.quickMeaning);
  const sections = toSections(parsed?.sections);

  const statusRaw = String(parsed?.status ?? "published").trim();
  const status: CmsDreamStatus = statusRaw === "draft" || statusRaw === "published" ? statusRaw : "published";

  function normalizeOptionalField(obj: any, key: string): string | null | undefined {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) return undefined;
    const v = obj?.[key];
    if (v == null) return null;
    let s = String(v ?? "").trim();
    if (s.startsWith("`") && s.endsWith("`") && s.length >= 2) s = s.slice(1, -1).trim();
    return s || null;
  }

  const publishedAt = normalizeOptionalField(parsed, "publishedAt");
  const coverImageUrl = normalizeOptionalField(parsed, "coverImageUrl");
  const ogImageUrl = normalizeOptionalField(parsed, "ogImageUrl");

  const seo =
    Object.prototype.hasOwnProperty.call(parsed, "seo") &&
    typeof parsed?.seo === "object" &&
    parsed?.seo &&
    !Array.isArray(parsed?.seo)
      ? (parsed.seo as any)
      : undefined;

  if (!slug || !title || !excerpt) redirectWithErr(returnTo, "JSON içinde slug/title/excerpt zorunlu.");

  return {
    slug,
    title,
    excerpt,
    themes,
    quickMeaning,
    sections,
    status,
    publishedAt,
    coverImageUrl,
    ogImageUrl,
    seo,
  };
}

export async function saveDreamAction(formData: FormData) {
  const returnTo = safeReturnTo(formData.get("returnTo"));
  const fromPayload = parseDreamPayload(formData.get("payload"), returnTo);

  const slug = fromPayload?.slug ?? normalizeRequiredString(formData.get("slug"));
  const title = fromPayload?.title ?? normalizeRequiredString(formData.get("title"));
  const excerpt = fromPayload?.excerpt ?? normalizeRequiredString(formData.get("excerpt"));
  const themes = fromPayload?.themes ?? parseLines(formData.get("themes"));
  const quickMeaning = fromPayload?.quickMeaning ?? parseLines(formData.get("quickMeaning"));
  const sections = fromPayload?.sections ?? parseJson(formData.get("sections"), []);

  if (!slug || !title || !excerpt) redirectWithErr(returnTo, "Zorunlu alanlar eksik.");

  await cmsUpsertDream({
    slug,
    title,
    excerpt,
    themes,
    quickMeaning,
    sections,
    status: fromPayload?.status,
    publishedAt: fromPayload?.publishedAt,
    coverImageUrl: fromPayload?.coverImageUrl,
    ogImageUrl: fromPayload?.ogImageUrl,
    seo: fromPayload?.seo,
  });
  revalidatePath("/");
  revalidatePath(`/dream/${slug}`);
  revalidatePath(`/ruya/${slug}`);
  revalidatePath(`/admin`);
  redirect(`/admin/dreams/${encodeURIComponent(slug)}`);
}

export async function deleteDreamAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) redirect("/admin");
  await cmsDeleteDream(slug);
  revalidatePath("/");
  revalidatePath(`/dream/${slug}`);
  revalidatePath(`/ruya/${slug}`);
  revalidatePath(`/admin`);
  redirect("/admin");
}