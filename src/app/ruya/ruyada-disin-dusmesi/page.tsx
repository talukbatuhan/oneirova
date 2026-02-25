import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Rüyada Dişin Düşmesi",
  description:
    "Test sayfası: Rüyada dişin düşmesi genel yorum, olası anlamlar ve düşünmek için sorular.",
  alternates: {
    canonical: "/ruya/ruyada-disin-dusmesi",
  },
  openGraph: {
    type: "article",
    url: "/ruya/ruyada-disin-dusmesi",
    title: "Rüyada Dişin Düşmesi",
    description:
      "Rüyada dişin düşmesi genel yorum, olası anlamlar ve düşünmek için sorular.",
  },
};

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-lg text-foreground sm:text-xl">{children}</h2>;
}

function Paragraph({ children }: { children: string }) {
  return <p className="text-base leading-7 text-muted sm:text-[17px] sm:leading-8">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-base leading-7 text-muted sm:text-[17px] sm:leading-8">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function RuyadaDisinDusmesiPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
            <h1 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Rüyada Dişin Düşmesi
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-muted">
              Test amaçlı içerik sayfası.
            </p>

            <article className="mt-10 space-y-10">
              <section className="space-y-4">
                <Paragraph>
                  Rüyada dişin düşmesi, en yaygın rüya temalarından biridir. Genellikle kontrol kaybı,
                  kırılganlık, değişim ve kendini ifade etme konularıyla ilişkilendirilir. Yorum,
                  rüyanın duygusuna ve dişin nasıl düştüğüne göre değişebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Genel Yorum</SectionTitle>
                <BulletList
                  items={[
                    "Kendini güvensiz veya savunmasız hissetmek",
                    "Bir değişim dönemine girildiğini fark etmek",
                    "Görünüş, özgüven veya ifade ile ilgili kaygılar",
                    "Kontrol edemediğiniz bir sürecin baskısı",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Detaylara Göre</SectionTitle>
                <BulletList
                  items={[
                    "Diş acısız düşüyorsa: zor gibi görünen bir değişimin kolaylaşması",
                    "Kanama varsa: duygusal yoğunluk veya kırılgan bir dönem",
                    "Birden fazla diş düşüyorsa: üst üste gelen stres veya yük",
                  ]}
                />
              </section>

              <section className="space-y-4">
                <SectionTitle>Düşünmek İçin Sorular</SectionTitle>
                <BulletList
                  items={[
                    "Şu an hangi alanda kontrolü kaybediyor gibi hissediyorsun?",
                    "Kendini en çok nerede “yargılanıyor” hissediyorsun?",
                    "Ertelediğin bir konuşma veya karar var mı?",
                  ]}
                />
              </section>
            </article>
        </div>
      </Container>
    </SiteShell>
  );
}
