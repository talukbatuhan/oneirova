import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getDreamThemes, getLatestDreams, getWeeklyTrendingDreams } from "@/lib/dreams";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ruya Tabirleri - A'dan Z'ye Ruya Sozlugu",
  description: "Binlerce ruya tabiri ve anlami. Ruyanda gorduklerinin ne anlama geldigini ogren. A-Z ruya sozlugu, populer yorumlar ve en yeni icerikler.",
  alternates: {
    canonical: "/ruyalar",
  },
  openGraph: {
    type: "website",
    url: "/ruyalar",
    title: "Ruya Tabirleri - A'dan Z'ye Ruya Sozlugu",
    description: "Binlerce ruya tabiri ve anlami. Ruyanda gorduklerinin ne anlama geldigini ogren.",
  },
  keywords: ["ruya tabirleri", "ruya yorumu", "ruya anlami", "ruya sozlugu", "ruya tabiri", "ruya gormek"],
};

export default async function DreamHubPage() {
  const trending = await getWeeklyTrendingDreams(8);
  const latest = await getLatestDreams(6);
  const themeList = (await getDreamThemes()).slice(0, 14);
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popüler Rüya Tabirleri",
    itemListElement: trending.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.oneirova.com/ruya/${d.slug}`,
      name: d.title,
    })),
  };

  return (
    <SiteShell mainClassName="pb-24 pt-8 sm:pt-12">
      <JsonLd data={itemListSchema} />
      <Container>
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Ruya Tabirleri" },
            ]}
          />

          {/* Header */}
          <header className="text-center">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Ruya Tabirleri
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted">
              Sembol, duygu ve senaryolari arayin. A-Z gozatin, populer ve en yeni yorumlari kesfedin.
            </p>
          </header>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar variant="hero" />
          </div>

          {themeList.length > 0 ? (
            <section className="mx-auto mt-10 max-w-3xl" aria-labelledby="themes-heading">
              <h2 id="themes-heading" className="text-center text-sm font-medium text-foreground">
                Popüler temalar
              </h2>
              <p className="mx-auto mt-2 max-w-md text-center text-xs text-muted">
                Bir temaya tıklayarak o konuda örnek aramalarla içeriklere dalın.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {themeList.map((t) => (
                  <Link
                    key={t}
                    href={`/search?q=${encodeURIComponent(t)}`}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* A-Z Section */}
        <section id="az" className="mt-14 scroll-mt-24" aria-labelledby="az-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="az-heading" className="font-serif text-xl text-foreground">A-Z Gozat</h2>
            <Link 
              href="/browse/a" 
              className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
            >
              Dizini ac
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <nav className="mt-4" aria-label="Alfabe navigasyonu">
            <div className="flex flex-wrap gap-2">
              {letters.map((l) => (
                <Link
                  key={l}
                  href={`/browse/${l}`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-sm font-medium text-muted transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
                  aria-label={`${l.toUpperCase()} harfi ile baslayan ruyalar`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </nav>
        </section>

        {/* Content Grid */}
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <section id="populer" className="scroll-mt-24" aria-labelledby="popular-heading">
            <div className="flex items-center justify-between gap-4">
              <h2 id="popular-heading" className="font-serif text-xl text-foreground">Haftanin En Cok Okunanlari</h2>
              <Link 
                href="/browse/a" 
                className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                A-Z
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="mt-4">
              <DreamList dreams={trending} variant="cards" />
            </div>
          </section>

          <section id="en-yeni" className="scroll-mt-24" aria-labelledby="latest-heading">
            <div className="flex items-center justify-between gap-4">
              <h2 id="latest-heading" className="font-serif text-xl text-foreground">En Yeni</h2>
              <Link 
                href="/browse/a" 
                className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                Gozat
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="mt-4">
              <DreamList dreams={latest} variant="cards" />
            </div>
          </section>
        </div>
      </Container>
    </SiteShell>
  );
}
