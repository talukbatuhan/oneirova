import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kisilik Testleri - Kendini Kesfet",
  description: "Big Five, Enneagram, Ask Dili ve daha fazlasi. Kisa, eglenceli ve paylasabilir kisilik testleri ile kendini kesfet.",
  alternates: { canonical: "/testler" },
  openGraph: {
    type: "website",
    url: "/testler",
    title: "Kisilik Testleri - Kendini Kesfet",
    description: "Big Five, Enneagram, Ask Dili ve daha fazlasi. Kisa, eglenceli ve paylasabilir kisilik testleri.",
  },
  keywords: ["kisilik testi", "big five", "enneagram", "ask dili testi", "kisilik analizi", "psikolojik test"],
};

const TESTS = [
  {
    title: "Big Five (mini)",
    description: "5 boyutta hizli profil.",
    features: ["Sure: 2-4 dk", "Sonuc: ozet + guclu yonler + dikkat noktalari", "Paylasim: kart gorseli"],
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Enneagram (mini)",
    description: "Motivasyon odagi ve tetikleyiciler.",
    features: ["Sure: 3-5 dk", "Sonuc: tip egilimi + pratik oneriler", "Derin okuma sayfalari"],
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    title: "Ask Dili (mini)",
    description: "Iletisim tercihleri.",
    features: ["Sure: 2-3 dk", "Sonuc: iliski ipuclari", "Esle paylas: mini oneriler"],
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "Stres Haritasi",
    description: "Stres altinda nasil calisiyorsun?",
    features: ["Sure: 2-4 dk", "Sonuc: tetik + rahatlaci rutin", "Mini aksiyon plani"],
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Karar Verme Stili",
    description: "Hiz mi, guven mi, sezgi mi?",
    features: ["Sure: 2-4 dk", "Sonuc: karar protokolu", "Kisisel ipuclari"],
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    title: "Sosyal Enerji",
    description: "Sarj olma ve tukenme kaynaklarin.",
    features: ["Sure: 2-4 dk", "Sonuc: enerji butcesi", "Haftalik denge onerisi"],
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

export default function TestsPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-8 sm:pt-12">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Testler" },
            ]}
          />

          {/* Header */}
          <header className="text-center">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Kisilik Testleri
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted">
              Hizli, keyifli, paylasabilir. Kendini kesfetmek icin tasarlanmis mini testler.
            </p>
          </header>

          {/* Tests Grid */}
          <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-labelledby="tests-heading">
            <h2 id="tests-heading" className="sr-only">Mevcut testler</h2>
            {TESTS.map((test) => (
              <article
                key={test.title}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={test.icon} />
                  </svg>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-foreground">{test.title}</h3>
                    <p className="mt-1 text-sm text-muted">{test.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent2/10 px-2.5 py-1 text-[10px] font-medium text-accent2">
                    Yakinda
                  </span>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-muted">
                  {test.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          {/* Info Card */}
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface2/30 p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 p-3">
              <svg className="h-full w-full text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-lg text-foreground">Hedef Deneyim</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Testler "sonsuz kaydirma" yerine kisa akis: 1 soru, 1 secim, aninda feedback. 
              Sonunda tek ekranda sonuc karti ve bir sonraki oneri linkleri.
            </p>
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
