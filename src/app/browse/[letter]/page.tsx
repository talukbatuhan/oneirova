import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { SiteHeader } from "@/components/SiteHeader";
import { getDreamsByLetter } from "@/lib/dreams";

export function generateMetadata({ params }: { params: { letter: string } }): Metadata {
  const letter = (params.letter ?? "").slice(0, 1).toLowerCase();
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

export default function BrowseLetterPage({ params }: { params: { letter: string } }) {
  const letter = (params.letter ?? "").slice(0, 1).toLowerCase();
  if (!letter.match(/^[a-z]$/)) notFound();

  const dreams = getDreamsByLetter(letter);
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-10">
        <Container>
          <div className="mx-auto max-w-3xl">
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
              <DreamList dreams={dreams} />
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
