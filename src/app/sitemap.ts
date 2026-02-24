import type { MetadataRoute } from "next";
import { getDreams } from "@/lib/dreams";
import { testPages } from "@/lib/test-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://oneirova.com/",
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const browseRoutes: MetadataRoute.Sitemap = "abcdefghijklmnopqrstuvwxyz".split("").map((l) => ({
    url: `https://oneirova.com/browse/${l}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const dreamRoutes: MetadataRoute.Sitemap = getDreams().map((d) => ({
    url: `https://oneirova.com/dream/${d.slug}`,
    lastModified: new Date(d.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const testRoutes: MetadataRoute.Sitemap = testPages.map((p) => ({
    url: `https://oneirova.com${p.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...browseRoutes, ...dreamRoutes, ...testRoutes];
}

