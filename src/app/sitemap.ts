import type { MetadataRoute } from "next";
import { getDreams } from "@/lib/dreams";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://oneirova.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/ruyalar`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/browse/a`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/astroloji`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/numeroloji`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/testler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/yks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const browseRoutes: MetadataRoute.Sitemap = "abcdefghijklmnopqrstuvwxyz".split("").map((l) => ({
    url: `${BASE_URL}/browse/${l}`,
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
        url: `${BASE_URL}/ruya/${encodeURIComponent(slug)}`,
        lastModified: updatedAt ? new Date(updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } else {
    const list = await getDreams();
    for (const d of list) {
      const slug = String(d.slug ?? "").trim();
      if (!slug) continue;
      const updatedAt = String(d.updatedAt ?? "").trim();
      dreamRoutes.push({
        url: `${BASE_URL}/ruya/${encodeURIComponent(slug)}`,
        lastModified: updatedAt ? new Date(updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return [...staticRoutes, ...browseRoutes, ...dreamRoutes];
}
