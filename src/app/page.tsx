import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";
import { getDailyDream, getWeeklyTrendingDreams } from "@/lib/dreams";

export const metadata: Metadata = {
  title: "Oneirova - Ruyalar, Astroloji ve Numeroloji",
  description: "Ruyalarini kesfet, burc yorumlarini oku, numeroloji ile hayatina anlam kat. Turkiye'nin en kapsamli ruya tabirleri ve astroloji platformu.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Oneirova - Ruyalar, Astroloji ve Numeroloji",
    description: "Ruyalarini kesfet, burc yorumlarini oku, numeroloji ile hayatina anlam kat. Turkiye'nin en kapsamli ruya tabirleri ve astroloji platformu.",
  },
  keywords: ["ruya tabirleri", "ruya yorumu", "burc yorumlari", "astroloji", "numeroloji", "gunluk burc", "ruya anlami"],
};

export const revalidate = 3600;

type HomeCard = {
  title: string;
  excerpt: string;
  href: string;
  meta?: string;
  imageUrl?: string | null;
};

function ImageCard({
  item,
  tone,
}: {
  item: HomeCard;
  tone: "dreams" | "astro" | "numero" | "tests";
}) {
  const gradients = {
    dreams: "from-accent/20 via-transparent to-accent2/10",
    astro: "from-accent2/15 via-transparent to-accent/10",
    numero: "from-accent/15 via-transparent to-surface2",
    tests: "from-accent2/15 via-transparent to-surface2",
  };

  return (
    <Link
      href={item.href}
      className="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:-translate-y-0.5"
    >
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-70"
        />
      ) : null}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[tone]} ${item.imageUrl ? "opacity-80" : ""}`} />
      <div className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-base font-medium leading-snug text-foreground transition-colors group-hover:text-accent sm:text-lg">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2 sm:mt-2">{item.excerpt}</p>
          </div>
          {item.meta ? (
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider sm:px-2.5 sm:py-1 ${
              item.meta === "Popüler"
                ? "bg-accent/10 text-accent"
                : "bg-accent2/10 text-accent2"
            }`}>
              {item.meta}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function TitleOnlyList({ items }: { items: { title: string; href: string }[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface px-5 py-10 text-center text-sm text-muted">
        Henüz sonuç yok.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface/80 shadow-sm backdrop-blur-sm">
      <nav aria-label="Ruya listesi">
        <ul className="divide-y divide-border">
          {items.map((x, idx) => (
            <li key={x.href}>
              <Link
                href={x.href}
                className="group flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium leading-snug text-foreground transition-colors hover:bg-surface2 sm:gap-3 sm:px-4 sm:py-3"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-semibold text-accent">
                  {idx + 1}
                </span>
                <span className="truncate transition-colors group-hover:text-accent">
                  {x.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function SquareCardGrid({ items }: { items: { title: string; href: string; imageUrl?: string | null }[] }) {
  if (items.length === 0) {
    return <div className="rounded-lg border border-border bg-surface px-5 py-10 text-center text-sm text-muted">Henüz sonuç yok.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
      {items.map((x) => (
        <Link
          key={x.href}
          href={x.href}
          className="group relative block overflow-hidden rounded-lg bg-surface transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="relative aspect-square">
            {x.imageUrl ? (
              <img
                src={x.imageUrl}
                alt={x.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent2/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
              <h3 className="line-clamp-2 text-xs font-medium leading-snug text-white transition-colors group-hover:text-white sm:text-sm">
                {x.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function Home() {
  const dreamPopular = await getWeeklyTrendingDreams(12);
  const dailyDream = await getDailyDream();

  const astroPopular: HomeCard[] = [
    {
      title: "Koç burcu",
      excerpt: "Başlatır, hızlanır, cesaret eder.",
      href: "/astroloji?burc=koc",
      meta: "Popüler",
    },
    {
      title: "Aslan burcu",
      excerpt: "Parlar, sahne alır, yaratır.",
      href: "/astroloji?burc=aslan",
      meta: "Popüler",
    },
    {
      title: "Akrep burcu",
      excerpt: "Derine iner, dönüştürür, gerçeği arar.",
      href: "/astroloji?burc=akrep",
      meta: "Popüler",
    },
  ];

  const astroNew: HomeCard[] = [
    {
      title: "Balık burcu",
      excerpt: "Sezer, akar, şefkatle kapsar.",
      href: "/astroloji?burc=balik",
      meta: "Yeni",
    },
    {
      title: "İkizler burcu",
      excerpt: "Merak eder, bağ kurar, anlatır.",
      href: "/astroloji?burc=ikizler",
      meta: "Yeni",
    },
    {
      title: "Terazi burcu",
      excerpt: "Dengeler, uzlaştırır, estetik kurar.",
      href: "/astroloji?burc=terazi",
      meta: "Yeni",
    },
  ];

  const numeroPopular: HomeCard[] = [
    {
      title: "Hayat yolu sayısı",
      excerpt: "Doğum tarihinden temel eğilimi çıkar: kısa özet.",
      href: "/numeroloji#hesapla",
      meta: "Popüler",
    },
    {
      title: "Gün sayısı",
      excerpt: "Bugünün enerjisi için hızlı bir odak cümlesi.",
      href: "/numeroloji#hesapla",
      meta: "Popüler",
    },
    {
      title: "İsim analizi",
      excerpt: "İsim-soyisim üzerinden tema ve güçlü yönler.",
      href: "/numeroloji",
      meta: "Popüler",
    },
  ];

  const numeroNew: HomeCard[] = [
    {
      title: "Haftalık sayı teması",
      excerpt: "Tek bir sayıyla haftanın ana odağını netleştir.",
      href: "/numeroloji",
      meta: "Yeni",
    },
    {
      title: "Aylık yön",
      excerpt: "Ayın ritmi: niyet, eylem ve bırakma üçlüsü.",
      href: "/numeroloji",
      meta: "Yeni",
    },
    {
      title: "Tekrar eden sayılar",
      excerpt: "11:11, 22:22 gibi desenleri anlamlandırma.",
      href: "/numeroloji",
      meta: "Yeni",
    },
  ];

  const testsPopular: HomeCard[] = [
    { title: "Big Five (mini)", excerpt: "5 boyutta hızlı profil", href: "/testler#big-five", meta: "Popüler" },
    { title: "Enneagram (mini)", excerpt: "Motivasyon odağı", href: "/testler#enneagram", meta: "Popüler" },
    { title: "Aşk dili (mini)", excerpt: "İletişim tercihleri", href: "/testler#ask-dili", meta: "Popüler" },
  ];

  const testsNew: HomeCard[] = [
    { title: "Stres tepkisi", excerpt: "Zorlanınca hangi moda giriyorsun?", href: "/testler#stres", meta: "Yeni" },
    { title: "Karar verme stili", excerpt: "Hız mı, güven mi, sezgi mi?", href: "/testler#karar", meta: "Yeni" },
    { title: "Sosyal enerji", excerpt: "Şarj olma şeklin: kalabalık mı yalnızlık mı?", href: "/testler#sosyal", meta: "Yeni" },
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Oneirova",
    url: "https://www.oneirova.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.oneirova.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Oneirova",
    url: "https://www.oneirova.com",
    logo: "https://www.oneirova.com/icons/icon-512.png",
  };

  return (
    <SiteShell mainClassName="pb-24 pt-0">
      <JsonLd data={websiteSchema} />
      <JsonLd data={orgSchema} />

      {/* ─── HERO ─── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div className="grid items-center gap-6 px-4 py-8 sm:gap-8 sm:px-10 sm:py-16 lg:grid-cols-2 lg:gap-10 lg:px-16 lg:py-14 xl:px-24">

          {/* SOL SÜTUN */}
          <div className="flex flex-col">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Güncel İçerikler
            </div>

            <h1
              id="hero-heading"
              className="mt-4 font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Rüyalarını keşfet,
              <br />
              <span className="text-accent">anlamlarını oku.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">
              Rüyalar, astroloji, numeroloji ve kişilik testleri ile içsel yolculuğuna başla.
              Yüzlerce rüya tabiri ve günlük burç yorumları seni bekliyor.
            </p>

            <div className="mt-5 w-full sm:mt-7 sm:max-w-lg">
              <SearchBar variant="hero" />
            </div>
          </div>

          {/* SAĞ SÜTUN */}
          <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 via-surface to-accent2/5 shadow-lg">
              <div className="flex items-center justify-between gap-3 border-b border-accent/20 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent sm:h-8 sm:w-8">
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="font-serif text-base text-foreground sm:text-lg">Rüya Tabirleri</h2>
                    <p className="text-[11px] text-muted sm:text-xs">Haftanın en çok okunanları</p>
                  </div>
                </div>
                <Link
                  href="/ruyalar"
                  className="flex shrink-0 items-center gap-1 rounded-full border border-border/80 bg-surface/50 px-2.5 py-1 text-[11px] font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  Tümü
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="px-4 pt-3 pb-1.5 sm:px-5 sm:pt-4 sm:pb-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Popüler</span>
                </div>
              </div>

              <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                <TitleOnlyList
                  items={dreamPopular.slice(0, 6).map((d) => ({ title: d.title, href: `/ruya/${d.slug}` }))}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      <Container>
        {/* Günün Rüyası */}
        {dailyDream && (
          <section className="mt-10 sm:mt-14 lg:mt-20" aria-labelledby="daily-dream-heading">
            <div className="overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-accent/5 via-surface to-accent2/5 shadow-lg sm:rounded-2xl">
              <div className="flex items-center gap-2.5 border-b border-accent/20 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent sm:h-8 sm:w-8">
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </span>
                <h2 id="daily-dream-heading" className="font-serif text-base text-foreground sm:text-lg">Günün Rüyası</h2>
              </div>
              <Link href={`/ruya/${dailyDream.slug}`} className="group block p-4 transition-colors hover:bg-accent/[0.02] sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                  {dailyDream.coverImageUrl && (
                    <img
                      src={dailyDream.coverImageUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-36 w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-28 sm:w-40 sm:rounded-xl"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-medium text-foreground transition-colors group-hover:text-accent sm:text-xl">
                      {dailyDream.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-3 sm:mt-2">{dailyDream.excerpt}</p>
                    {dailyDream.themes.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3">
                        {dailyDream.themes.slice(0, 4).map((t) => (
                          <span key={t} className="rounded-full bg-surface2 px-2 py-0.5 text-[10px] font-medium text-muted sm:px-2.5 sm:text-[11px]">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <svg className="hidden h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Content Sections */}
        <section className="mt-12 sm:mt-16 lg:mt-24" aria-labelledby="dreams-section">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="overflow-hidden rounded-xl border border-border bg-surface/70 shadow-sm backdrop-blur-sm sm:rounded-2xl">
              <div className="flex items-center justify-between gap-3 border-b border-border p-4 sm:gap-4 sm:p-6">
                <div>
                  <h2 id="dreams-section" className="font-serif text-xl text-foreground sm:text-2xl">Rüya Tabirleri</h2>
                  <p className="mt-0.5 text-xs text-muted sm:mt-1 sm:text-sm">Haftanın en çok okunanları</p>
                </div>
                <Link
                  href="/ruyalar"
                  className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80 sm:text-sm"
                >
                  Tümü
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="p-1">
                <SquareCardGrid
                  items={dreamPopular
                    .slice(0, 6)
                    .map((d) => ({ title: d.title, href: `/ruya/${d.slug}`, imageUrl: d.ogImageUrl || d.coverImageUrl }))}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface/70 p-4 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3 sm:gap-4 sm:pb-4">
                <div>
                  <h2 className="font-serif text-xl text-foreground sm:text-2xl">Astroloji</h2>
                  <p className="mt-0.5 text-xs text-muted sm:mt-1 sm:text-sm">Öne çıkan temler ve yeni akış.</p>
                </div>
                <Link
                  href="/astroloji"
                  className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80 sm:text-sm"
                >
                  Tümü
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                {astroPopular.map((x) => (
                  <ImageCard key={`ap-${x.title}`} tone="astro" item={x} />
                ))}
                {astroNew.map((x) => (
                  <ImageCard key={`an-${x.title}`} tone="astro" item={x} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16 lg:mt-24" aria-labelledby="numerology-section">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-xl border border-border bg-surface/70 p-4 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3 sm:gap-4 sm:pb-4">
                <div>
                  <h2 id="numerology-section" className="font-serif text-xl text-foreground sm:text-2xl">Numeroloji</h2>
                  <p className="mt-0.5 text-xs text-muted sm:mt-1 sm:text-sm">Sayılarla hızlı yön bulma.</p>
                </div>
                <Link
                  href="/numeroloji"
                  className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80 sm:text-sm"
                >
                  Tümü
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                {numeroPopular.map((x) => (
                  <ImageCard key={`np-${x.title}`} tone="numero" item={x} />
                ))}
                {numeroNew.map((x) => (
                  <ImageCard key={`nn-${x.title}`} tone="numero" item={x} />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface/70 p-4 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3 sm:gap-4 sm:pb-4">
                <div>
                  <h2 className="font-serif text-xl text-foreground sm:text-2xl">Testler</h2>
                  <p className="mt-0.5 text-xs text-muted sm:mt-1 sm:text-sm">Kısa, eğlenceli ve paylaşabilir.</p>
                </div>
                <Link
                  href="/testler"
                  className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80 sm:text-sm"
                >
                  Tümü
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                {testsPopular.map((x) => (
                  <ImageCard key={`tp-${x.title}`} tone="tests" item={x} />
                ))}
                {testsNew.map((x) => (
                  <ImageCard key={`tn-${x.title}`} tone="tests" item={x} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </SiteShell>
  );
}