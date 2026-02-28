import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Kişilik Testleri",
  description: "Kısa, eğlenceli ve paylaşılabilir kişilik testleri. Mini sonuç kartları yakında.",
  alternates: { canonical: "/testler" },
  openGraph: {
    type: "website",
    url: "/testler",
    title: "Kişilik Testleri",
    description: "Kısa, eğlenceli ve paylaşılabilir kişilik testleri. Mini sonuç kartları yakında.",
  },
};

export default function TestsPage() {
  const tests = [
    {
      t: "Big Five (mini)",
      s: "5 boyutta hızlı profil.",
      body: ["Süre: 2–4 dk", "Sonuç: özet + güçlü yönler + dikkat noktaları", "Paylaşım: kart görseli (yakında)"],
    },
    {
      t: "Enneagram (mini)",
      s: "Motivasyon odağı ve tetikleyiciler.",
      body: ["Süre: 3–5 dk", "Sonuç: tip eğilimi + pratik öneriler", "Derin okuma sayfaları (yakında)"],
    },
    {
      t: "Aşk dili (mini)",
      s: "İletişim tercihleri.",
      body: ["Süre: 2–3 dk", "Sonuç: ilişki ipuçları", "Eşle paylaş: mini öneriler (yakında)"],
    },
    {
      t: "Stres haritası",
      s: "Stres altında nasıl çalışıyorsun?",
      body: ["Süre: 2–4 dk", "Sonuç: tetik + rahatlatıcı rutin", "Mini aksiyon planı (yakında)"],
    },
    {
      t: "Karar verme stili",
      s: "Hız mı, güven mi, sezgi mi?",
      body: ["Süre: 2–4 dk", "Sonuç: karar protokolü", "Kişisel ipuçları (yakında)"],
    },
    {
      t: "Sosyal enerji",
      s: "Şarj olma ve tükenme kaynakların.",
      body: ["Süre: 2–4 dk", "Sonuç: enerji bütçesi", "Haftalık denge önerisi (yakında)"],
    },
  ];

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl text-foreground">Kişilik Testleri</h1>
              <p className="mt-2 text-sm text-muted">
                Hızlı, keyifli, paylaşılabilir. Tam test akışları sırayla açılacak.
              </p>
            </div>
            <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
              Ana sayfa
            </Link>
          </div>

          <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((x) => (
              <details
                key={x.t}
                className="rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm open:border-accent/60"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{x.t}</div>
                      <div className="mt-1 text-sm leading-6 text-muted">{x.s}</div>
                    </div>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">Yakında</span>
                  </div>
                </summary>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                  {x.body.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </details>
            ))}
          </section>

          <div className="mt-10 rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="text-sm font-medium text-foreground">Hedef deneyim</div>
            <div className="mt-2 text-sm leading-6 text-muted">
              Testler “sonsuz kaydırma” yerine kısa akış: 1 soru → 1 seçim → micro-feedback. Sonunda tek ekranda sonuç kartı ve
              “bir sonraki öneri” linkleri.
            </div>
          </div>


        </div>
      </Container>
    </SiteShell>
  );
}