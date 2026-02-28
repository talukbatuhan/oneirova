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

export default async function AstrologyPage({ searchParams }: { searchParams?: Promise<SP> }) {
  const sp = (await searchParams) ?? {};
  const signKey = typeof sp.burc === "string" ? sp.burc : "";
  const selected = SIGNS.find((s) => s.key === signKey) ?? null;

  return (
    <SiteShell mainClassName="pb-24 pt-10">
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

          <div className="mt-6 rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="text-sm font-medium text-foreground">Burcunu seç</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SIGNS.map((s) => {
                const active = selected?.key === s.key;
                return (
                  <Link
                    key={s.key}
                    href={`/astroloji?burc=${encodeURIComponent(s.key)}`}
                    className={[
                      "rounded-full border px-4 py-2 text-xs transition-colors",
                      active
                        ? "border-accent/60 bg-surface2 text-foreground"
                        : "border-border bg-surface text-muted hover:border-accent/60 hover:text-foreground",
                    ].join(" ")}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>

            {selected ? (
              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <div className="text-sm font-medium text-foreground">{selected.label} teması</div>
                  <div className="mt-2 text-sm leading-6 text-muted">{selected.vibe}</div>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <div className="text-sm font-medium text-foreground">Anahtar kelimeler</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.keywords.map((k) => (
                      <span key={k} className="rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-muted">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <div className="text-sm font-medium text-foreground">Soru kartı</div>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-muted">
                    {selected.questions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-sm text-muted">Seçim yapınca burç kartları burada açılır.</div>
            )}
          </div>

          <section className="mt-10">
            <h2 className="text-lg text-foreground">Keşif başlıkları</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Burç temaları", s: "Motivasyonlar, gölge taraf ve pratik ipuçları." },
                { t: "Uyumluluk", s: "Etiket değil; iletişim dili ve ihtiyaçlar." },
                { t: "Günün gökyüzü", s: "Tempo · ilişki · iş odağı için yumuşak yönlendirme." },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
                  <div className="text-sm font-medium text-foreground">{c.t}</div>
                  <div className="mt-2 text-sm leading-6 text-muted">{c.s}</div>
                  <div className="mt-3 text-xs text-muted">Durum: Yakında</div>
                </div>
              ))}
            </div>
          </section>


        </div>
      </Container>
    </SiteShell>
  );
}