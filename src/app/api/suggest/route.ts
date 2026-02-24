import { suggestDreams } from "@/lib/search";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const limit = Number(url.searchParams.get("limit") ?? "7") || 7;

  if (!q.trim()) return Response.json([]);

  const results = await suggestDreams(q, Math.max(1, Math.min(15, limit)));
  return Response.json(
    results.map((d) => ({
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      themes: d.themes,
    })),
  );
}

