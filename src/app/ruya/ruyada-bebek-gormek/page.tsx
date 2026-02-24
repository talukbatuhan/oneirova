import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Rüyada Bebek Görmek",
  description:
    "Rüyada bebek görmek ne anlama gelir? Erkek bebek, kız bebek, kucağa almak, ağlayan bebek ve yeni doğmuş bebek yorumları.",
  alternates: {
    canonical: "/ruya/ruyada-bebek-gormek",
  },
  openGraph: {
    type: "article",
    url: "/ruya/ruyada-bebek-gormek",
    title: "Rüyada Bebek Görmek",
    description:
      "Rüyada bebek görmek ne anlama gelir? Erkek bebek, kız bebek, kucağa almak, ağlayan bebek ve yeni doğmuş bebek yorumları.",
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

export default function RuyadaBebekGormekPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Rüyada Bebek Görmek
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-muted">
              Rüyada Bebek Görmek Ne Anlama Gelir?
            </p>

            <article className="mt-10 space-y-10">
              <section className="space-y-4">
                <Paragraph>
                  Rüyada bebek görmek, en çok araştırılan ve genellikle olumlu kabul edilen rüyalardan
                  biridir. Bebek; saflık, başlangıç, umut, masumiyet ve yeni fırsatların sembolüdür.
                  Ancak rüyanın doğru yorumlanabilmesi için bebeğin durumu, rüya sahibinin hisleri ve
                  rüyanın bağlamı dikkatle değerlendirilmelidir.
                </Paragraph>
                <Paragraph>
                  Bu içerikte “rüyada bebek görmek ne demek?”, “rüyada erkek bebek görmek”, “rüyada kız
                  bebek görmek”, “rüyada bebek kucağa almak” gibi en çok aranan başlıkları detaylı şekilde
                  ele alıyoruz.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Bebek Görmenin Genel Yorumu</SectionTitle>
                <Paragraph>Rüyada bebek görmek çoğunlukla:</Paragraph>
                <BulletList
                  items={[
                    "Yeni başlangıç",
                    "Hayırlı haber",
                    "Kısmet ve bereket",
                    "Saf ve temiz duygular",
                    "Hayatta yeni bir dönem",
                  ]}
                />
                <Paragraph>
                  anlamına gelir. Bebek, hayatınızda henüz gelişim aşamasında olan bir projeyi, ilişkiyi
                  ya da fikri temsil edebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Erkek Bebek Görmek</SectionTitle>
                <Paragraph>Rüyada erkek bebek görmek genellikle:</Paragraph>
                <BulletList items={["Güç ve sorumluluk", "Maddi kazanç", "İş hayatında gelişme"]} />
                <Paragraph>
                  anlamına gelir. Bazı yorumlara göre erkek bebek görmek, başlangıçta sorumluluk gibi
                  görünse de sonunda hayırlı sonuçlar doğuracak bir süreci temsil eder.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Kız Bebek Görmek</SectionTitle>
                <Paragraph>Rüyada kız bebek görmek çoğunlukla:</Paragraph>
                <BulletList items={["Mutluluk", "Sevinçli haber", "Huzur ve bereket"]} />
                <Paragraph>
                  anlamına gelir. Kız bebek görmek genellikle daha yumuşak ve olumlu yorumlanır.
                  Hayatınıza girecek güzel bir gelişmenin habercisi olabilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Bebek Kucağa Almak</SectionTitle>
                <Paragraph>Rüyada bebek kucağa almak:</Paragraph>
                <BulletList
                  items={[
                    "Yeni bir sorumluluk üstlenmek",
                    "Beklenen bir haberin gerçekleşmesi",
                    "Hayatınızda önemli bir adım",
                  ]}
                />
                <Paragraph>
                  anlamına gelir. Eğer bebek huzurlu ve gülüyorsa, bu durum hayırlı bir sürece işaret
                  eder. Ağlayan bebek ise çözülmesi gereken bir meseleyi simgeleyebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Ağlayan Bebek Görmek</SectionTitle>
                <Paragraph>Ağlayan bebek genellikle:</Paragraph>
                <BulletList items={["İçsel huzursuzluk", "İhmal edilmiş bir konu", "Duygusal eksiklik"]} />
                <Paragraph>
                  anlamına gelir. Bu rüya, hayatınızda ilgilenmeniz gereken bir mesele olduğunu
                  gösterebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Yeni Doğmuş Bebek Görmek</SectionTitle>
                <Paragraph>Yeni doğmuş bebek:</Paragraph>
                <BulletList items={["Tertemiz bir başlangıç", "Yeni iş fırsatı", "Hayat değişimi"]} />
                <Paragraph>
                  anlamına gelir. Bu rüya, eski bir dönemin kapanıp yepyeni bir sürecin başlayacağını
                  işaret edebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Psikolojik Yorum</SectionTitle>
                <Paragraph>Psikolojik açıdan bebek:</Paragraph>
                <BulletList
                  items={[
                    "İçinizdeki masum taraf",
                    "Korunmaya ihtiyaç duyan duygular",
                    "Yeni bir hedef",
                  ]}
                />
                <Paragraph>
                  anlamına gelir. Bebek, kişinin bilinçaltında büyütmek istediği bir fikri veya
                  gelişmekte olan potansiyeli temsil edebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Dini Yorum</SectionTitle>
                <Paragraph>Dini kaynaklara göre rüyada bebek görmek:</Paragraph>
                <BulletList items={["Hayırlı rızık", "Temiz niyet", "Duaların kabulü"]} />
                <Paragraph>
                  anlamına gelebilir. Ancak bebeğin hasta ya da huzursuz olması, sabır gerektiren bir
                  döneme işaret edebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Bebek Görmek İyi mi?</SectionTitle>
                <Paragraph>
                  Genel olarak rüyada bebek görmek olumlu kabul edilir. Ancak yorum, rüyanın detaylarına
                  göre değişir:
                </Paragraph>
                <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                  <table className="w-full text-left text-sm text-muted">
                    <thead className="border-b border-border text-xs uppercase tracking-wide text-muted">
                      <tr>
                        <th className="px-5 py-3 font-medium">Rüya detayı</th>
                        <th className="px-5 py-3 font-medium">Anlamı</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-5 py-4 text-foreground">Gülümseyen bebek</td>
                        <td className="px-5 py-4">Sevinçli haber</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Ağlayan bebek</td>
                        <td className="px-5 py-4">Çözülmesi gereken sorun</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Erkek bebek</td>
                        <td className="px-5 py-4">Sorumluluk ve kazanç</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Kız bebek</td>
                        <td className="px-5 py-4">Huzur ve mutluluk</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Yeni doğmuş bebek</td>
                        <td className="px-5 py-4">Yeni başlangıç</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </article>
        </div>
      </Container>
    </SiteShell>
  );
}
