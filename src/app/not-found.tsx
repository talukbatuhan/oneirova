import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-16">
        <Container>
          <div className="mx-auto max-w-[72ch]">
            <h1 className="text-3xl text-foreground">Sayfa bulunamadı</h1>
            <p className="mt-4 text-sm leading-6 text-muted">
              Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="rounded-full border border-border bg-surface px-5 py-3 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
              >
                Ana sayfaya dön
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
