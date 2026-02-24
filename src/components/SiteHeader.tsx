import Link from "next/link";
import { Container } from "./Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="text-sm font-medium tracking-wide text-foreground">
            Oneirova
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link href="/browse/a" className="transition-colors hover:text-foreground">
              A–Z
            </Link>
            <Link href="/search" className="transition-colors hover:text-foreground">
              Ara
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
