import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";
import { getLatestDreams, getTrendingDreams } from "@/lib/dreams";
import { testPages } from "@/lib/test-pages";

export const metadata: Metadata = {
  title: "Rüya Tabirleri",
  description: "Oneirova ile rüya tabirlerini keşfedin ve hızlıca arayın.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Rüya Tabirleri",
    description: "Oneirova ile rüya tabirlerini keşfedin ve hızlıca arayın.",
  },
};

export default async function Home() {
  const trending = await getTrendingDreams(8);
  const latest = await getLatestDreams(6);
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <SiteShell>
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-balance text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Rüya tabirleri, yeniden düşünülmüş.
          </h1>
          <p className="mt-4 text-pretty text-base leading-7 text-muted">
            Sembol, duygu ve senaryoları modern bir rüya sözlüğünde sade bir deneyimle arayın.
          </p>

          <div className="mt-8">
            <SearchBar variant="hero" autoFocus />
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-sm text-muted">
            {["diş", "kovalanmak", "su", "sınav", "yılan", "ev"].map((q) => (
              <Link
                key={q}
                href={`/search?q=${encodeURIComponent(q)}`}
                className="rounded-full border border-border bg-surface px-4 py-2 transition-colors hover:border-accent/60 hover:bg-surface2"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>

        <section className="mt-14">
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
          <section>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-lg text-foreground">Popüler</h2>
              <Link href="/search?q=diş" className="text-sm text-muted transition-colors hover:text-foreground">
                Keşfet
              </Link>
            </div>
            <div className="mt-4">
              <DreamList dreams={trending} />
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-lg text-foreground">En yeni</h2>
              <Link href="/browse/a" className="text-sm text-muted transition-colors hover:text-foreground">
                Gözat
              </Link>
            </div>
            <div className="mt-4">
              <DreamList dreams={latest} />
            </div>
          </section>
        </div>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-lg text-foreground">Test sayfaları</h2>
            <Link href={testPages[0]?.href ?? "/"} className="text-sm text-muted transition-colors hover:text-foreground">
              Aç
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testPages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={[
                  "group rounded-2xl border border-border bg-surface px-5 py-5 transition-colors",
                  "hover:border-accent/60 hover:bg-surface2",
                ].join(" ")}
              >
                <div className="text-base font-medium text-foreground">{p.title}</div>
                <div className="mt-2 text-sm leading-6 text-muted">{p.excerpt}</div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </SiteShell>
  );
}
