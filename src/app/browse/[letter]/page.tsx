import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";

import { SiteShell } from "@/components/SiteShell";
import { getDreamsByLetter } from "@/lib/dreams";

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

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl text-foreground">{letter.toUpperCase()} harfine gözat</h1>
              <p className="mt-2 text-sm text-muted">
                <span className="text-foreground">{dreams.length}</span> kayıt
              </p>
            </div>
            <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
              Ana sayfa
            </Link>
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

          <div className="mt-8">
            {dreams.length === 0 ? (
              <div className="rounded-2xl border border-border bg-surface px-5 py-10 text-center text-sm text-muted">
                Bu harfle başlayan bir rüya tabiri bulunamadı.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dreams.map((d) => {
                  const rawTitle = String(d.title ?? "").trim();
                  const isAlready = /^rüyada\s/i.test(rawTitle);
                  const parts = rawTitle.split(/\s+/).filter(Boolean);
                  const formatted = isAlready ? rawTitle : parts.length <= 1 ? `Rüyada ${rawTitle} Görmek` : `Rüyada ${rawTitle}`;
                  const excerpt = String(d.excerpt ?? "").trim();

                  return (
                    <Link
                      key={d.slug}
                      href={`/ruya/${d.slug}`}
                      className={[
                        "group rounded-2xl border border-border bg-surface/80 px-5 py-5 shadow-sm backdrop-blur-sm",
                        "transition-colors hover:border-accent/60 hover:bg-surface2 hover:shadow-md",
                      ].join(" ")}
                    >
                      <div className="text-base font-medium leading-snug text-foreground">{formatted}</div>
                      <div className="mt-2 text-sm leading-6 text-muted">{excerpt || "Kısa açıklama yakında."}</div>
                      {d.themes?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {d.themes.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
