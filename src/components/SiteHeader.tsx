"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/ruyalar", label: "Ruyalar", matchPaths: ["/ruyalar", "/ruya/"] },
  { href: "/astroloji", label: "Astroloji", matchPaths: ["/astroloji"] },
  { href: "/numeroloji", label: "Numeroloji", matchPaths: ["/numeroloji"] },
  { href: "/testler", label: "Testler", matchPaths: ["/testler"] },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [readProgress, setReadProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isReading = pathname.startsWith("/ruya/");

  const isActive = useCallback((matchPaths: readonly string[]) => {
    return matchPaths.some((path) => 
      path.endsWith("/") ? pathname.startsWith(path) : pathname === path || pathname.startsWith(path + "/")
    );
  }, [pathname]);

  // Track scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reading progress indicator
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
      setReadProgress(Math.max(0, Math.min(100, p)));
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header 
      className={`sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md transition-all duration-200 ${
        scrolled ? "border-border shadow-sm" : "border-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-3"
            aria-label="Oneirova Ana Sayfa"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl sm:h-14 sm:w-14">
              <img
                src="/brand/oneirova-mark.png"
                alt=""
                width={56}
                height={56}
                loading="eager"
                decoding="async"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Oneirova
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-widest text-muted sm:block">
                Ruyalar ve Astroloji
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Ana navigasyon">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.matchPaths);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active 
                      ? "text-foreground" 
                      : "text-muted hover:bg-surface2 hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-2 -bottom-3 h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent/40 hover:text-foreground md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Menuyu kapat" : "Menuyu ac"}
            >
              <span className="sr-only">{mobileMenuOpen ? "Menuyu kapat" : "Menu"}</span>
              <div className="flex h-4 w-5 flex-col items-center justify-center gap-1">
                <span 
                  className={`h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`} 
                />
                <span 
                  className={`h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`} 
                />
                <span 
                  className={`h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </Container>

      {/* Reading progress bar */}
      {isReading && (
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 left-0 h-0.5 w-full bg-border"
        >
          <div
            className="h-full bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${readProgress}%` }}
          />
        </div>
      )}

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[57px] z-50 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={`fixed left-0 right-0 top-[57px] z-50 transform border-b border-border bg-background shadow-xl transition-all duration-300 ease-out md:hidden ${
          mobileMenuOpen 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        aria-label="Mobil navigasyon"
      >
        <Container>
          <div className="py-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.matchPaths);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        active 
                          ? "bg-accent/10 text-accent" 
                          : "text-foreground hover:bg-surface2"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      {active && (
                        <span className="h-2 w-2 rounded-full bg-accent" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-border pt-4">
              <Link
                href="/search"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-muted transition-colors hover:bg-surface2 hover:text-foreground"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Ara
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
