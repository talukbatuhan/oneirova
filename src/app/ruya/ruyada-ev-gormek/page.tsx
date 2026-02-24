import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Rüyada Ev Görmek",
  description:
    "Test sayfası: Rüyada ev görmek genel yorum, evin durumu ve detaylara göre olası anlamlar.",
  alternates: {
    canonical: "/ruya/ruyada-ev-gormek",
  },
  openGraph: {
    type: "article",
    url: "/ruya/ruyada-ev-gormek",
    title: "Rüyada Ev Görmek",
    description: "Rüyada ev görmek genel yorum, evin durumu ve detaylara göre olası anlamlar.",
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

export default function RuyadaEvGormekPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Rüyada Ev Görmek
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-muted">
              Test amaçlı içerik sayfası.
            </p>

            <article className="mt-10 space-y-10">
              <section className="space-y-4">
                <Paragraph>
                  Rüyada ev görmek çoğu yorumda “benlik” ve “iç dünya” ile ilişkilendirilir. Evin odaları,
                  düzeni, ışığı ve hissi; kişinin kendine, aileye ve güvenlik ihtiyacına dair ipuçları
                  taşıyabilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Genel Yorum</SectionTitle>
                <BulletList
                  items={[
                    "Güvenlik ve aidiyet ihtiyacı",
                    "Aile, kökler ve kişisel sınırlar",
                    "İç dünyadaki düzen/karmaşa",
                    "Yeni bir dönem veya yeni bir kimlik hâli",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Evin Durumuna Göre</SectionTitle>
                <BulletList
                  items={[
                    "Yeni ev: taze başlangıç, yeni rol veya yeni düzen",
                    "Eski ev: geçmiş kalıplar, anılar ve tekrar eden temalar",
                    "Dağınık ev: zihinsel yük, ertelemeler veya yorgunluk",
                    "Geniş/ferah ev: rahatlama, alan açma ve özgüven",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Düşünmek İçin Sorular</SectionTitle>
                <BulletList
                  items={[
                    "Şu an hayatında “güvenli alan” neresi?",
                    "Düzenlemek istediğin bir alan/konu var mı?",
                    "Geçmişten taşınan bir alışkanlık tekrar mı ediyor?",
                  ]}
                />
              </section>
            </article>
        </div>
      </Container>
    </SiteShell>
  );
}
