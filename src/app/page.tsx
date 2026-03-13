import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";
import { getLatestDreams, getWeeklyTrendingDreams } from "@/lib/dreams";

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
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{item.excerpt}</p>
          </div>
          {item.meta ? (
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
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
        Henuz sonuc yok.
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
                className="group flex items-center gap-3 px-4 py-3 text-sm font-medium leading-snug text-foreground transition-colors hover:bg-surface2"
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
    return <div className="rounded-lg border border-border bg-surface px-5 py-10 text-center text-sm text-muted">Henuz sonuc yok.</div>;
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
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="line-clamp-2 text-sm font-medium leading-snug text-white transition-colors group-hover:text-white">
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
  const dreamPopular = await getWeeklyTrendingDreams(6);
  const dreamNew = await getLatestDreams(6);

  const astroPopular: HomeCard[] = [
    {
      title: "Burç temaları",
      excerpt: "12 burcun motivasyonları ve gölge tarafı üzerine kısa okuma.",
      href: "/astroloji",
      meta: "Popüler",
    },
    {
      title: "Uyumluluk",
      excerpt: "İlişkilerde iletişim dili ve ihtiyaçlar: pratik yaklaşım.",
      href: "/astroloji",
      meta: "Popüler",
    },
    {
      title: "Günün gökyüzü",
      excerpt: "Bugün tempo, ilişki ve iş odağı için yumuşak yönlendirme.",
      href: "/astroloji",
      meta: "Popüler",
    },
  ];

  const astroNew: HomeCard[] = [
    {
      title: "Haftalık odak",
      excerpt: "Bir haftalık niyet ve aksiyon cümlesiyle sade plan.",
      href: "/astroloji",
      meta: "Yeni",
    },
    {
      title: "Transit notları",
      excerpt: "Kısa: tetiklenen tema, fırsat, dikkat noktası.",
      href: "/astroloji",
      meta: "Yeni",
    },
    {
      title: "Ay döngüsü",
      excerpt: "Başlat · büyüt · bırak ritmiyle içgörü kartları.",
      href: "/astroloji",
      meta: "Yeni",
    },
  ];

  const numeroPopular: HomeCard[] = [
    {
      title: "Hayat yolu sayısı",
      excerpt: "Doğum tarihinden temel eğilimi çıkar: kısa özet.",
      href: "/numeroloji",
      meta: "Popüler",
    },
    {
      title: "Gün sayısı",
      excerpt: "Bugünün enerjisi için hızlı bir odak cümlesi.",
      href: "/numeroloji",
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
    { title: "Big Five (mini)", excerpt: "5 boyutta hızlı profil", href: "/testler", meta: "Popüler" },
    { title: "Enneagram (mini)", excerpt: "Motivasyon odağı", href: "/testler", meta: "Popüler" },
    { title: "Aşk dili (mini)", excerpt: "İletişim tercihleri", href: "/testler", meta: "Popüler" },
  ];

  const testsNew: HomeCard[] = [
    { title: "Stres tepkisi", excerpt: "Zorlanınca hangi moda giriyorsun?", href: "/testler", meta: "Yeni" },
    { title: "Odak stili", excerpt: "Kısa dikkat mi derin çalışma mı?", href: "/testler", meta: "Yeni" },
    { title: "Sosyal enerji", excerpt: "Şarj olma şeklin: kalabalık mı yalnızlık mı?", href: "/testler", meta: "Yeni" },
  ];

  return (
    <SiteShell mainClassName="pb-24 pt-8 sm:pt-12">
      <Container>
        {/* Hero Section */}
        <section aria-labelledby="hero-heading">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                </span>
                Guncel icerikler
              </div>
              <h1 id="hero-heading" className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Ruyalarini kesfet,
                <br />
                <span className="text-accent">anlamlarini oku.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Ruyalar, astroloji, numeroloji ve kisilik testleri ile icsel yolculuguna basla. 
                Binlerce ruya tabiri ve gunluk burc yorumlari seni bekliyor.
              </p>

              <div className="mt-8">
                <SearchBar variant="hero" />
              </div>

              {/* Quick Links */}
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="text-sm text-muted">Populer aramalar:</span>
                {["yilan", "dis", "su", "ucmak"].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${term}`}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <h2 className="font-serif text-xl text-foreground">Ruya Tabirleri</h2>
                    <p className="mt-1 text-xs text-muted">Haftanin en cok okunanlari</p>
                  </div>
                  <Link 
                    href="/ruyalar" 
                    className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    Tumu
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="min-w-0">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Populer</span>
                      </div>
                      <TitleOnlyList items={dreamPopular.slice(0, 4).map((d) => ({ title: d.title, href: `/ruya/${d.slug}` }))} />
                    </div>
                    <div className="min-w-0">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent2"></span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Yeni</span>
                      </div>
                      <TitleOnlyList items={dreamNew.slice(0, 4).map((d) => ({ title: d.title, href: `/ruya/${d.slug}` }))} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="mt-16 sm:mt-24" aria-labelledby="dreams-section">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/70 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 border-b border-border p-6">
                <div>
                  <h2 id="dreams-section" className="font-serif text-2xl text-foreground">Ruya Tabirleri</h2>
                  <p className="mt-1 text-sm text-muted">Haftanin en cok okunanlari</p>
                </div>
                <Link 
                  href="/ruyalar" 
                  className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  Tumu
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

            <div className="rounded-2xl border border-border bg-surface/70 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Astroloji</h2>
                  <p className="mt-1 text-sm text-muted">One cikan temalar ve yeni akis.</p>
                </div>
                <Link 
                  href="/astroloji" 
                  className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  Tumu
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

        <section className="mt-16 sm:mt-24" aria-labelledby="numerology-section">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-2xl border border-border bg-surface/70 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 id="numerology-section" className="font-serif text-2xl text-foreground">Numeroloji</h2>
                  <p className="mt-1 text-sm text-muted">Sayilarla hizli yon bulma.</p>
                </div>
                <Link 
                  href="/numeroloji" 
                  className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  Tumu
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {numeroPopular.map((x) => (
                  <ImageCard key={`np-${x.title}`} tone="numero" item={x} />
                ))}
                {numeroNew.map((x) => (
                  <ImageCard key={`nn-${x.title}`} tone="numero" item={x} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/70 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Testler</h2>
                  <p className="mt-1 text-sm text-muted">Kisa, eglenceli ve paylasabilir.</p>
                </div>
                <Link 
                  href="/testler" 
                  className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  Tumu
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
