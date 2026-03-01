import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";
import { getLatestDreams, getWeeklyTrendingDreams } from "@/lib/dreams";

export const metadata: Metadata = {
  title: "Oneirova",
  description: "Rüya tabirleri, astroloji, numeroloji ve kişilik testleri: merakını besleyen sade bir keşif alanı.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Oneirova",
    description: "Rüya tabirleri, astroloji, numeroloji ve kişilik testleri: merakını besleyen sade bir keşif alanı.",
  },
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
  const gradient =
    tone === "dreams"
      ? "from-accent/25 via-background to-accent2/15"
      : tone === "astro"
        ? "from-accent2/20 via-background to-accent/15"
        : tone === "numero"
          ? "from-accent/18 via-background to-surface2"
          : "from-accent2/18 via-background to-surface2";

  return (
    <Link
      href={item.href}
      className={[
        "group relative overflow-hidden border border-border bg-surface/80 shadow-sm backdrop-blur-sm",
        "transition-colors hover:border-accent/60 hover:bg-surface2 hover:shadow-md",
      ].join(" ")}
    >
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
      <div className={["absolute inset-0 bg-gradient-to-br", gradient, item.imageUrl ? "opacity-75" : ""].join(" ")} />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="font-serif text-lg font-medium leading-snug text-foreground">{item.title}</div>
            <div className="mt-2 text-sm leading-6 text-muted">{item.excerpt}</div>
          </div>
          {item.meta ? (
            <div className="shrink-0 border border-border bg-background/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
              {item.meta}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function TitleOnlyList({ items }: { items: { title: string; href: string }[] }) {
  if (items.length === 0) {
    return (
      <div className="border border-border bg-surface px-5 py-10 text-center text-sm text-muted">
        Henüz sonuç yok.
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-border bg-surface/80 shadow-sm backdrop-blur-sm">
      <div className="divide-y divide-border">
        {items.map((x) => (
          <Link
            key={x.href}
            href={x.href}
            className="group block px-5 py-3 text-sm font-medium leading-snug text-foreground transition-colors hover:bg-surface2"
          >
            <span className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all group-hover:bg-[length:100%_1px]">
              {x.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SquareCardGrid({ items }: { items: { title: string; href: string; imageUrl?: string | null }[] }) {
  if (items.length === 0) {
    return <div className="border border-border bg-surface px-5 py-10 text-center text-sm text-muted">Henüz sonuç yok.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
      {items.map((x) => (
        <Link
          key={x.href}
          href={x.href}
          className={[
            "group relative block overflow-hidden bg-surface",
            "transition-colors hover:bg-surface2",
          ].join(" ")}
        >
          <div className="relative aspect-square">
            {x.imageUrl ? (
              <img
                src={x.imageUrl}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="line-clamp-2 text-sm font-medium leading-snug text-white/90 group-hover:text-white">
                {x.title}
              </div>
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
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <section>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="text-balance font-serif text-5xl leading-[0.95] tracking-tight text-foreground sm:text-7xl">
                Bugünün en çok okunanları ve yenileri.
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                Rüyalar, astroloji, numeroloji ve testler için güncel bir akış: popüler başlıkları yakala, yeni içeriklere
                hızlıca geç.
              </p>

              <div className="mt-10">
                <SearchBar variant="hero" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-border bg-surface/80 p-6 shadow-sm backdrop-blur-sm">
                <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
                  <div>
                    <div className="font-serif text-lg text-foreground">Rüyalar</div>
                    <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted">Popüler · Yeni</div>
                  </div>
                  <Link href="/ruyalar" className="text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:text-foreground">
                    Tümü
                  </Link>
                </div>
                <div className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="min-w-0">
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted">Popüler</div>
                      <TitleOnlyList items={dreamPopular.slice(0, 4).map((d) => ({ title: d.title, href: `/ruya/${d.slug}` }))} />
                    </div>
                    <div className="min-w-0">
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted">Yeni</div>
                      <TitleOnlyList items={dreamNew.slice(0, 4).map((d) => ({ title: d.title, href: `/ruya/${d.slug}` }))} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="border border-border bg-surface/70 p-0 shadow-sm backdrop-blur-sm">
              <div className="flex items-end justify-between gap-6 border-b border-border p-6">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Rüya Tabirleri</h2>
                  <p className="mt-1 text-sm text-muted">Haftanın en çok okunanları</p>
                </div>
                <Link href="/ruyalar" className="text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:text-foreground">
                  Tümü
                </Link>
              </div>
              <div className="">
                <SquareCardGrid
                  items={dreamPopular
                    .slice(0, 6)
                    .map((d) => ({ title: d.title, href: `/ruya/${d.slug}`, imageUrl: d.ogImageUrl || d.coverImageUrl }))}
                />
              </div>
            </div>

            <div className="border border-border bg-surface/70 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Astroloji</h2>
                  <p className="mt-1 text-sm text-muted">Öne çıkan temalar ve yeni akış.</p>
                </div>
                <Link href="/astroloji" className="text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:text-foreground">
                  Tümü
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

        <section className="mt-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="border border-border bg-surface/70 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Numeroloji</h2>
                  <p className="mt-1 text-sm text-muted">Sayılarla hızlı yön bulma.</p>
                </div>
                <Link href="/numeroloji" className="text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:text-foreground">
                  Tümü
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

            <div className="border border-border bg-surface/70 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Testler</h2>
                  <p className="mt-1 text-sm text-muted">Kısa, eğlenceli ve paylaşılabilir.</p>
                </div>
                <Link href="/testler" className="text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:text-foreground">
                  Tümü
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
