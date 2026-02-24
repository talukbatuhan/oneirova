import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteHeader } from "@/components/SiteHeader";
import { cmsListDreams } from "@/lib/cms/dreams";

type AdminSearchParams = { [key: string]: string | string[] | undefined };

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams?: Promise<AdminSearchParams>;
}) {
  const sp = (await searchParams) ?? {};
  const err = typeof sp.err === "string" ? sp.err : "";
  const dreams = await cmsListDreams();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-10">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl text-foreground">Oneirova CMS</h1>
                <p className="mt-2 text-sm text-muted">
                  <span className="text-foreground">{dreams.length}</span> içerik
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/dreams/new"
                  className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Yeni içerik
                </Link>
                <form action="/admin/logout" method="post">
                  <button
                    type="submit"
                    className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                  >
                    Çıkış
                  </button>
                </form>
              </div>
            </div>

            {err ? <div className="mt-4 text-sm text-muted">{err}</div> : null}

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="grid grid-cols-12 gap-4 border-b border-border px-5 py-3 text-xs text-muted">
                <div className="col-span-4">Başlık</div>
                <div className="col-span-4">Slug</div>
                <div className="col-span-2">Durum</div>
                <div className="col-span-2 text-right">Güncelleme</div>
              </div>
              <div className="divide-y divide-border">
                {dreams.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/admin/dreams/${encodeURIComponent(d.slug)}`}
                    className="grid grid-cols-12 gap-4 px-5 py-4 transition-colors hover:bg-surface2"
                  >
                    <div className="col-span-4 truncate text-sm font-medium text-foreground">{d.title}</div>
                    <div className="col-span-4 truncate text-sm text-muted">{d.slug}</div>
                    <div className="col-span-2 truncate text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "inline-flex rounded-full border px-3 py-1 text-xs",
                            d.status === "published"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                              : "border-border bg-background/40 text-muted",
                          ].join(" ")}
                        >
                          {d.status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-muted">
                        {d.status === "published" && d.publishedAt
                          ? new Date(d.publishedAt).toLocaleDateString("tr-TR")
                          : "—"}
                      </div>
                    </div>
                    <div className="col-span-2 truncate text-right text-sm text-muted">
                      {d.updatedAt ? new Date(d.updatedAt).toLocaleString("tr-TR") : ""}
                    </div>
                  </Link>
                ))}
                {dreams.length === 0 ? (
                  <div className="px-5 py-10 text-sm text-muted">Henüz içerik yok.</div>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

