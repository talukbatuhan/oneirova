import Link from "next/link";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-2xl border border-border bg-surface shadow-sm transition-colors group-hover:border-accent/60"
              >
                <span className="h-3 w-3 rounded-full bg-accent/70" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium tracking-wide text-foreground">Oneirova</span>
                <span className="hidden text-xs text-muted sm:block">Rüya sözlüğü</span>
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link
              href="/browse/a"
              className="inline-flex rounded-full px-3 py-2 transition-colors hover:bg-surface2 hover:text-foreground"
            >
              A–Z
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-2 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
            >
              Ara
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  );
}
