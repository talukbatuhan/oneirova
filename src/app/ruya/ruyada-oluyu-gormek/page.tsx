import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Rüyada Ölüyü Görmek",
  description:
    "Test sayfası: Rüyada ölüyü görmek genel yorum, psikolojik ve dini bakış, detaylara göre ipuçları.",
  alternates: {
    canonical: "/ruya/ruyada-oluyu-gormek",
  },
  openGraph: {
    type: "article",
    url: "/ruya/ruyada-oluyu-gormek",
    title: "Rüyada Ölüyü Görmek",
    description:
      "Rüyada ölüyü görmek genel yorum, psikolojik ve dini bakış, detaylara göre ipuçları.",
  },
};

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-lg text-foreground sm:text-xl">{children}</h2>;
}

function Paragraph({ children }: { children: string }) {
  return <p className="text-[15px] leading-7 text-muted">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[15px] leading-7 text-muted">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function RuyadaOluyuGormekPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Rüyada Ölüyü Görmek
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-muted">
              Test amaçlı içerik sayfası.
            </p>

            <article className="mt-10 space-y-10">
              <section className="space-y-4">
                <Paragraph>
                  Rüyada ölüyü görmek, birçok kişi için güçlü ve duygusal bir deneyimdir. Bu tür rüyalar
                  çoğu zaman “bitiş”, “kapanış”, “yas”, “özlem” ya da “dönüşüm” temalarıyla ilişkilendirilir.
                  Yorum, rüyadaki duyguya ve görülen kişinin kim olduğuna göre değişir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Genel Yorum</SectionTitle>
                <BulletList
                  items={[
                    "Bir dönemi kapatmak ve yenisine geçmek",
                    "Özlem, hatırlama ve içsel bağlar",
                    "Geçmişten gelen bir konuyu tamamlamak",
                    "Hayatta değişim ve yeniden yapılanma",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Psikolojik Bakış</SectionTitle>
                <BulletList
                  items={[
                    "Yas sürecinin farklı bir aşaması",
                    "Kapanmamış duygular ve zihinsel tekrarlar",
                    "Kimlik değişimi: eski bir “ben” hâlinin geride kalması",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Dini Bakış</SectionTitle>
                <BulletList
                  items={[
                    "Duaları hatırlama ve hayır yapma çağrışımı",
                    "Sabır ve tevekkül temaları",
                    "Öğüt alma: daha dikkatli yaşama ihtiyacı",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Düşünmek İçin Sorular</SectionTitle>
                <BulletList
                  items={[
                    "Bu rüyada baskın duygu neydi (özlem, korku, huzur)?",
                    "Kapatmak istediğin bir konu var mı?",
                    "Hayatında biten bir dönem yerine neyi başlatmak istiyorsun?",
                  ]}
                />
              </section>
            </article>
        </div>
      </Container>
    </SiteShell>
  );
}
