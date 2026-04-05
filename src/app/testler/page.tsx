import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuizSection } from "./QuizSection";

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

const UPCOMING_TESTS = [
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

          <header className="text-center">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Kisilik Testleri
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted">
              Hizli, keyifli, paylasabilir. Kendini kesfetmek icin tasarlanmis mini testler.
            </p>
          </header>

          <QuizSection />

          <section className="mt-14" aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="section-heading">Yakinda</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {UPCOMING_TESTS.map((test) => (
                <article
                  key={test.title}
                  className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm"
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
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-surface px-6 py-6">
            <div className="text-sm font-medium text-foreground">Testten sonra</div>
            <p className="mt-1 text-xs text-muted">Kendini tanidin; simdi ruyalarinla da baglanti kur.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/ruyalar" className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Ruya tabirleri
              </Link>
              <Link href="/search?q=kaygi" className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Kaygi ruyalari
              </Link>
              <Link href="/astroloji" className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Astroloji
              </Link>
              <Link href="/numeroloji" className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Numeroloji
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </SiteShell>
  );
}
