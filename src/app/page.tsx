import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";

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

export default function Home() {
  return (
    <SiteShell>
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <h1 className="text-balance text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Merakla başla, kendini keşfet.
          </h1>
          <p className="mt-4 text-pretty text-base leading-7 text-muted sm:text-[17px] sm:leading-8">
            Oneirova; rüyalar, astroloji, numeroloji ve kişilik testlerini tek bir akışta buluşturan modern bir keşif alanı.
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

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-lg text-foreground">Keşif alanları</h2>
              <p className="mt-2 text-sm text-muted">
                Bir yerden başla; diğerleri seni çağıracak.
              </p>
            </div>
            <div className="text-xs text-muted">Önizleme + tam sayfa deneyimi.</div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/ruyalar"
              className={[
                "group rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm",
                "transition-colors hover:border-accent/60 hover:bg-surface2",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Rüyalar</div>
                  <div className="mt-1 text-sm leading-6 text-muted">Sembol, duygu ve senaryo araması.</div>
                </div>
                <span className="rounded-full border border-accent/40 bg-surface2 px-3 py-1 text-xs text-foreground">
                  Şimdi
                </span>
              </div>
            </Link>

            <Link
              href="/astroloji"
              className={[
                "group rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm",
                "transition-colors hover:border-accent/60 hover:bg-surface2",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Astroloji</div>
                  <div className="mt-1 text-sm leading-6 text-muted">Burçlar, temalar, günlük ipuçları.</div>
                </div>
                <span className="rounded-full border border-accent/40 bg-surface2 px-3 py-1 text-xs text-foreground">
                  Keşfet
                </span>
              </div>
            </Link>

            <Link
              href="/numeroloji"
              className={[
                "group rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm",
                "transition-colors hover:border-accent/60 hover:bg-surface2",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Numeroloji</div>
                  <div className="mt-1 text-sm leading-6 text-muted">Sayıların diliyle küçük yön bulma.</div>
                </div>
                <span className="rounded-full border border-accent/40 bg-surface2 px-3 py-1 text-xs text-foreground">
                  Keşfet
                </span>
              </div>
            </Link>

            <Link
              href="/testler"
              className={[
                "group rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm",
                "transition-colors hover:border-accent/60 hover:bg-surface2",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Kişilik Testleri</div>
                  <div className="mt-1 text-sm leading-6 text-muted">Kısa, eğlenceli ve paylaşılabilir.</div>
                </div>
                <span className="rounded-full border border-accent/40 bg-surface2 px-3 py-1 text-xs text-foreground">
                  Keşfet
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section id="astroloji" className="mt-14 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-lg text-foreground">Astroloji</h2>
              <p className="mt-2 text-sm text-muted">Önizleme: burçlar ve temalarla hızlı bir giriş.</p>
            </div>
            <Link
              href="/astroloji"
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
            >
              Astrolojiye git
            </Link>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {[
              {
                t: "Burç temaları",
                s: "12 burcun motivasyonları ve gölge tarafı.",
                b: "Kısa özetler, örnek senaryolar, soru kartları.",
              },
              {
                t: "Günün gökyüzü",
                s: "Bugün neyi kolaylaştırır, neyi zorlar?",
                b: "Yumuşak yönlendirme: tempo, ilişki, iş odağı.",
              },
              {
                t: "Uyumluluk",
                s: "İlişki dinamikleri için pratik okuma.",
                b: "Sadece etiket değil: iletişim dili ve ihtiyaçlar.",
              },
            ].map((c) => (
              <details
                key={c.t}
                className="rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm open:border-accent/60"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{c.t}</div>
                      <div className="mt-1 text-sm leading-6 text-muted">{c.s}</div>
                    </div>
                    <div className="text-xs text-muted">Aç</div>
                  </div>
                </summary>
                <div className="mt-4 text-sm leading-6 text-muted">{c.b}</div>
              </details>
            ))}
          </div>
        </section>

        <section id="numeroloji" className="mt-14 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-lg text-foreground">Numeroloji</h2>
              <p className="mt-2 text-sm text-muted">Önizleme: 1 dakikada temel sayını bul.</p>
            </div>
            <Link
              href="/numeroloji"
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
            >
              Numerolojiye git
            </Link>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
              <div className="text-sm font-medium text-foreground">Hayat yolu</div>
              <p className="mt-2 text-sm leading-6 text-muted">
                Doğum tarihinin tüm rakamlarını topla, tek haneye indir.
              </p>
              <p className="mt-3 text-xs text-muted">
                Örnek: <span className="text-foreground">28.02.2026</span> → 2+8+0+2+2+0+2+6 = 22 → 2+2 = 4
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
              <div className="text-sm font-medium text-foreground">Gün sayısı</div>
              <p className="mt-2 text-sm leading-6 text-muted">Bugünün enerjisini kısa bir odak cümlesiyle yakala.</p>
              <p className="mt-3 text-xs text-muted">Rutin: niyet · eylem · bırakma.</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
              <div className="text-sm font-medium text-foreground">İsim analizi</div>
              <p className="mt-2 text-sm leading-6 text-muted">İsim ve soyadından karakter temalarını çıkar.</p>
              <p className="mt-3 text-xs text-muted">Özet + güçlü yönler + dikkat noktaları.</p>
            </div>
          </div>
        </section>

        <section id="testler" className="mt-14 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-lg text-foreground">Kişilik Testleri</h2>
              <p className="mt-2 text-sm text-muted">Önizleme: kısa ve paylaşılabilir test akışları.</p>
            </div>
            <Link
              href="/testler"
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
            >
              Testlere git
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Big Five (mini)", s: "5 boyutta hızlı profil" },
              { t: "Enneagram (mini)", s: "motivasyon odağı" },
              { t: "Aşk dili (mini)", s: "iletişim tercihleri" },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{c.t}</div>
                    <div className="mt-1 text-sm leading-6 text-muted">{c.s}</div>
                  </div>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">Yakında</span>
                </div>
                <div className="mt-3 text-xs text-muted">Süre: 2–4 dk · Sonuç: kart + paylaşım</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-lg text-foreground">Rüya Tabirleri</h2>
              <p className="mt-2 text-sm text-muted">A–Z dizin, popüler yorumlar ve en yeni içerikler.</p>
            </div>
            <Link
              href="/ruyalar"
              className={[
                "inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted",
                "transition-colors hover:border-accent/60 hover:text-foreground",
              ].join(" ")}
            >
              Rüya sayfasına git
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/ruyalar#az"
              className={[
                "rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm",
                "transition-colors hover:border-accent/60 hover:bg-surface2",
              ].join(" ")}
            >
              <div className="text-sm font-medium text-foreground">A–Z gözat</div>
              <div className="mt-1 text-sm leading-6 text-muted">Tüm rüya tabirlerini harflere göre keşfet.</div>
            </Link>
            <Link
              href="/ruyalar#populer"
              className={[
                "rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm",
                "transition-colors hover:border-accent/60 hover:bg-surface2",
              ].join(" ")}
            >
              <div className="text-sm font-medium text-foreground">Popüler</div>
              <div className="mt-1 text-sm leading-6 text-muted">En çok okunan rüya yorumları.</div>
            </Link>
            <Link
              href="/ruyalar#en-yeni"
              className={[
                "rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm",
                "transition-colors hover:border-accent/60 hover:bg-surface2",
              ].join(" ")}
            >
              <div className="text-sm font-medium text-foreground">En yeni</div>
              <div className="mt-1 text-sm leading-6 text-muted">Yeni eklenen tabirleri hızlıca gör.</div>
            </Link>
          </div>
        </section>
      </Container>
    </SiteShell>
  );
}