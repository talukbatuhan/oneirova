import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteHeader } from "@/components/SiteHeader";
import { saveDreamAction } from "@/app/admin/actions";

const emptyPayload = "";

type AdminNewDreamSearchParams = { [key: string]: string | string[] | undefined };

export default async function NewDreamPage({
  searchParams,
}: {
  searchParams?: Promise<AdminNewDreamSearchParams>;
}) {
  const sp = (await searchParams) ?? {};
  const err = typeof sp.err === "string" ? sp.err : "";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-10">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl text-foreground">Yeni içerik</h1>
                <p className="mt-2 text-sm text-muted">JSON yapıştırın ve kaydedin.</p>
              </div>
              <Link href="/admin" className="text-sm text-muted transition-colors hover:text-foreground">
                Geri
              </Link>
            </div>

            {err ? <div className="mt-4 text-sm text-muted">{err}</div> : null}

            <form action={saveDreamAction} className="mt-6 space-y-6">
              <input type="hidden" name="returnTo" value="/admin/dreams/new" />

              <section className="rounded-2xl border border-border bg-surface px-6 py-6">
                <label className="block text-sm font-medium text-foreground">JSON (tam içerik)</label>
                <textarea
                  name="payload"
                  rows={28}
                  defaultValue={emptyPayload}
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