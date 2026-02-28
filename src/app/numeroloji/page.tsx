import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Numeroloji",
  description: "Hayat yolu sayını bul, kısa yorum kartlarıyla kendini keşfet.",
  alternates: { canonical: "/numeroloji" },
  openGraph: {
    type: "website",
    url: "/numeroloji",
    title: "Numeroloji",
    description: "Hayat yolu sayını bul, kısa yorum kartlarıyla kendini keşfet.",
  },
};

type SP = { [key: string]: string | string[] | undefined };

function sumDigits(input: string) {
  let total = 0;
  for (const ch of input) {
    const n = ch >= "0" && ch <= "9" ? Number(ch) : 0;
    total += n;
  }
  return total;
}

function reduceNumber(n: number) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = sumDigits(String(n));
  }
  return n;
}

function lifePathFromDob(dob: string) {
  const cleaned = dob.replace(/[^0-9]/g, "");
  if (cleaned.length < 8) return null;
  const total = sumDigits(cleaned);
  return reduceNumber(total);
}

function labelForLifePath(n: number) {
  const map: Record<number, { title: string; vibe: string }> = {
    1: { title: "1 · Öncü", vibe: "Başlatma, bağımsızlık, liderlik." },
    2: { title: "2 · Uyum", vibe: "İş birliği, hassasiyet, denge." },
    3: { title: "3 · İfade", vibe: "Yaratıcılık, iletişim, neşe." },
    4: { title: "4 · Yapı", vibe: "Disiplin, emek, güvenli temel." },
    5: { title: "5 · Değişim", vibe: "Özgürlük, hareket, deneyim." },
    6: { title: "6 · Sorumluluk", vibe: "Bakım, aile, estetik ve düzen." },
    7: { title: "7 · Derinlik", vibe: "Analiz, sezgi, içe dönüş." },
    8: { title: "8 · Güç", vibe: "Hedef, yönetim, sonuç alma." },
    9: { title: "9 · Şefkat", vibe: "Tamamlama, hizmet, bütünlük." },
    11: { title: "11 · Usta Sezgi", vibe: "İlham, vizyon, hassas algı." },
    22: { title: "22 · Usta Kurucu", vibe: "Büyük yapı, somutlaştırma, etki." },
    33: { title: "33 · Usta Şefkat", vibe: "Öğreticilik, şifa, kolektif hizmet." },
  };
  return map[n] ?? { title: `${n}`, vibe: "Kısa yorum yakında." };
}

export default async function NumerologyPage({ searchParams }: { searchParams?: Promise<SP> }) {
  const sp = (await searchParams) ?? {};
  const dob = typeof sp.dob === "string" ? sp.dob : "";
  const lifePath = dob ? lifePathFromDob(dob) : null;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dayNumber = reduceNumber(sumDigits(`${yyyy}${mm}${dd}`));

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl text-foreground">Numeroloji</h1>
              <p className="mt-2 text-sm text-muted">
                Doğum tarihini gir, hayat yolu sayını gör. Tam analizler yakında; şimdilik hızlı kartlar.
              </p>
            </div>
            <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
              Ana sayfa
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="text-sm font-medium text-foreground">Hayat yolu hesapla</div>
            <form method="get" action="/numeroloji" className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="w-full">
                <div className="text-xs text-muted">Doğum tarihi</div>
                <input
                  name="dob"
                  type="date"
                  defaultValue={dob}
                  className="mt-2 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-ring/30"
                />
              </label>
              <button
                type="submit"
                className="rounded-2xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Hesapla
              </button>
            </form>

            {lifePath ? (
              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-surface p-4 lg:col-span-2">
                  <div className="text-sm font-medium text-foreground">{labelForLifePath(lifePath).title}</div>
                  <div className="mt-2 text-sm leading-6 text-muted">{labelForLifePath(lifePath).vibe}</div>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <div className="text-sm font-medium text-foreground">Bugünün sayısı</div>
                  <div className="mt-2 text-2xl tracking-tight text-foreground">{dayNumber}</div>
                  <div className="mt-1 text-xs text-muted">{dd}.{mm}.{yyyy}</div>
                </div>
              </div>
            ) : dob ? (
              <div className="mt-4 text-sm text-muted">Geçerli bir tarih seç.</div>
            ) : (
              <div className="mt-4 text-sm text-muted">Başlamak için doğum tarihini gir.</div>
            )}
          </div>

          <section className="mt-10">
            <h2 className="text-lg text-foreground">Keşif başlıkları</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Hayat yolu", s: "Yön · motivasyon · öğrenme temaları." },
                { t: "Gün sayısı", s: "Bugün için mikro odak cümlesi." },
                { t: "İsim analizi", s: "Güçlü yönler · dikkat noktaları (yakında)." },
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