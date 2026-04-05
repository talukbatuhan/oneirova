import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";
import { getDreamThemes, getLatestDreams, getTrendingDreams } from "@/lib/dreams";
import { searchDreams } from "@/lib/search";

export const metadata: Metadata = {
  title: "Arama",
  description: "Rüya tabirlerinde arama yapın.",
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

type SearchPageParams = { [key: string]: string | string[] | undefined };

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SearchPageParams>;
}) {
  const sp = (await searchParams) ?? {};
  const q = typeof sp.q === "string" ? sp.q : "";
  const theme = typeof sp.theme === "string" ? sp.theme : "";

  const results = q ? await searchDreams(q, { theme, limit: 100 }) : [];
  const themes = await getDreamThemes();
  const trendingFallback = q && results.length === 0 ? await getTrendingDreams(6) : [];
  const latestFallback = q && results.length === 0 ? await getLatestDreams(6) : [];

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl text-foreground">Arama</h1>
              <p className="mt-2 text-sm text-muted">
                {q ? (
                  <>
                    <span className="text-foreground">“{q}”</span> için sonuçlar
                    {theme ? (
                      <>
                        {" "}
                        <span className="text-foreground">{theme}</span> içinde
                      </>
                    ) : null} · <span className="text-foreground">{results.length}</span> sonuç
                  </>
                ) : (
                  "Başlamak için arama yapın."
                )}
              </p>
            </div>
            {q ? (
              <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
                Ana sayfa
              </Link>
            ) : null}
          </div>

          <div className="mt-6">
            <SearchBar variant="hero" initialQuery={q} autoFocus />
          </div>

          {q ? (
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={`/search?q=${encodeURIComponent(q)}`}
                className={[
                  "rounded-full border px-4 py-2 text-xs transition-colors",
                  theme
                    ? "border-border bg-surface text-muted hover:border-accent/60 hover:text-foreground"
                    : "border-accent/60 bg-surface2 text-foreground",
                ].join(" ")}
              >
                Tümü
              </Link>
              {themes.slice(0, 10).map((t) => {
                const selected = theme.toLowerCase() === t.toLowerCase();
                return (
                  <Link
                    key={t}
                    href={`/search?q=${encodeURIComponent(q)}&theme=${encodeURIComponent(t)}`}
                    className={[
                      "rounded-full border px-4 py-2 text-xs transition-colors",
                      selected
                        ? "border-accent/60 bg-surface2 text-foreground"
                        : "border-border bg-surface text-muted hover:border-accent/60 hover:text-foreground",
                    ].join(" ")}
                  >
                    {t}
                  </Link>
                );
              })}
            </div>
          ) : null}

          <div className="mt-8">
            {q ? (
              results.length > 0 ? (
                <DreamList dreams={results} />
              ) : (
                <div className="space-y-10">
                  <div className="rounded-2xl border border-border bg-surface px-6 py-12">
                    <div className="text-sm font-medium text-foreground">Doğrudan eşleşme bulunamadı.</div>
                    <div className="mt-2 text-sm leading-6 text-muted">
                      Daha kısa bir terim deneyin, popüler tabirlere göz atın veya A–Z ile keşfedin.
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Link
                        href="/browse/a"
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                      >
                        A–Z gözat
                      </Link>
                      <Link
                        href="/ruyalar"
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                      >
                        Rüya rehberi
                      </Link>
                      <Link
                        href={`/search?q=${encodeURIComponent(q.split(" ")[0] ?? q)}`}
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                      >
                        Daha kısa ara
                      </Link>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {["diş", "kovalanmak", "su", "sınav", "yılan", "ev"].map((term) => (
                        <Link
                          key={term}
                          href={`/search?q=${encodeURIComponent(term)}`}
                          className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                        >
                          {term}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {trendingFallback.length > 0 ? (
                    <section>
                      <h2 className="text-lg text-foreground">En çok merak edilenler</h2>
                      <p className="mt-1 text-sm text-muted">Bu aramaya uygun sonuç çıkmadı; yine de ilginizi çekebilecek tabirler.</p>
                      <div className="mt-4">
                        <DreamList dreams={trendingFallback} variant="rows" />
                      </div>
                    </section>
                  ) : null}
                  {latestFallback.length > 0 ? (
                    <section>
                      <h2 className="text-lg text-foreground">Yeni eklenenler</h2>
                      <div className="mt-4">
                        <DreamList dreams={latestFallback} variant="cards" />
                      </div>
                    </section>
                  ) : null}
                </div>
              )
            ) : (
              <div className="rounded-2xl border border-border bg-surface px-6 py-12">
                <div className="text-sm font-medium text-foreground">Şunları deneyin…</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["diş", "kovalanmak", "su", "sınav", "yılan", "ev"].map((term) => (
                    <Link
                      key={term}
                      href={`/search?q=${encodeURIComponent(term)}`}
                      className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
