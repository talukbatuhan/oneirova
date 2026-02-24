"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cmsDeleteDream, cmsUpsertDream } from "@/lib/cms/dreams";

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

export async function saveDreamAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const themes = parseLines(formData.get("themes"));
  const quickMeaning = parseLines(formData.get("quickMeaning"));
  const sections = parseJson(formData.get("sections"), []);

  if (!slug || !title || !excerpt) redirect("/admin?err=Zorunlu alanlar eksik.");

  await cmsUpsertDream({ slug, title, excerpt, themes, quickMeaning, sections });
  revalidatePath("/");
  revalidatePath(`/dream/${slug}`);
  revalidatePath(`/admin`);
  redirect(`/admin/dreams/${encodeURIComponent(slug)}`);
}

export async function deleteDreamAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) redirect("/admin");
  await cmsDeleteDream(slug);
  revalidatePath("/");
  revalidatePath(`/dream/${slug}`);
  revalidatePath(`/admin`);
  redirect("/admin");
}

