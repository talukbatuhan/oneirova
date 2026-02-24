import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteHeader } from "@/components/SiteHeader";
import { saveDreamAction } from "@/app/admin/actions";

const emptySections = JSON.stringify(
  [
    { title: "Yaygın Yorumlar", body: [""] },
    { title: "Detaylara Göre", body: [""] },
    { title: "Düşünmek İçin Sorular", body: [""] },
  ],
  null,
  2,
);

export default function NewDreamPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-10">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl text-foreground">Yeni içerik</h1>
                <p className="mt-2 text-sm text-muted">Rüya içeriği oluşturun.</p>
              </div>
              <Link href="/admin" className="text-sm text-muted transition-colors hover:text-foreground">
                Geri
              </Link>
            </div>

            <form action={saveDreamAction} className="mt-6 space-y-6">
              <section className="rounded-2xl border border-border bg-surface px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground">Slug</label>
                    <input
                      name="slug"
                      placeholder="ruyada-yilan-gormek"
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
                      placeholder="Rüyada Yılan Görmek"
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
                  defaultValue={emptySections}
                  className={[
                    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs text-foreground",
                    "outline-none focus:border-accent focus:ring-2 focus:ring-ring/30",
                  ].join(" ")}
                />
              </section>

              <div className="flex items-center justify-end gap-3">
                <Link
                  href="/admin"
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  className="rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}

