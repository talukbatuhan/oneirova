import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
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
            <DreamList dreams={dreams} />
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
