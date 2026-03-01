import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export const revalidate = 86400;

type ArticleSection = {
  title: string;
  body: string[];
};

type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAtLabel: string;
  focusKeywords: string[];
  sections: ArticleSection[];
};

const ARTICLES: Record<string, Article> = {
  "ikizler-burcu": {
    slug: "ikizler-burcu",
    category: "Astroloji",
    title: "İkizler Burcu: Özellikler, Aşk Hayatı, Kariyer ve Güçlü/Zayıf Yönler",
    excerpt:
      "İkizler burcu; merak, iletişim ve hızlı zihinle anılır. Hava elementinin bu dinamik karakteri ilişki, iş ve günlük hayatta nasıl çalışır?",
    publishedAtLabel: "Güncellendi",
    focusKeywords: [
      "İkizler burcu hangi ay",
      "İkizler burcu özellikleri",
      "İkizler burcu aşk hayatı",
      "İkizler burcu kariyer",
    ],
    sections: [
      {
        title: "İkizler Burcu Hangi Ay?",
        body: [
          "İkizler burcu, 21 Mayıs–21 Haziran tarihleri arasında doğan kişileri kapsar.",
          "Hava elementi ve Merkür yönetimi; düşünce hızını, ifade gücünü ve sosyal çevreyle kurulan bağı öne çıkarır.",
        ],
      },
      {
        title: "Genel Özellikler",
        body: [
          "İkizler; meraklı, konuşkan, esnek ve çok yönlü bir yapı sergiler.",
          "Aynı anda birden fazla konuya ilgi duyabilir; öğrenme, keşfetme ve bağlantı kurma motivasyonu yüksektir.",
          "Monotonluk sıkıştırır; çeşitlilik, hareket ve zihinsel uyarım iyi gelir.",
        ],
      },
      {
        title: "Aşk Hayatı",
        body: [
          "İlişkide zihinsel uyum, sohbet ve ortak merak alanları belirleyicidir.",
          "Gündelik rutinde küçük sürprizler ve birlikte öğrenilen şeyler bağı güçlendirir.",
          "Duyguyu ifade ederken hızlanabilir; netlik ve güven için yavaşlatan konuşmalar işe yarar.",
        ],
      },
      {
        title: "Kariyer",
        body: [
          "İletişim, satış, pazarlama, medya, eğitim, yazı işleri ve araştırma gibi alanlarda doğal avantaj sağlar.",
          "Ekip içinde hızlı adaptasyon ve bilgi akışını yönetme becerisi öne çıkar.",
          "Odak dağınıklığını azaltmak için tek iş kuralı, kısa sprint’ler ve net teslim tarihleri faydalıdır.",
        ],
      },
      {
        title: "Olumlu / Olumsuz Yönler",
        body: [
          "Olumlu: hızlı zihin, espri, sosyal çevre kurma, öğrenmeye açıklık.",
          "Zorlayıcı: çabuk sıkılma, kararsız görünme, aynı anda çok iş açma.",
          "Denge: öncelik listesi, sınır koyma ve dinlenme ritmi kurmak.",
        ],
      },
      {
        title: "Element, Yönetici Gezegen ve Uğurlu Tonlar",
        body: [
          "Element: Hava · Yönetici: Merkür.",
          "İkizler için hafif, hareketli ve canlı tonlar (mavi, sarı, turuncu gibi) zihinsel açıklığı destekleyebilir.",
        ],
      },
    ],
  },
};

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `https://www.oneirova.com${path.startsWith("/") ? path : `/${path}`}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = await params;
  const article = ARTICLES[p.slug];
  if (!article) return {};

  const canonicalPath = `/astroloji/${article.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const title = `${article.title} | Oneirova`;

  return {
    title: { absolute: title },
    description: article.excerpt,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description: article.excerpt,
    },
    twitter: {
      card: "summary",
      title,
      description: article.excerpt,
    },
  };
}

function ShareRow({ url, title }: { url: string; title: string }) {
  const x = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;

  const iconClass = "h-4 w-4";
  const btnClass =
    "inline-flex items-center justify-center rounded-full border border-border bg-white px-3 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground";

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <a href={x} target="_blank" rel="noreferrer" className={btnClass} aria-label="X'te paylaş">
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.3-6.7L5.2 22H2l7.3-8.4L1 2h6.8l4.8 6.1L18.9 2Zm-1.2 18h1.7L6.2 3.9H4.4L17.7 20Z" />
        </svg>
      </a>
      <a href={wa} target="_blank" rel="noreferrer" className={btnClass} aria-label="WhatsApp'ta paylaş">
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true" fill="currentColor">
          <path d="M12 2a9.8 9.8 0 0 0-8.4 14.8L2 22l5.4-1.5A9.8 9.8 0 1 0 12 2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.9.9-3.1-.2-.3A8 8 0 1 1 12 19.8Zm4.7-5.8c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.1.2-.6.7-.7.9-.1.1-.3.1-.5 0-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.4-1.2-1.6-.1-.2 0-.4.1-.5l.3-.4c.1-.1.1-.3.2-.4 0-.1 0-.3 0-.4s-.5-1.2-.7-1.6c-.2-.4-.4-.3-.5-.3H9.7c-.1 0-.3 0-.5.2-.2.2-.6.6-.6 1.5 0 .9.6 1.7.7 1.8.1.1 1.3 2 3.2 2.8.4.2.8.3 1.1.4.5.2 1 .2 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.1-.2-.2-.4-.3Z" />
        </svg>
      </a>
      <a
        href={url}
        className={btnClass}
        aria-label="Bağlantıyı aç"
      >
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L12 4" />
          <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L12 20" />
        </svg>
      </a>
    </div>
  );
}

export default async function AstrologyArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const article = ARTICLES[p.slug];
  if (!article) notFound();

  const canonicalPath = `/astroloji/${article.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <article className="mx-auto max-w-[820px]">
          <Breadcrumbs
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Astroloji", href: "/astroloji" },
              { label: article.title },
            ]}
          />

          <div className="mt-5 overflow-hidden rounded-[28px] border border-border bg-white shadow-sm">
            <div className="px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center rounded-full border border-border bg-surface2 px-3 py-1 text-xs font-medium tracking-wide text-muted">
                  {article.category}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">{article.publishedAtLabel}</span>
              </div>

              <h1 className="mt-5 font-serif text-[38px] leading-[1.05] tracking-tight text-[#0b1220] sm:text-[42px]">
                {article.title}
              </h1>

              <p className="mt-4 text-[17px] leading-[1.75] text-[#3b4453]">
                {article.excerpt}
              </p>

              <ShareRow url={canonicalUrl} title={article.title} />

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {article.focusKeywords.slice(0, 4).map((k) => (
                  <span key={k} className="rounded-2xl border border-border bg-surface2 px-4 py-3 text-sm text-muted">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-border bg-white px-6 py-8 sm:px-10 sm:py-10">
              <figure className="overflow-hidden rounded-2xl border border-border bg-surface2">
                <div
                  aria-hidden="true"
                  className="h-[260px] bg-[radial-gradient(700px_circle_at_20%_20%,rgba(197,160,89,0.18),transparent_55%),radial-gradient(640px_circle_at_80%_10%,rgba(15,23,42,0.16),transparent_58%),radial-gradient(480px_circle_at_50%_110%,rgba(99,102,241,0.08),transparent_60%)]"
                />
                <figcaption className="px-5 py-4 text-sm leading-6 text-muted">
                  Editoryal not: İkizler için “hava” vurgusu; merak, hareket ve bağlantı kurma teması.
                </figcaption>
              </figure>

              <div className="mt-10 space-y-10">
                {article.sections.map((s) => (
                  <section key={s.title}>
                    <h2 className="font-serif text-[28px] leading-[1.15] tracking-tight text-[#0b1220] sm:text-[30px]">
                      {s.title}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {s.body.map((p, idx) => (
                        <p key={idx} className="text-[17px] leading-[1.75] text-[#3b4453]">
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-12 rounded-2xl border border-border bg-surface2 p-6">
                <div className="text-sm font-medium text-[#0b1220]">Daha derin bir okuma ister misin?</div>
                <div className="mt-2 text-[17px] leading-[1.75] text-[#3b4453]">
                  Bu içerik bir giriş. Yakında burçlara özel daha kapsamlı analizler ve bölüm bazlı rehberler yayınlanacak.
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/astroloji"
                    className="inline-flex items-center rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-[#0b1220] transition-colors hover:border-accent/60"
                  >
                    Astrolojiye dön
                  </Link>
                  <Link
                    href="/numeroloji"
                    className="inline-flex items-center rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-[#0b1220] transition-colors hover:border-accent/60"
                  >
                    Numerolojiye geç
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </SiteShell>
  );
}
