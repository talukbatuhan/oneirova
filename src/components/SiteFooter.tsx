import Link from "next/link";
import { Container } from "./Container";

const FOOTER_LINKS = {
  explore: [
    { href: "/", label: "Ana sayfa" },
    { href: "/ruyalar", label: "Ruyalar" },
    { href: "/astroloji", label: "Astroloji" },
    { href: "/numeroloji", label: "Numeroloji" },
    { href: "/testler", label: "Testler" },
    { href: "/search", label: "Arama" },
    { href: "/browse/a", label: "A-Z" },
  ],
  popular: [
    { href: "/search?q=dis", label: "Dis ruyasi" },
    { href: "/search?q=yilan", label: "Yilan ruyasi" },
    { href: "/search?q=su", label: "Su ruyasi" },
    { href: "/search?q=ucmak", label: "Ucmak" },
    { href: "/search?q=kovalanmak", label: "Kovalanmak" },
  ],
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50" role="contentinfo">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="h-10 w-10 overflow-hidden rounded-xl">
                <img
                  src="/brand/oneirova-mark.png"
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="font-serif text-lg font-semibold text-foreground">Oneirova</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Ruyalar, astroloji, numeroloji ve kisilik testleriyle kendini kesfet. Sade, hizli, keyifli.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Kesfet</h3>
            <nav className="mt-4" aria-label="Kesfet linkleri">
              <ul className="space-y-3">
                {FOOTER_LINKS.explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Popular */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Populer</h3>
            <nav className="mt-4" aria-label="Populer aramalar">
              <ul className="space-y-3">
                {FOOTER_LINKS.popular.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Iletisim</h3>
            <div className="mt-4 space-y-3">
              <a
                href="mailto:hello@oneirova.com"
                className="flex items-center gap-2 rounded-sm text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@oneirova.com
              </a>
              <a
                href="https://x.com/oneirova"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-sm text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @oneirova
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-muted sm:flex-row">
          <p>&copy; {year} Oneirova. Tum haklari saklidir.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/robots.txt"
              className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              robots.txt
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/sitemap.xml"
              className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              sitemap.xml
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
