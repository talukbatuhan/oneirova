import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AstrologyScroll } from "./AstrologyScroll";

export const metadata: Metadata = {
  title: "Astroloji - Burc Yorumlari",
  description: "12 burcun gunluk, haftalik ve aylik yorumlari. Burc ozelliklerini kesfet, uyumluluklari ogren.",
  alternates: { canonical: "/astroloji" },
  openGraph: {
    type: "website",
    url: "/astroloji",
    title: "Astroloji - Burc Yorumlari",
    description: "12 burcun gunluk, haftalik ve aylik yorumlari. Burc ozelliklerini kesfet, uyumluluklari ogren.",
  },
  keywords: ["burc yorumlari", "gunluk burc", "haftalik burc", "astroloji", "zodyak", "burc uyumu"],
};

type SP = { [key: string]: string | string[] | undefined };

const SIGNS = [
  { key: "koc", label: "Koc", dates: "21 Mar - 19 Nis", element: "Ates", vibe: "Baslatir, hizlanir, cesaret eder.", keywords: ["Cesaret", "Baslangic", "Durtu"] },
  { key: "boga", label: "Boga", dates: "20 Nis - 20 May", element: "Toprak", vibe: "Surdurur, somutlastirir, guven kurar.", keywords: ["Guven", "Deger", "Ritim"] },
  { key: "ikizler", label: "Ikizler", dates: "21 May - 20 Haz", element: "Hava", vibe: "Merak eder, bag kurar, anlatir.", keywords: ["Merak", "Iletisim", "Hareket"] },
  { key: "yengec", label: "Yengec", dates: "21 Haz - 22 Tem", element: "Su", vibe: "Korur, hisseder, yuva kurar.", keywords: ["Duygu", "Aidiyet", "Bakim"] },
  { key: "aslan", label: "Aslan", dates: "23 Tem - 22 Agu", element: "Ates", vibe: "Parlar, sahne alir, yaratir.", keywords: ["Ozguven", "Yaraticilik", "Oyun"] },
  { key: "basak", label: "Basak", dates: "23 Agu - 22 Eyl", element: "Toprak", vibe: "Iyilestirir, duzenler, netlestirir.", keywords: ["Duzen", "Hizmet", "Detay"] },
  { key: "terazi", label: "Terazi", dates: "23 Eyl - 22 Eki", element: "Hava", vibe: "Dengelendirir, uzlastirir, estetik kurar.", keywords: ["Denge", "Iliski", "Zarafet"] },
  { key: "akrep", label: "Akrep", dates: "23 Eki - 21 Kas", element: "Su", vibe: "Derine iner, donusturur, gercegi arar.", keywords: ["Donusum", "Tutku", "Derinlik"] },
  { key: "yay", label: "Yay", dates: "22 Kas - 21 Ara", element: "Ates", vibe: "Genisler, kesfeder, anlam arar.", keywords: ["Kesif", "Anlam", "Ozgurluk"] },
  { key: "oglak", label: "Oglak", dates: "22 Ara - 19 Oca", element: "Toprak", vibe: "Kurulur, planlar, sonuc alir.", keywords: ["Disiplin", "Hedef", "Sorumluluk"] },
  { key: "kova", label: "Kova", dates: "20 Oca - 18 Sub", element: "Hava", vibe: "Farkli dusunur, yeniler, bag kurar.", keywords: ["Yenilik", "Topluluk", "Ozgunluk"] },
  { key: "balik", label: "Balik", dates: "19 Sub - 20 Mar", element: "Su", vibe: "Sezer, akar, sefkatle kapsar.", keywords: ["Sezgi", "Hayal", "Sefkat"] },
] as const;

const ELEMENT_COLORS = {
  Ates: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
  Toprak: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20" },
  Hava: { bg: "bg-sky-500/10", text: "text-sky-500", border: "border-sky-500/20" },
  Su: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
} as const;

export default async function AstrologyPage({ searchParams }: { searchParams?: Promise<SP> }) {
  const sp = (await searchParams) ?? {};
  const signKey = typeof sp.burc === "string" ? sp.burc : "";
  const selected = SIGNS.find((s) => s.key === signKey) ?? null;

  return (
    <SiteShell mainClassName="pb-24 pt-8 sm:pt-12">
      <Suspense fallback={null}>
        <AstrologyScroll />
      </Suspense>
      <Container>
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Astroloji", href: "/astroloji" },
              ...(selected ? [{ label: selected.label }] : []),
            ]}
          />

          {/* Header */}
          <header className="text-center">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Burc Yorumlari
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted">
              12 burcun ozelliklerini kesfet, gunluk yorumlarini oku. Burcunu sec ve yildizlarin sana ne soyledigini ogren.
            </p>
          </header>

          {/* Signs Grid */}
          <section className="mt-10" aria-labelledby="signs-heading">
            <h2 id="signs-heading" className="sr-only">Burclar</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {SIGNS.map((sign) => {
                const isActive = selected?.key === sign.key;
                const colors = ELEMENT_COLORS[sign.element];
                
                return (
                  <Link
                    key={sign.key}
                    href={`/astroloji?burc=${encodeURIComponent(sign.key)}`}
                    className={`group relative flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-300 ${
                      isActive 
                        ? `${colors.bg} ${colors.border} shadow-lg` 
                        : "border-border bg-surface hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                      <img
                        src={`/astro-icons/${sign.key}.png`}
                        alt=""
                        className={`h-full w-full object-contain transition-transform duration-500 ${
                          isActive ? "" : "group-hover:scale-110"
                        }`}
                        loading="lazy"
                      />
                    </div>
                    <div className="text-center">
                      <span className={`block text-sm font-medium ${isActive ? colors.text : "text-foreground"}`}>
                        {sign.label}
                      </span>
                      <span className="block text-[10px] text-muted">{sign.dates}</span>
                    </div>
                    {isActive && (
                      <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${colors.bg.replace('/10', '')} ring-2 ring-background`} />
                    )}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Selected Sign Details */}
          {selected ? (
            <section id="astro-result" className="mt-12 scroll-mt-24" aria-labelledby="result-heading">
              {/* Tabs */}
              <div className="flex items-center justify-center gap-2 rounded-xl bg-surface2/50 p-1.5">
                {["Gunluk", "Haftalik", "Aylik"].map((tab, idx) => (
                  <button
                    key={tab}
                    className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                      idx === 0
                        ? "bg-surface text-foreground shadow-sm"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Sign Card */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
                {/* Header */}
                <div className={`${ELEMENT_COLORS[selected.element].bg} border-b border-border px-6 py-8 text-center`}>
                  <div className="mx-auto mb-4 h-24 w-24">
                    <img
                      src={`/astro-icons/${selected.key}.png`}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h2 id="result-heading" className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
                    {selected.label}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{selected.dates}</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${ELEMENT_COLORS[selected.element].bg} ${ELEMENT_COLORS[selected.element].text}`}>
                      {selected.element} Grubu
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-center">
                    <h3 className="font-serif text-lg text-foreground">Gunluk Yorum</h3>
                    <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
                      {selected.vibe} Bugun yildizlar sizin icin ne soyluyor? Energinizi dogru yonlendirmek icin harika bir gun.
                      Kendinize guvenin ve firsat kapilarinizin acilmasina izin verin.
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="mt-8">
                    <h4 className="text-center text-xs font-semibold uppercase tracking-wider text-muted">Anahtar Kelimeler</h4>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {selected.keywords.map((kw) => (
                        <span 
                          key={kw} 
                          className={`rounded-full px-3 py-1.5 text-sm ${ELEMENT_COLORS[selected.element].bg} ${ELEMENT_COLORS[selected.element].text}`}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="mt-16 rounded-2xl border border-dashed border-border bg-surface2/30 px-6 py-16 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 p-4">
                <svg className="h-full w-full text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-lg text-foreground">Burcunu Sec</h3>
              <p className="mt-2 text-sm text-muted">
                Gunluk yorumlarini gormek icin yukaridaki burclardan birini sec.
              </p>
            </div>
          )}
          {/* Cross-link keşif */}
          <section className="mt-16 rounded-2xl border border-border bg-surface px-6 py-6">
            <div className="text-sm font-medium text-foreground">Burçtan öteye</div>
            <p className="mt-1 text-xs text-muted">Astrolojiden ilham aldın mı? Rüyalarınla da bağlantı kur.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/ruyalar" className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Rüya tabirleri
              </Link>
              <Link href="/search?q=yıldız" className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Yıldız rüyaları
              </Link>
              <Link href="/numeroloji" className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Numeroloji
              </Link>
              <Link href="/testler" className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Kişilik testleri
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </SiteShell>
  );
}
