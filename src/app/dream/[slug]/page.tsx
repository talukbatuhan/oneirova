import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { ShareMenu } from "@/components/ShareMenu";
import { SiteShell } from "@/components/SiteShell";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/auth";
import type { DreamEntry } from "@/lib/dreams";
import { getDreamBySlug, getDreams } from "@/lib/dreams";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

async function getDreamForRequest(params: {
  slug: string;
  preview: boolean;
}): Promise<DreamEntry | undefined> {
  const dream = await getDreamBySlug(params.slug);
  if (dream) return dream;
  if (!params.preview) return undefined;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("dreams")
    .select(
      "slug,title,excerpt,themes,updated_at,quick_meaning,sections,cover_image_url,og_image_url,seo",
    )
    .eq("slug", params.slug)
    .maybeSingle();
  if (error) throw error;
  if (!data) return undefined;

  return {
    slug: String((data as any).slug ?? params.slug),
    title: String((data as any).title ?? ""),
    excerpt: String((data as any).excerpt ?? ""),
    themes: Array.isArray((data as any).themes) ? (data as any).themes : [],
    updatedAt: String((data as any).updated_at ?? ""),
    quickMeaning: Array.isArray((data as any).quick_meaning) ? (data as any).quick_meaning : [],
    sections: Array.isArray((data as any).sections) ? (data as any).sections : [],
    coverImageUrl: ((data as any).cover_image_url as string | null) ?? null,
    ogImageUrl: ((data as any).og_image_url as string | null) ?? null,
    seo:
      (data as any).seo && typeof (data as any).seo === "object" && !Array.isArray((data as any).seo)
        ? ((data as any).seo as any)
        : undefined,
  };
}

type DreamPageParams = { slug: string };
type DreamPageSearchParams = { [key: string]: string | string[] | undefined };

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<DreamPageParams>;
  searchParams?: Promise<DreamPageSearchParams>;
}): Promise<Metadata> {
  const p = await params;
  const sp = (await searchParams) ?? {};

  const jar = await cookies();
  const isAdmin = jar.get(ADMIN_COOKIE_NAME)?.value === "1";
  const preview = isAdmin && String(sp.preview ?? "") === "1";

  const dream = await getDreamForRequest({ slug: p.slug, preview });
  if (!dream) return {};

  const canonical =
    typeof dream.seo?.canonical === "string" && dream.seo.canonical.startsWith("/")
      ? dream.seo.canonical
      : `/ruya/${dream.slug}`;

  const baseTitle = String(dream.seo?.seoTitle ?? dream.title ?? "").trim();
  const needsQuestion = !/(\?|ne anlama gelir|ne demek)/i.test(baseTitle);
  const ctrTitle = `${baseTitle}${needsQuestion ? " Ne Anlama Gelir?" : ""} | Oneirova`;
  const title = ctrTitle;
  const description = (dream.seo?.seoDescription ?? dream.excerpt).trim();

  const image = dream.ogImageUrl || dream.coverImageUrl || undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: preview
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

async function relatedDreams(slug: string) {
  const current = await getDreamBySlug(slug);
  if (!current) return [];
  const themes = new Set(current.themes);

  return (await getDreams())
    .filter((d) => d.slug !== slug)
    .map((d) => {
      const shared = d.themes.filter((t) => themes.has(t)).length;
      return { d, shared };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.d.updatedAt.localeCompare(a.d.updatedAt))
    .slice(0, 8)
    .map((x) => x.d);
}

export default async function DreamPage({
  params,
  searchParams,
}: {
  params: Promise<DreamPageParams>;
  searchParams?: Promise<DreamPageSearchParams>;
}) {
  const p = await params;
  const sp = (await searchParams) ?? {};

  const jar = await cookies();
  const isAdmin = jar.get(ADMIN_COOKIE_NAME)?.value === "1";
  const preview = isAdmin && String(sp.preview ?? "") === "1";

  const dream = await getDreamForRequest({ slug: p.slug, preview });
  if (!dream) notFound();

  const canonicalPath =
    typeof dream.seo?.canonical === "string" && dream.seo.canonical.startsWith("/")
      ? dream.seo.canonical
      : `/ruya/${dream.slug}`;
  const canonicalUrl = `https://oneirova.com${canonicalPath}`;

  const title = (dream.seo?.seoTitle ?? dream.title).trim();
  const description = (dream.seo?.seoDescription ?? dream.excerpt).trim();
  const image = dream.ogImageUrl || dream.coverImageUrl || "";

  const faqSection = dream.sections.find((s) => {
    const t = String(s.title ?? "").toLocaleLowerCase("tr-TR");
    return t.includes("sss") || t.includes("sık sorulan");
  });

  const faqEntities = (faqSection?.body ?? [])
    .map((line) => String(line ?? "").trim())
    .filter(Boolean)
    .map((line) => {
      const normalized = line.replace(/\s+/g, " ").trim();
      const qm = normalized.indexOf("?");
      if (qm >= 0 && qm < normalized.length - 1) {
        const q = normalized.slice(0, qm + 1).trim();
        const a = normalized.slice(qm + 1).trim().replace(/^[:\-–—]\s*/, "");
        if (!q || !a) return null;
        return { q, a };
      }
      const colon = normalized.indexOf(":");
      if (colon >= 0 && colon < normalized.length - 1) {
        const q = normalized.slice(0, colon).trim();
        const a = normalized.slice(colon + 1).trim();
        if (!q || !a) return null;
        return { q, a };
      }
      return null;
    })
    .filter((x): x is { q: string; a: string } => Boolean(x));

  const faqJsonLd =
    faqEntities.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntities.map((x) => ({
            "@type": "Question",
            name: x.q,
            acceptedAnswer: { "@type": "Answer", text: x.a },
          })),
        }
      : null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Oneirova", item: "https://oneirova.com/" },
        { "@type": "ListItem", position: 2, name: title, item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      headline: title,
      description,
      url: canonicalUrl,
      dateModified: dream.updatedAt ? new Date(dream.updatedAt).toISOString() : undefined,
      image: image ? [image] : undefined,
      keywords: dream.themes?.length ? dream.themes.join(", ") : undefined,
      author: { "@type": "Organization", name: "Oneirova" },
      publisher: { "@type": "Organization", name: "Oneirova" },
    },
    ...(faqJsonLd ? [faqJsonLd] : []),
  ];

  const related = await relatedDreams(dream.slug);
  const coverImageUrl = dream.coverImageUrl || "";

  function toId(input: string): string {
    return input
      .trim()
      .toLocaleLowerCase("tr-TR")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const sectionIds = new Map<string, number>();
  const sections = dream.sections.map((s) => {
    const base = toId(s.title) || "bolum";
    const next = (sectionIds.get(base) ?? 0) + 1;
    sectionIds.set(base, next);
    const id = next === 1 ? base : `${base}-${next}`;
    return { ...s, id };
  });

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Breadcrumbs
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Rüya Tabirleri", href: "/browse/a" },
              { label: dream.title },
            ]}
          />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0">
              {preview ? (
                <div className="mb-5 inline-flex rounded-full border border-border bg-surface px-4 py-2 text-xs text-muted">
                  Taslak önizleme
                </div>
              ) : null}
              <h1 className="text-balance text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                {dream.title}
              </h1>
              <p className="mt-4 text-pretty text-base leading-7 text-muted sm:text-[17px] sm:leading-8">
                {dream.excerpt}
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                <div className="relative aspect-[16/9] w-full">
                  {coverImageUrl ? (
                    <img
                      src={coverImageUrl}
                      alt={dream.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(900px circle at 20% 25%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 55%), radial-gradient(800px circle at 80% 30%, color-mix(in oklab, var(--accent2) 18%, transparent), transparent 58%), radial-gradient(900px circle at 55% 90%, color-mix(in oklab, var(--foreground) 10%, transparent), transparent 62%)",
                      }}
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border" />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {dream.themes.map((t) => (
                  <Link
                    key={t}
                    href={`/search?q=${encodeURIComponent(dream.title)}&theme=${encodeURIComponent(t)}`}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
            <ShareMenu title={dream.title} />
          </div>

          {sections.length >= 2 ? (
            <section className="mt-8 rounded-2xl border border-border bg-surface px-6 py-6">
              <div className="text-sm font-medium text-foreground">İçindekiler</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-10 rounded-2xl border border-border bg-surface px-6 py-6">
            <h2 className="text-base text-foreground">Hızlı anlam</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
              {dream.quickMeaning.map((m) => (
                <li key={m} className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          <article className="mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-lg text-foreground">{s.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-muted sm:text-[17px] sm:leading-8">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <section className="mt-14">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-lg text-foreground">Buna benzer rüyalar</h2>
              <Link href="/browse/a" className="text-sm text-muted transition-colors hover:text-foreground">
                A–Z gözat
              </Link>
            </div>
            <div className="mt-4">
              <DreamList dreams={related.slice(0, 4)} variant="cards" />
            </div>
          </section>
        </div>
      </Container>
    </SiteShell>
  );
}
