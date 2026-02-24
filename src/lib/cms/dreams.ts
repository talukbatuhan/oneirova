import type { DreamSection } from "@/lib/dreams";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type CmsDreamInput = {
  slug: string;
  title: string;
  excerpt: string;
  themes: string[];
  quickMeaning: string[];
  sections: DreamSection[];
  updatedAt?: string;
};

export async function cmsListDreams(): Promise<
  {
    slug: string;
    title: string;
    updatedAt: string;
  }[]
> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("dreams")
    .select("slug,title,updated_at")
    .order("updated_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []).map((r) => ({
    slug: r.slug as string,
    title: r.title as string,
    updatedAt: String(r.updated_at ?? ""),
  }));
}

export async function cmsGetDream(slug: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("dreams")
    .select("slug,title,excerpt,themes,quick_meaning,sections,updated_at")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function cmsUpsertDream(input: CmsDreamInput) {
  const supabase = createSupabaseAdminClient();
  const payload = {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    themes: input.themes,
    quick_meaning: input.quickMeaning,
    sections: input.sections,
    updated_at: input.updatedAt ?? new Date().toISOString(),
  };
  const { error } = await supabase.from("dreams").upsert(payload, { onConflict: "slug" });
  if (error) throw error;
}

export async function cmsDeleteDream(slug: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("dreams").delete().eq("slug", slug);
  if (error) throw error;
}

