import type { MetadataRoute } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://oneirova.com/",
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://oneirova.com/ruyalar",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://oneirova.com/astroloji",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://oneirova.com/numeroloji",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://oneirova.com/testler",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const browseRoutes: MetadataRoute.Sitemap = "abcdefghijklmnopqrstuvwxyz".split("").map((l) => ({
    url: `https://oneirova.com/browse/${l}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const dreamRoutes: MetadataRoute.Sitemap = [];
  if (isSupabaseConfigured()) {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("dreams")
      .select("slug,updated_at,status")
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(5000);
    if (error) throw error;
    for (const r of data ?? []) {
      const slug = String((r as any).slug ?? "").trim();
      if (!slug) continue;
      const updatedAt = String((r as any).updated_at ?? "");
      dreamRoutes.push({
        url: `https://oneirova.com/ruya/${encodeURIComponent(slug)}`,
        lastModified: updatedAt ? new Date(updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return [...staticRoutes, ...browseRoutes, ...dreamRoutes];
}
