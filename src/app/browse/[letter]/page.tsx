import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LoadMoreDreams } from "@/components/LoadMoreDreams";
import { SiteShell } from "@/components/SiteShell";
import { getDreamThemes, getDreamsByLetter } from "@/lib/dreams";

type BrowseLetterParams = { letter: string };

export async function generateMetadata({ params }: { params: Promise<BrowseLetterParams> }): Promise<Metadata> {
  const p = await params;
  const letter = (p.letter ?? "").slice(0, 1).toLowerCase();
  if (!letter.match(/^[a-z]$/)) return {};
  const upper = letter.toUpperCase();
  const title = `${upper} Harfiyle Başlayan Rüyalar`;
  const description = `${upper} harfiyle başlayan rüya tabirleri listesi.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/browse/${letter}`,
    },
    openGraph: {
      type: "website",
      url: `/browse/${letter}`,
      title,
      description,
    },
  };
}

export default async function BrowseLetterPage({ params }: { params: Promise<BrowseLetterParams> }) {
  const p = await params;
  const letter = (p.letter ?? "").slice(0, 1).toLowerCase();
  if (!letter.match(/^[a-z]$/)) notFound();

  const dreams = await getDreamsByLetter(letter);
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const themeChips = (await getDreamThemes()).slice(0, 12);

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl text-foreground">{letter.toUpperCase()} harfine gözat</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Başlığı bu harfle başlayan rüya tabirleri. İsterseniz{" "}
                <Link href="/ruyalar" className="text-foreground underline-offset-4 hover:underline">
                  rüya rehberine
                </Link>{" "}
                dönün veya arama ile devam edin.
              </p>
              <p className="mt-2 text-sm text-muted">
                <span className="text-foreground">{dreams.length}</span> kayıt
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
              <Link href="/search" className="text-sm text-muted transition-colors hover:text-foreground">
                Arama
              </Link>
              <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
                Ana sayfa
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {letters.map((l) => (
              <Link
                key={l}
                href={`/browse/${l}`}
                className={[
                  "grid h-9 w-9 place-items-center rounded-full border text-xs transition-colors",
                  l === letter
                    ? "border-accent/60 bg-surface2 text-foreground"
                    : "border-border bg-surface text-muted hover:border-accent/60 hover:text-foreground",
                ].join(" ")}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>

          {themeChips.length > 0 ? (
            <div className="mt-6">
              <div className="text-xs font-medium uppercase tracking-wider text-muted">Temalar</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {themeChips.map((t) => (
                  <Link
                    key={t}
                    href={`/search?q=${encodeURIComponent(t)}`}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <LoadMoreDreams
              items={dreams.map((d) => ({
                slug: d.slug,
                title: d.title,
                excerpt: d.excerpt,
                themes: d.themes,
              }))}
              pageSize={12}
            />
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
