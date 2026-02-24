import type { DreamEntry } from "./dreams";
import { getDreams } from "./dreams";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/ı/g, "i")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreDream(dream: DreamEntry, query: string): number {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(dream.title);
  const excerpt = normalize(dream.excerpt);
  const themes = normalize(dream.themes.join(" "));

  if (title === q) return 1000;
  if (title.startsWith(q)) return 650;
  if (title.includes(q)) return 520;
  if (themes.includes(q)) return 420;
  if (excerpt.includes(q)) return 240;

  const parts = q.split(" ").filter(Boolean);
  let score = 0;
  for (const p of parts) {
    if (title.startsWith(p)) score += 120;
    else if (title.includes(p)) score += 80;
    else if (themes.includes(p)) score += 50;
    else if (excerpt.includes(p)) score += 25;
  }
  return score;
}

export type SearchOptions = {
  theme?: string;
  limit?: number;
};

export async function searchDreams(query: string, options: SearchOptions = {}): Promise<DreamEntry[]> {
  const q = normalize(query);
  const theme = options.theme ? normalize(options.theme) : "";
  const limit = options.limit ?? 50;

  let pool = await getDreams();
  if (theme) pool = pool.filter((d) => normalize(d.themes.join(" ")).includes(theme));
  if (!q) return pool.slice(0, limit);

  return pool
    .map((d) => ({ d, s: scoreDream(d, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.d.title.localeCompare(b.d.title))
    .slice(0, limit)
    .map((x) => x.d);
}

export async function suggestDreams(query: string, limit: number = 6): Promise<DreamEntry[]> {
  const q = normalize(query);
  if (!q) return [];
  return searchDreams(q, { limit });
}

export function highlightMatch(text: string, query: string): { left: string; match: string; right: string } {
  const q = normalize(query);
  const raw = text;
  if (!q) return { left: raw, match: "", right: "" };

  const n = normalize(raw);
  const idx = n.indexOf(q);
  if (idx < 0) return { left: raw, match: "", right: "" };

  const before = raw.slice(0, idx);
  const mid = raw.slice(idx, idx + q.length);
  const after = raw.slice(idx + q.length);
  return { left: before, match: mid, right: after };
}
