import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { SearchBar } from "@/components/SearchBar";
import { SiteHeader } from "@/components/SiteHeader";
import { getDreamThemes } from "@/lib/dreams";
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

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const theme = typeof searchParams?.theme === "string" ? searchParams.theme : "";

  const results = q ? searchDreams(q, { theme, limit: 100 }) : [];
  const themes = getDreamThemes();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-10">
        <Container>
          <div className="mx-auto max-w-3xl">
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
                      ) : null}
                      {" "}
                      · <span className="text-foreground">{results.length}</span> sonuç
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
                  <div className="rounded-2xl border border-border bg-surface px-6 py-12">
                    <div className="text-sm font-medium text-foreground">Doğrudan eşleşme bulunamadı.</div>
                    <div className="mt-2 text-sm leading-6 text-muted">
                      Daha kısa bir terim deneyin veya A–Z üzerinden benzer sembolleri keşfedin.
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Link
                        href="/browse/a"
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        A–Z gözat
                      </Link>
                      <Link
                        href={`/search?q=${encodeURIComponent(q.split(" ")[0] ?? q)}`}
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        Daha kısa ara
                      </Link>
                    </div>
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
      </main>
    </div>
  );
}
