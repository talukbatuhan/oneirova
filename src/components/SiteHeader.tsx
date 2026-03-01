"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [readProgress, setReadProgress] = useState(0);

  const isReading = pathname.startsWith("/ruya/");

  useEffect(() => {
    if (!isReading) {
      setReadProgress(0);
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      const clamped = Math.max(0, Math.min(100, p));
      setReadProgress(clamped);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isReading]);

  const isDreams = pathname === "/ruyalar" || pathname.startsWith("/ruya/");
  const isAstroloji = pathname.startsWith("/astroloji");
  const isNumeroloji = pathname.startsWith("/numeroloji");
  const isTestler = pathname.startsWith("/testler");

  const pill = (active: boolean) =>
    [
      "px-4 py-2 text-sm leading-none transition-colors border border-transparent hover:border-border hover:bg-surface2",
      active ? "bg-surface2 text-foreground border-border" : "text-muted hover:text-foreground",
    ].join(" ");

  const menuItem = (active: boolean) =>
    [
      "px-4 py-3 text-sm transition-colors hover:bg-surface2 hover:text-foreground border-b border-border last:border-0",
      active ? "bg-surface2 text-foreground" : "text-muted",
    ].join(" ");


  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex flex-nowrap items-center justify-between gap-4 py-0">
          <div className="min-w-0">
            <Link href="/" className="group inline-flex items-center gap-3 sm:gap-4">
              <img
                src="/brand/oneirova-mark.png"
                alt="Oneirova"
                width={64}
                height={64}
                loading="eager"
                decoding="async"
                className="block h-18 w-18 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[75px] sm:w-[90px]"
              />
              <span className="leading-tight">
                <span className="block font-serif text-xl font-medium tracking-tight text-foreground sm:text-2xl">Oneirova</span>
                <span className="hidden text-xs font-medium uppercase tracking-widest text-muted sm:block">Rüyalar · Astroloji · Numeroloji</span>
              </span>
            </Link>
          </div>

          <nav className="flex shrink-0 items-center gap-2 text-sm text-muted">
            <details className="relative sm:hidden">
              <summary className="inline-flex cursor-pointer list-none items-center border border-border bg-surface px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:border-accent/60 hover:text-foreground">
                Menü
              </summary>
              <div className="absolute right-0 mt-2 w-56 overflow-hidden border border-border bg-surface shadow-xl">
                <div className="flex flex-col text-sm">
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

            <ThemeToggle />
          </nav>
        </div>
      </Container>
      {isReading ? (
        <div aria-hidden="true" className="h-px w-full bg-border">
          <div
            className="h-px bg-foreground transition-[width] duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>
      ) : null}
    </header>
  );
}
