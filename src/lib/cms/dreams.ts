import type { DreamSection } from "@/lib/dreams";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type CmsDreamStatus = "draft" | "published";

export type CmsDreamSeo = {
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  focusKeyword?: string;
  cluster?: string;
};

export type CmsDreamInput = {
  slug: string;
  title: string;
  excerpt: string;
  themes: string[];
  quickMeaning: string[];
  sections: DreamSection[];
  status?: CmsDreamStatus;
  publishedAt?: string | null;
  coverImageUrl?: string | null;
  ogImageUrl?: string | null;
  seo?: CmsDreamSeo;
  updatedAt?: string;
};

export async function cmsListDreams(): Promise<
  {
    slug: string;
    title: string;
    status: CmsDreamStatus;
    publishedAt: string | null;
    updatedAt: string;
  }[]
> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("dreams")
    .select("slug,title,status,published_at,updated_at")
    .order("updated_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []).map((r) => ({
    slug: r.slug as string,
    title: r.title as string,
    status: (r.status as CmsDreamStatus) ?? "draft",
    publishedAt: (r.published_at as string | null) ?? null,
    updatedAt: String(r.updated_at ?? ""),
  }));
}

export async function cmsGetDream(slug: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("dreams")
    .select(
      "slug,title,excerpt,themes,quick_meaning,sections,status,published_at,cover_image_url,og_image_url,seo,updated_at",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function cmsUpsertDream(input: CmsDreamInput) {
  const supabase = createSupabaseAdminClient();

  const now = new Date().toISOString();
  const status: CmsDreamStatus = input.status ?? "published";

  const payload: any = {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    themes: input.themes,
    quick_meaning: input.quickMeaning,
    sections: input.sections,
    status,
    updated_at: input.updatedAt ?? now,
  };

  if (status === "published") {
    payload.published_at = input.publishedAt ?? now;
  } else {
    payload.published_at = null;
  }

  if (typeof input.coverImageUrl !== "undefined") payload.cover_image_url = input.coverImageUrl;
  if (typeof input.ogImageUrl !== "undefined") payload.og_image_url = input.ogImageUrl;
  if (typeof input.seo !== "undefined") payload.seo = input.seo ?? {};

  const { error } = await supabase.from("dreams").upsert(payload, { onConflict: "slug" });
  if (error) throw error;
}

export async function cmsDeleteDream(slug: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("dreams").delete().eq("slug", slug);
  if (error) throw error;
}

