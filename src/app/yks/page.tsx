import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "YKS Rehberi",
  description: "Çalışma planı, ders stratejileri, deneme analizi ve motivasyon: YKS yolculuğunda sade bir rehber.",
  alternates: { canonical: "/yks-rehberi" },
  openGraph: {
    type: "website",
    url: "/yks-rehberi",
    title: "YKS Rehberi",
    description: "Çalışma planı, ders stratejileri, deneme analizi ve motivasyon: YKS yolculuğunda sade bir rehber.",
  },
};

export default function YksGuidePage() {
  const cards = [
    { t: "Çalışma Planı", s: "Haftalık rutin kur, takip et, güncelle.", badge: "Yakında" },
    { t: "Ders Stratejileri", s: "TYT/AYT için kısa taktik kartları.", badge: "Yakında" },
    { t: "Deneme Analizi", s: "Net takibi, yanlış türleri, tekrar döngüsü.", badge: "Yakında" },
    { t: "Kaynak Önerileri", s: "Seviyeye göre sade liste yaklaşımı.", badge: "Yakında" },
    { t: "Motivasyon", s: "Kısa odak cümleleri ve mini hedefler.", badge: "Yakında" },
    { t: "Hedef & Tercih", s: "Hedefi netleştir, yol haritasını ayarla.", badge: "Yakında" },
  ] as const;

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl text-foreground">YKS Rehberi</h1>
              <p className="mt-2 text-sm text-muted">
                Plan, strateji ve analiz. Sade bir sistem kurup sürdürülebilir ilerlemek için.
              </p>
            </div>
            <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
              Ana sayfa
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="text-sm font-medium text-foreground">Hızlı başlangıç</div>
            <div className="mt-2 text-sm leading-6 text-muted">
              Hedef: “bugün 1 küçük adım”. Bu sayfa bir hub; içerikler parça parça açılacak.
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Bugün ne çalışayım?", "Deneme analizi nasıl yapılır?", "Programı nasıl bozmam?"].map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-lg text-foreground">Bölümler</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) => (
                <div
                  key={c.t}
                  className="rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{c.t}</div>
                      <div className="mt-1 text-sm leading-6 text-muted">{c.s}</div>
                    </div>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                      {c.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="text-sm font-medium text-foreground">Önerilen akış</div>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <li>1) Haftalık planı kur</li>
              <li>2) 1 deneme yap → yanlış türlerini etiketle</li>
              <li>3) 24 saat içinde mini tekrar</li>
              <li>4) Haftalık güncelleme</li>
            </ol>
          </section>
        </div>
      </Container>
    </SiteShell>
  );
}