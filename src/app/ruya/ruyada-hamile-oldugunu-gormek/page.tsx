import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Rüyada Hamile Olduğunu Görmek",
  description:
    "Test sayfası: Rüyada hamile olduğunu görmek genel yorum, olası anlamlar ve dikkat edilmesi gereken detaylar.",
  alternates: {
    canonical: "/ruya/ruyada-hamile-oldugunu-gormek",
  },
  openGraph: {
    type: "article",
    url: "/ruya/ruyada-hamile-oldugunu-gormek",
    title: "Rüyada Hamile Olduğunu Görmek",
    description:
      "Rüyada hamile olduğunu görmek genel yorum, olası anlamlar ve dikkat edilmesi gereken detaylar.",
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

export default function RuyadaHamileOldugunuGormekPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Rüyada Hamile Olduğunu Görmek
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-muted">
              Test amaçlı içerik sayfası.
            </p>

            <article className="mt-10 space-y-10">
              <section className="space-y-4">
                <Paragraph>
                  Rüyada hamile olduğunu görmek çoğunlukla bir “gelişim” ve “oluşum” sürecine işaret eder.
                  Bu süreç; yeni bir fikir, proje, ilişki ya da kimlik değişimi gibi henüz tam görünür
                  olmayan ama büyümekte olan bir şeyi temsil edebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Genel Yorum</SectionTitle>
                <BulletList
                  items={[
                    "Yeni bir başlangıç veya yeni bir fikir",
                    "Sorumluluk artışı ve hazırlık dönemi",
                    "Beklenti, umut ve bazen kaygı karışımı duygular",
                    "Kişisel dönüşüm ve olgunlaşma",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Detaylara Göre</SectionTitle>
                <BulletList
                  items={[
                    "Mutlu hissetmek: sürece güven ve motivasyon",
                    "Korku/gerginlik: belirsizlik veya “hazır değilim” duygusu",
                    "Doğuma yaklaşmak: bir işin sonuçlanma aşamasına gelmesi",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Düşünmek İçin Sorular</SectionTitle>
                <BulletList
                  items={[
                    "Hayatında büyüttüğün ama henüz paylaşmadığın ne var?",
                    "Hangi konuda “hazır olma” baskısı hissediyorsun?",
                    "Bu süreci desteklemek için küçük bir sonraki adım ne olabilir?",
                  ]}
                />
              </section>
            </article>
        </div>
      </Container>
    </SiteShell>
  );
}