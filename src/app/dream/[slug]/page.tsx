import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { ShareMenu } from "@/components/ShareMenu";
import { SiteShell } from "@/components/SiteShell";
import { getDreamBySlug, getDreams } from "@/lib/dreams";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dream = await getDreamBySlug(params.slug);
  if (!dream) return {};
  return {
    title: dream.title,
    description: dream.excerpt,
    alternates: {
      canonical: `/dream/${dream.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/dream/${dream.slug}`,
      title: dream.title,
      description: dream.excerpt,
    },
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

export default async function DreamPage({ params }: { params: { slug: string } }) {
  const dream = await getDreamBySlug(params.slug);
  if (!dream) notFound();

  const related = await relatedDreams(dream.slug);

  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="text-balance text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                {dream.title}
              </h1>
              <p className="mt-4 text-pretty text-base leading-7 text-muted">{dream.excerpt}</p>
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

          <section className="mt-10 rounded-2xl border border-border bg-surface px-6 py-6">
            <h2 className="text-base text-foreground">Hızlı anlam</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
              {dream.quickMeaning.map((m) => (
                <li key={m} className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          <article className="mt-10 space-y-10">
            {dream.sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg text-foreground">{s.title}</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <section className="mt-14">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-lg text-foreground">İlgili rüyalar</h2>
              <Link href="/browse/a" className="text-sm text-muted transition-colors hover:text-foreground">
                A–Z gözat
              </Link>
            </div>
            <div className="mt-4">
              <DreamList dreams={related} variant="cards" />
            </div>
          </section>
        </div>
      </Container>
    </SiteShell>
  );
}
