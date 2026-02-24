import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Rüyada Düğün Görmek",
  description:
    "Test sayfası: Rüyada düğün görmek genel yorum, olası anlamlar ve rüya detaylarına göre ipuçları.",
  alternates: {
    canonical: "/ruya/ruyada-dugun-gormek",
  },
  openGraph: {
    type: "article",
    url: "/ruya/ruyada-dugun-gormek",
    title: "Rüyada Düğün Görmek",
    description:
      "Rüyada düğün görmek genel yorum, olası anlamlar ve rüya detaylarına göre ipuçları.",
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

export default function RuyadaDugunGormekPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Rüyada Düğün Görmek
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-muted">
              Test amaçlı içerik sayfası.
            </p>

            <article className="mt-10 space-y-10">
              <section className="space-y-4">
                <Paragraph>
                  Rüyada düğün görmek sıklıkla “bağlılık”, “seçim” ve “birleşme” temalarıyla ilişkilendirilir.
                  Bazen bir ilişkiyi, bazen de hayatın iki alanını (iş/özel, eski/yeni) uyumlandırma ihtiyacını
                  simgeleyebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Genel Yorum</SectionTitle>
                <BulletList
                  items={[
                    "Bir kararı resmileştirmek veya netleştirmek",
                    "Sorumluluk almak ve yeni bir role geçmek",
                    "İki farklı alanı bir araya getirmek",
                    "Toplumsal beklenti ve görünürlük kaygısı",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Detaylara Göre</SectionTitle>
                <BulletList
                  items={[
                    "Neşeli düğün: uyum, destek ve olumlu gelişmeler",
                    "Gergin düğün: baskı, kararsızlık veya zor seçim",
                    "Düğüne yetişememek: zaman baskısı veya hazırlık endişesi",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Düşünmek İçin Sorular</SectionTitle>
                <BulletList
                  items={[
                    "Şu an hangi seçimi yapman bekleniyor (sen ne istiyorsun)?",
                    "Hangi rol değişimi seni heyecanlandırıyor veya korkutuyor?",
                    "Hayatında birleştirmek istediğin iki şey ne?",
                  ]}
                />
              </section>
            </article>
        </div>
      </Container>
    </SiteShell>
  );
}
