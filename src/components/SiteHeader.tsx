"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();

  const isDreams = pathname === "/ruyalar" || pathname.startsWith("/ruya/");
  const isAstroloji = pathname.startsWith("/astroloji");
  const isNumeroloji = pathname.startsWith("/numeroloji");
  const isTestler = pathname.startsWith("/testler");
  const isYks = pathname.startsWith("/yks-rehberi");

  const pill = (active: boolean) =>
    [
      "rounded-full px-3 py-2 transition-colors hover:bg-surface2 hover:text-foreground",
      active ? "bg-surface2 text-foreground" : "",
    ].join(" ");

  const menuItem = (active: boolean) =>
    [
      "rounded-xl px-3 py-2 transition-colors hover:bg-surface2 hover:text-foreground",
      active ? "bg-surface2 text-foreground" : "text-muted",
    ].join(" ");

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="group inline-flex items-center gap-3">
              <img
                src="/brand/oneirova-mark.png"
                alt="Oneirova"
                width={44}
                height={44}
                loading="eager"
                decoding="async"
                className="h-22 w-22 object-contain transition-transform group-hover:scale-[1.03]"
              />
              <span className="leading-tight">
                <span className="block text-sm font-medium tracking-wide text-foreground">Oneirova</span>
                <span className="hidden text-xs text-muted sm:block">Rüyalar · Astroloji · Numeroloji · Testler · YKS</span>
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-1 text-sm text-muted">
            <details className="relative sm:hidden">
              <summary className="inline-flex cursor-pointer list-none items-center rounded-full border border-border bg-surface px-3 py-2 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Menü
              </summary>
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="grid gap-1 p-2 text-sm">
                  <Link href="/ruyalar" className={menuItem(isDreams)}>
                    Rüya Tabirleri
                  </Link>
                  <Link href="/astroloji" className={menuItem(isAstroloji)}>
                    Astroloji
                  </Link>
                  <Link href="/numeroloji" className={menuItem(isNumeroloji)}>
                    Numeroloji
                  </Link>
                  <Link href="/testler" className={menuItem(isTestler)}>
                    Testler
                  </Link>
                  <Link href="/yks-rehberi" className={menuItem(isYks)}>
                    YKS Rehberi
                  </Link>
                </div>
              </div>
            </details>

            <Link href="/ruyalar" className={["hidden sm:inline-flex", pill(isDreams)].join(" ")}>
              Rüyalar
            </Link>
            <Link href="/astroloji" className={["hidden md:inline-flex", pill(isAstroloji)].join(" ")}>
              Astroloji
            </Link>
            <Link href="/numeroloji" className={["hidden md:inline-flex", pill(isNumeroloji)].join(" ")}>
              Numeroloji
            </Link>
            <Link href="/testler" className={["hidden lg:inline-flex", pill(isTestler)].join(" ")}>
              Testler
            </Link>
            <Link href="/yks-rehberi" className={["hidden lg:inline-flex", pill(isYks)].join(" ")}>
              YKS
            </Link>

            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  );
}
