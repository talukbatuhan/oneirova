import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteHeader } from "@/components/SiteHeader";
import { cmsGetDream } from "@/lib/cms/dreams";
import { deleteDreamAction, saveDreamAction } from "@/app/admin/actions";

type AdminEditDreamSearchParams = { [key: string]: string | string[] | undefined };

type AdminEditDreamParams = { slug: string };

export default async function EditDreamPage({
  params,
  searchParams,
}: {
  params: Promise<AdminEditDreamParams>;
  searchParams?: Promise<AdminEditDreamSearchParams>;
}) {
  const p = await params;
  const sp = (await searchParams) ?? {};

  const dream = await cmsGetDream(p.slug);

  const slug = String(dream?.slug ?? p.slug);
  const title = String(dream?.title ?? "");
  const excerpt = String(dream?.excerpt ?? "");

  const payload = JSON.stringify(
    {
      slug,
      title,
      excerpt,
      status: dream?.status ?? "draft",
      publishedAt: dream?.published_at ?? null,
      coverImageUrl: dream?.cover_image_url ?? null,
      ogImageUrl: dream?.og_image_url ?? null,
      seo: dream?.seo ?? {},
      themes: Array.isArray(dream?.themes) ? dream.themes : [],
      quickMeaning: Array.isArray(dream?.quick_meaning) ? dream.quick_meaning : [],
      sections: Array.isArray(dream?.sections) ? dream.sections : [],
    },
    null,
    2,
  );

  const err = typeof sp.err === "string" ? sp.err : "";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-10">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl text-foreground">İçerik düzenle</h1>
                <p className="mt-2 text-sm text-muted">{slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/ruya/${encodeURIComponent(slug)}?preview=1`}
                  className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  Önizle
                </Link>
                <Link href="/admin" className="text-sm text-muted transition-colors hover:text-foreground">
                  Geri
                </Link>
              </div>
            </div>

            {err ? <div className="mt-4 text-sm text-muted">{err}</div> : null}

            <form action={saveDreamAction} className="mt-6 space-y-6">
              <input type="hidden" name="returnTo" value={`/admin/dreams/${encodeURIComponent(slug)}`} />

              <section className="rounded-2xl border border-border bg-surface px-6 py-6">
                <label className="block text-sm font-medium text-foreground">JSON (tam içerik)</label>
                <textarea
                  name="payload"
                  rows={28}
                  defaultValue={payload}
                  className={[
                    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs text-foreground",
                    "outline-none focus:border-accent focus:ring-2 focus:ring-ring/30",
                  ].join(" ")}
                />
              </section>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Kaydet
                </button>
              </div>
            </form>

            <form action={deleteDreamAction} className="mt-4">
              <input type="hidden" name="slug" value={slug} />
              <button
                type="submit"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
              >
                Sil
              </button>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}