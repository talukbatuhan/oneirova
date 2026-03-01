import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Astroloji",
  description: "Burç temaları ve kısa keşif kartlarıyla astrolojiye sade bir giriş.",
  alternates: { canonical: "/astroloji" },
  openGraph: {
    type: "website",
    url: "/astroloji",
    title: "Astroloji",
    description: "Burç temaları ve kısa keşif kartlarıyla astrolojiye sade bir giriş.",
  },
};

type SP = { [key: string]: string | string[] | undefined };

const SIGNS: Array<{
  key: string;
  label: string;
  vibe: string;
  keywords: string[];
  questions: string[];
}> = [
  { key: "koc", label: "Koç", vibe: "Başlatır, hızlanır, cesaret eder.", keywords: ["Cesaret", "Başlangıç", "Dürtü"], questions: ["Neyi ertelemeyi bırakmalısın?", "Bugün tek bir adım ne olurdu?"] },
  { key: "boga", label: "Boğa", vibe: "Sürdürür, somutlaştırır, güven kurar.", keywords: ["Güven", "Değer", "Ritim"], questions: ["Neyi sadeleştirirsen güçlenirsin?", "Hangi alışkanlık seni destekler?"] },
  { key: "ikizler", label: "İkizler", vibe: "Merak eder, bağ kurar, anlatır.", keywords: ["Merak", "İletişim", "Hareket"], questions: ["Bugün hangi soruyu sormalısın?", "Hangi bilgiyi paylaşmak rahatlatır?"] },
  { key: "yengec", label: "Yengeç", vibe: "Korur, hisseder, yuva kurar.", keywords: ["Duygu", "Aidiyet", "Bakım"], questions: ["Nerede daha güvende olmalısın?", "Kime/ney’e şefkat gösterebilirsin?"] },
  { key: "aslan", label: "Aslan", vibe: "Parlar, sahne alır, yaratır.", keywords: ["Özgüven", "Yaratıcılık", "Oyun"], questions: ["Neyi sahiplenip görünür kılmalısın?", "Hangi şey seni canlı hissettiriyor?"] },
  { key: "basak", label: "Başak", vibe: "İyileştirir, düzenler, netleştirir.", keywords: ["Düzen", "Hizmet", "Detay"], questions: ["Nerede ‘yeterince iyi’ demelisin?", "Hangi küçük düzen büyük rahatlık getirir?"] },
  { key: "terazi", label: "Terazi", vibe: "Dengelendirir, uzlaştırır, estetik kurar.", keywords: ["Denge", "İlişki", "Zarafet"], questions: ["Hangi sınır denge getirir?", "İlişkide neyin adı konmalı?"] },
  { key: "akrep", label: "Akrep", vibe: "Derine iner, dönüştürür, gerçeği arar.", keywords: ["Dönüşüm", "Tutku", "Derinlik"], questions: ["Neyi bırakınca özgürleşirsin?", "Hangi gerçeğe yaklaşmalısın?"] },
  { key: "yay", label: "Yay", vibe: "Genişler, keşfeder, anlam arar.", keywords: ["Keşif", "Anlam", "Özgürlük"], questions: ["Ufku ne genişletir?", "Hangi deneyim seni büyütür?"] },
  { key: "oglak", label: "Oğlak", vibe: "Kurulur, planlar, sonuç alır.", keywords: ["Disiplin", "Hedef", "Sorumluluk"], questions: ["Bugün hangi yapı işe yarar?", "En gerçekçi bir sonraki adım ne?"] },
  { key: "kova", label: "Kova", vibe: "Farklı düşünür, yeniler, bağ kurar.", keywords: ["Yenilik", "Topluluk", "Özgünlük"], questions: ["Hangi fikri denemelisin?", "Nerede ‘farklı’ olmak güç?"] },
  { key: "balik", label: "Balık", vibe: "Sezer, akar, şefkatle kapsar.", keywords: ["Sezgi", "Hayal", "Şefkat"], questions: ["Hangi duygu mesaj taşıyor?", "Nerede akışa izin verebilirsin?"] },
];

import { AstrologyScroll } from "./AstrologyScroll";
import { Suspense } from "react";

export default async function AstrologyPage({ searchParams }: { searchParams?: Promise<SP> }) {
  const sp = (await searchParams) ?? {};
  const signKey = typeof sp.burc === "string" ? sp.burc : "";
  const selected = SIGNS.find((s) => s.key === signKey) ?? null;

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Suspense fallback={null}>
        <AstrologyScroll />
      </Suspense>
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl text-foreground">Astroloji</h1>
              <p className="mt-2 text-sm text-muted">Burç temalarıyla hızlı bir giriş. Bir burç seç, kartlarını oku.</p>
            </div>
            <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
              Ana sayfa
            </Link>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-4 gap-2">
              {SIGNS.map((s) => {
                const active = selected?.key === s.key;
                return (
                  <Link
                    key={s.key}
                    href={`/astroloji?burc=${encodeURIComponent(s.key)}`}
                    className={[
                      "group flex flex-col items-center justify-center gap-1 p-2 text-center text-sm font-medium uppercase tracking-wider transition-all",
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    ].join(" ")}
                  >
                    <img
                      src={`/astro-icons/${s.key}.png`}
                      alt=""
                      className="h-36 w-36 object-contain transition-transform duration-500 group-hover:scale-x-[-1]"
                      loading="lazy"
                    />
                    {s.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {selected ? (
            <div id="astro-result" className="mt-10 scroll-mt-24">
              <div className="flex justify-center gap-8 border-b border-border pb-4 text-center">
                {["Günlük", "Haftalık", "Aylık"].map((item) => (
                  <button
                    key={item}
                    className={`text-lg font-medium transition-colors ${
                      item === "Günlük" ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-surface/80 p-6 text-center shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-medium text-foreground">{selected.label} - Günlük Yorum</h2>
                <p className="mt-4 text-muted">
                  Bugün yıldızlar sizin için ne söylüyor? {selected.vibe} Enerjinizi doğru yönlendirmek için harika bir gün.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-16 text-center text-muted">
              Yorumları görmek için yukarıdan bir burç seçin.
            </div>
          )}


        </div>
      </Container>
    </SiteShell>
  );
}
