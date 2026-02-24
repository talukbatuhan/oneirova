import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteHeader } from "@/components/SiteHeader";
import { cmsGetDream } from "@/lib/cms/dreams";
import { deleteDreamAction, saveDreamAction } from "@/app/admin/actions";

function toLines(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((x) => String(x ?? "").trim())
    .filter(Boolean)
    .join("\n");
}

export default async function EditDreamPage({ params }: { params: { slug: string } }) {
  const dream = await cmsGetDream(params.slug);

  const slug = String(dream?.slug ?? params.slug);
  const title = String(dream?.title ?? "");
  const excerpt = String(dream?.excerpt ?? "");
  const themes = toLines(dream?.themes);
  const quickMeaning = toLines(dream?.quick_meaning);
  const sections = JSON.stringify(dream?.sections ?? [], null, 2);

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
                  href={`/dream/${encodeURIComponent(slug)}`}
                  className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  Önizle
                </Link>
                <Link href="/admin" className="text-sm text-muted transition-colors hover:text-foreground">
                  Geri
                </Link>
              </div>
            </div>

            <form action={saveDreamAction} className="mt-6 space-y-6">
              <section className="rounded-2xl border border-border bg-surface px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground">Slug</label>
                    <input
                      name="slug"
                      defaultValue={slug}
                      className={[
                        "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                        "outline-none focus:border-accent focus:ring-2 focus:ring-ring/30",
                      ].join(" ")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">Başlık</label>
                    <input
                      name="title"
                      defaultValue={title}
                      className={[
                        "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                        "outline-none focus:border-accent focus:ring-2 focus:ring-ring/30",
                      ].join(" ")}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-foreground">Özet</label>
                  <textarea
                    name="excerpt"
                    rows={3}
                    defaultValue={excerpt}
                    className={[
                      "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                      "outline-none focus:border-accent focus:ring-2 focus:ring-ring/30",
                    ].join(" ")}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-surface px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground">Temalar (satır satır)</label>
                    <textarea
                      name="themes"
                      rows={6}
                      defaultValue={themes}
                      className={[
                        "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                        "outline-none focus:border-accent focus:ring-2 focus:ring-ring/30",
                      ].join(" ")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Hızlı anlam (satır satır)
                    </label>
                    <textarea
                      name="quickMeaning"
                      rows={6}
                      defaultValue={quickMeaning}
                      className={[
                        "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                        "outline-none focus:border-accent focus:ring-2 focus:ring-ring/30",
                      ].join(" ")}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-surface px-6 py-6">
                <label className="block text-sm font-medium text-foreground">Bölümler (JSON)</label>
                <textarea
                  name="sections"
                  rows={18}
                  defaultValue={sections}
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
