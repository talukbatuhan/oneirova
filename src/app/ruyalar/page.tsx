import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";
import { getLatestDreams, getWeeklyTrendingDreams } from "@/lib/dreams";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Rüya Tabirleri",
  description: "A–Z rüya tabirleri dizini, popüler yorumlar ve en yeni içerikler.",
  alternates: {
    canonical: "/ruyalar",
  },
  openGraph: {
    type: "website",
    url: "/ruyalar",
    title: "Rüya Tabirleri",
    description: "A–Z rüya tabirleri dizini, popüler yorumlar ve en yeni içerikler.",
  },
};

export default async function DreamHubPage() {
  const trending = await getWeeklyTrendingDreams(8);
  const latest = await getLatestDreams(6);
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <SiteShell mainClassName="pb-24 pt-8 sm:pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl text-foreground">Rüya Tabirleri</h1>
              <p className="mt-2 text-sm text-muted">
                Sembol, duygu ve senaryoları arayın; A–Z gözatın; popüler ve en yeni yorumları keşfedin.
              </p>
            </div>
            <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
              Ana sayfa
            </Link>
          </div>

          <div className="mt-6">
            <SearchBar variant="hero" />
          </div>


        </div>

        <section id="az" className="mt-14 scroll-mt-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-lg text-foreground">A–Z gözat</h2>
            <Link href="/browse/a" className="text-sm text-muted transition-colors hover:text-foreground">
              Dizini aç
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {letters.map((l) => (
              <Link
                key={l}
                href={`/browse/${l}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <section id="populer" className="scroll-mt-24">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-lg text-foreground">Haftanın en çok okunanları</h2>
              <Link href="/browse/a" className="text-sm text-muted transition-colors hover:text-foreground">
                A–Z
              </Link>
            </div>
            <div className="mt-4">
              <div className="md:hidden">
                <DreamList dreams={trending} variant="cards" />
              </div>
              <div className="hidden md:block">
                <DreamList dreams={trending} />
              </div>
            </div>
          </section>

          <section id="en-yeni" className="scroll-mt-24">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-lg text-foreground">En yeni</h2>
              <Link href="/browse/a" className="text-sm text-muted transition-colors hover:text-foreground">
                Gözat
              </Link>
            </div>
            <div className="mt-4">
              <div className="md:hidden">
                <DreamList dreams={latest} variant="cards" />
              </div>
              <div className="hidden md:block">
                <DreamList dreams={latest} />
              </div>
            </div>
          </section>
        </div>


      </Container>
    </SiteShell>
  );
}