import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Rüyada Altın Görmek",
  description:
    "Rüyada altın görmek ne anlama gelir? Altın bulmak, takmak, kaybetmek, bilezik ve hediye almak gibi en çok aranan yorumlar.",
  alternates: {
    canonical: "/ruya/ruyada-altin-gormek",
  },
  openGraph: {
    type: "article",
    url: "/ruya/ruyada-altin-gormek",
    title: "Rüyada Altın Görmek",
    description:
      "Rüyada altın görmek ne anlama gelir? Altın bulmak, takmak, kaybetmek, bilezik ve hediye almak gibi en çok aranan yorumlar.",
  },
};

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-lg text-foreground sm:text-xl">{children}</h2>;
}

function SubTitle({ children }: { children: string }) {
  return <h3 className="text-base text-foreground">{children}</h3>;
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

export default function RuyadaAltinGormekPage() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Rüyada Altın Görmek
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-muted">
              Rüyada Altın Görmek Ne Anlama Gelir?
            </p>

            <article className="mt-10 space-y-10">
              <section className="space-y-4">
                <Paragraph>
                  Rüyada altın görmek, en sık araştırılan rüya temalarından biridir. Altın; tarih boyunca
                  zenginlik, güç, değer, itibar ve ilahi lütuf ile ilişkilendirilmiştir. Ancak rüya
                  tabirlerinde altının nasıl görüldüğü, kimden alındığı, ne yapıldığı ve rüya sahibinin
                  hissiyatı yorumun yönünü değiştirir.
                </Paragraph>
                <Paragraph>
                  Bu içerikte “rüyada altın görmek ne demek?”, “rüyada altın takmak”, “rüyada altın
                  bulmak”, “rüyada altın kaybetmek” gibi en çok aranan başlıklara detaylı ve açıklayıcı
                  şekilde yer verilmiştir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Altın Görmek Genel Yorumu</SectionTitle>
                <Paragraph>Rüyada altın görmek genellikle:</Paragraph>
                <BulletList
                  items={[
                    "Maddi kazanç",
                    "Beklenmedik fırsatlar",
                    "Değerli bir haber",
                    "Statü artışı",
                    "Kısmet ve şans",
                  ]}
                />
                <Paragraph>
                  ile ilişkilendirilir. Ancak bazı klasik rüya yorumcularına göre altın, sorumluluk ve
                  yük anlamına da gelebilir. Çünkü altın hem değerli hem de ağırdır; bu nedenle bazen
                  kişinin omuzlarına binecek önemli bir görevi simgeler.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Altın Bulmak</SectionTitle>
                <Paragraph>Rüyada altın bulmak, en olumlu rüya sembollerinden biridir.</Paragraph>
                <Paragraph>Bu rüya:</Paragraph>
                <BulletList
                  items={[
                    "Beklenmedik bir kazanç",
                    "İş hayatında fırsat",
                    "Yeni bir ilişki",
                    "Hayırlı bir kısmet",
                  ]}
                />
                <Paragraph>
                  anlamına gelebilir. Eğer bulunan altın temiz ve parlak ise, yorum daha olumlu yapılır.
                  Ancak kirli ya da kırık altın, geçici bir kazanca veya kısa süreli mutluluğa işaret
                  edebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Altın Takmak</SectionTitle>
                <Paragraph>Rüyada altın takmak özellikle kadınlar için hayırlı kabul edilir.</Paragraph>
                <BulletList
                  items={[
                    "Bekar biri için evlilik",
                    "Evli biri için huzur ve bereket",
                    "İş hayatında yükseliş",
                  ]}
                />
                <Paragraph>
                  anlamına gelir. Ancak erkeklerin rüyada altın taktığını görmesi bazı yorumlara göre
                  sorumluluk, sıkıntı ya da geçici bir stres dönemine işaret edebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Altın Kaybetmek</SectionTitle>
                <Paragraph>Rüyada altın kaybetmek genellikle fırsat kaçırmak anlamına gelir.</Paragraph>
                <BulletList items={["Maddi kayıp", "Değer verilen bir şeyi yitirme", "Pişmanlık"]} />
                <Paragraph>
                  şeklinde yorumlanabilir. Ancak kaybedilen altını tekrar bulmak, hatalardan ders
                  çıkararak yeniden başarıya ulaşmayı simgeler.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Altın Bilezik Görmek</SectionTitle>
                <Paragraph>Rüyada altın bilezik görmek çoğunlukla:</Paragraph>
                <BulletList items={["Aile içi mutluluk", "Evlilik teklifi", "Sorumluluk"]} />
                <Paragraph>
                  anlamlarına gelir. Birden fazla bilezik görmek, artan kazanç veya çoğalan kısmet
                  şeklinde yorumlanır.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Altın Hediye Almak</SectionTitle>
                <Paragraph>Rüyada birinden altın hediye almak:</Paragraph>
                <BulletList items={["Değer görmek", "Takdir edilmek", "Güven kazanmak"]} />
                <Paragraph>
                  anlamına gelir. Altını veren kişi tanıdık ise, o kişiyle olan bağın güçleneceği
                  şeklinde yorumlanır.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Psikolojik Yorum: Rüyada Altın Görmek</SectionTitle>
                <Paragraph>Psikolojik açıdan altın:</Paragraph>
                <BulletList items={["Öz değer", "Kişisel potansiyel", "Başarı arzusu"]} />
                <Paragraph>
                  anlamına gelir. Kişi hayatında kendini değerli hissetmek istiyor olabilir. Aynı
                  zamanda hedeflerine ulaşma motivasyonunun yüksek olduğunu gösterebilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Dini Yorum: Rüyada Altın Görmek</SectionTitle>
                <Paragraph>Dini kaynaklara göre altın bazen dünya nimetlerine işaret eder.</Paragraph>
                <BulletList items={["Bolluk", "Rızık", "Sabır sonrası ödül"]} />
                <Paragraph>
                  anlamları taşıyabilir. Ancak aşırı altın görmek, dünya malına fazla düşkünlük şeklinde
                  de yorumlanabilir.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Rüyada Altın Görmek İyi mi, Kötü mü?</SectionTitle>
                <Paragraph>Rüyanın detayları belirleyicidir:</Paragraph>
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
                        <td className="px-5 py-4 text-foreground">Altın bulmak</td>
                        <td className="px-5 py-4">Şans ve kazanç</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Altın takmak</td>
                        <td className="px-5 py-4">Evlilik veya sorumluluk</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Altın kaybetmek</td>
                        <td className="px-5 py-4">Fırsat kaybı</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Altın hediye almak</td>
                        <td className="px-5 py-4">Değer görmek</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 text-foreground">Kırık altın</td>
                        <td className="px-5 py-4">Geçici sıkıntı</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Paragraph>
                  Genel olarak rüyada altın görmek, doğru yorumlandığında olumlu gelişmelere işaret eder.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle>Sonuç</SectionTitle>
                <Paragraph>
                  Rüyada altın görmek; kısmet, değer, maddi kazanç ve sorumluluk sembolüdür. Rüyanın tam
                  yorumu için altının nasıl görüldüğü, kimden alındığı ve rüya sahibinin o anki duyguları
                  mutlaka dikkate alınmalıdır.
                </Paragraph>
                <Paragraph>
                  Eğer siz de rüyanızda altın gördüyseniz, detaylarını göz önünde bulundurarak yukarıdaki
                  yorumlarla kıyaslayabilirsiniz.
                </Paragraph>
              </section>
            </article>
        </div>
      </Container>
    </SiteShell>
  );
}
