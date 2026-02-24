import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Rüyada Yılan Görmek",
  description:
    "Rüyada yılan görmek ne anlama gelir? Yılan sokması, siyah yılan, beyaz yılan, yılan öldürmek, evde yılan ve büyük yılan yorumları.",
  alternates: {
    canonical: "/ruya/ruyada-yilan-gormek",
  },
  openGraph: {
    type: "article",
    url: "/ruya/ruyada-yilan-gormek",
    title: "Rüyada Yılan Görmek",
    description:
      "Rüyada yılan görmek ne anlama gelir? Yılan sokması, siyah yılan, beyaz yılan, yılan öldürmek, evde yılan ve büyük yılan yorumları.",
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

export default function RuyadaYilanGormekPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Rüyada Yılan Görmek
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-muted">
              Rüyada Yılan Görmek Ne Anlama Gelir?
            </p>

            <article className="mt-10 space-y-10">
              <section className="space-y-4">
                <Paragraph>
                  Rüyada yılan görmek, en güçlü ve sembolik rüyalardan biridir. Yılan; tarih boyunca hem
                  tehlike hem de dönüşüm, hem düşmanlık hem de şifa sembolü olarak kabul edilmiştir. Bu
                  nedenle rüyanın yorumu tamamen yılanın davranışına, rengine, büyüklüğüne ve rüya
                  sahibinin hislerine bağlıdır.
                </Paragraph>
                <Paragraph>
                  Bu içerikte “rüyada yılan görmek ne demek?”, “rüyada yılan sokması”, “rüyada siyah yılan
                  görmek”, “rüyada yılan öldürmek” gibi en çok aranan alt başlıkları ayrıntılı şekilde ele
                  alıyoruz.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Yılan Görmenin Genel Yorumu</SectionTitle>
                <Paragraph>Genel olarak rüyada yılan görmek:</Paragraph>
                <BulletList
                  items={[
                    "Gizli düşman",
                    "Kıskançlık",
                    "İçsel korkular",
                    "Güçlü bir rakip",
                    "Hayatta dönüşüm süreci",
                  ]}
                />
                <Paragraph>
                  anlamlarına gelir. Bazı yorumlara göre yılan, kişinin çevresinde niyeti tam bilinmeyen
                  birini temsil eder. Ancak psikolojik açıdan bakıldığında yılan; bastırılmış duyguların
                  veya bilinçaltındaki korkuların sembolü olabilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Yılan Sokması</SectionTitle>
                <Paragraph>Rüyada yılan tarafından sokulmak:</Paragraph>
                <BulletList
                  items={[
                    "Beklenmedik bir zarar",
                    "Güvenilen birinden hayal kırıklığı",
                    "Duygusal incinme",
                  ]}
                />
                <Paragraph>anlamına gelebilir. Sokulan yer de önemlidir:</Paragraph>
                <BulletList items={["El: İş hayatı", "Ayak: Hayat yolu ve kararlar", "Kalp: Duygusal meseleler"]} />
                <Paragraph>
                  Eğer sokmadan sonra acı hissedilmiyorsa, bu durum zarar gibi görünen bir olayın aslında
                  kişiye ders olacağını gösterebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Yılan Öldürmek</SectionTitle>
                <Paragraph>Rüyada yılan öldürmek genellikle olumlu yorumlanır:</Paragraph>
                <BulletList items={["Düşmana üstün gelmek", "Sorunları aşmak", "Güç kazanmak"]} />
                <Paragraph>
                  Bu rüya, kişinin hayatındaki bir tehdidi fark edip kontrol altına aldığını simgeler.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Siyah Yılan Görmek</SectionTitle>
                <Paragraph>Siyah yılan:</Paragraph>
                <BulletList items={["Güçlü bir düşman", "Derin korkular", "Gizli bir tehlike"]} />
                <Paragraph>Rüya sahibinin dikkatli olması gerektiğine işaret eder.</Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Beyaz Yılan Görmek</SectionTitle>
                <Paragraph>Beyaz yılan:</Paragraph>
                <BulletList
                  items={[
                    "Gizli ama zayıf bir düşman",
                    "Fark edilmeyen bir risk",
                    "Aynı zamanda ruhsal dönüşüm",
                  ]}
                />
                <Paragraph>
                  anlamına gelebilir. Beyaz yılan bazen içsel arınmayı ve bilinçlenmeyi temsil eder.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Büyük Yılan Görmek</SectionTitle>
                <Paragraph>Büyük yılan:</Paragraph>
                <BulletList items={["Büyük bir mesele", "Önemli bir rakip", "Hayat değiştiren bir durum"]} />
                <Paragraph>Yılanın sakin olması, durumun kontrol edilebilir olduğunu gösterir.</Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Evde Yılan Görmek</SectionTitle>
                <Paragraph>Evde yılan görmek:</Paragraph>
                <BulletList
                  items={[
                    "Aile içi bir mesele",
                    "Yakın çevrede gizli bir huzursuzluk",
                    "Güven sorunları",
                  ]}
                />
                <Paragraph>
                  anlamına gelebilir. Ev, kişinin özel hayatını temsil ettiği için bu rüya genellikle
                  yakın çevreyle ilgilidir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Psikolojik Yorum</SectionTitle>
                <Paragraph>Psikolojik açıdan yılan:</Paragraph>
                <BulletList items={["Bastırılmış korkular", "Cinsellik", "Güç", "Dönüşüm"]} />
                <Paragraph>
                  sembolüdür. Özellikle eski derisini değiştiren yılan, kişisel gelişim ve yeniden doğuş
                  anlamı taşır. Kişi hayatında bir değişim sürecinden geçiyor olabilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Dini Yorum</SectionTitle>
                <Paragraph>Dini yorumlara göre yılan çoğunlukla:</Paragraph>
                <BulletList items={["Düşman", "Fitne", "Gizli tehlike"]} />
                <Paragraph>
                  anlamına gelir. Ancak rüyada yılanı kontrol etmek veya öldürmek, zafer ve korunma
                  anlamına gelir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Yılan Görmek İyi mi Kötü mü?</SectionTitle>
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
                        <td className="px-5 py-4 text-foreground">Yılan sokması</td>
                        <td className="px-5 py-4">Zarar veya uyarı</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Yılan öldürmek</td>
                        <td className="px-5 py-4">Güç ve zafer</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Siyah yılan</td>
                        <td className="px-5 py-4">Güçlü düşman</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Beyaz yılan</td>
                        <td className="px-5 py-4">Gizli ama zayıf risk</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Evde yılan</td>
                        <td className="px-5 py-4">Yakın çevre sorunu</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Paragraph>
                  Genel olarak yılan rüyası uyarıcı niteliktedir. Kişinin hayatındaki potansiyel risklere
                  karşı dikkatli olması gerektiğini gösterir.
                </Paragraph>
              </section>
            </article>
        </div>
      </Container>
    </SiteShell>
  );
}
