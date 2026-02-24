import Link from "next/link";
import { Container } from "./Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/70">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-sm font-medium tracking-wide text-foreground">Oneirova</div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Rüya tabirlerini sade bir deneyimle keşfedin. Arayın, gözatın, bağlantıları paylaşın.
            </p>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted">Keşfet</div>
            <div className="mt-3 grid gap-2 text-sm">
              <Link href="/search" className="text-muted transition-colors hover:text-foreground">
                Arama
              </Link>
              <Link href="/browse/a" className="text-muted transition-colors hover:text-foreground">
                A–Z
              </Link>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted">Popüler</div>
            <div className="mt-3 grid gap-2 text-sm">
              <Link href="/search?q=diş" className="text-muted transition-colors hover:text-foreground">
                Diş
              </Link>
              <Link href="/search?q=yılan" className="text-muted transition-colors hover:text-foreground">
                Yılan
              </Link>
              <Link href="/search?q=kovalanmak" className="text-muted transition-colors hover:text-foreground">
                Kovalanmak
              </Link>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted">İletişim</div>
            <div className="mt-3 grid gap-2 text-sm">
              <a
                href="mailto:hello@oneirova.com"
                className="text-muted transition-colors hover:text-foreground"
              >
                hello@oneirova.com
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                X
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted">
          <div>© {year} Oneirova</div>
          <div className="flex items-center gap-3">
            <Link href="/robots.txt" className="transition-colors hover:text-foreground">
              robots
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-foreground">
              sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

