"use client";

import { useEffect, useMemo, useState } from "react";

export function ShareMenu({ title }: { title: string }) {
  const [href, setHref] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  const links = useMemo(() => {
    if (!href) return [];
    const encodedUrl = encodeURIComponent(href);
    const encodedTitle = encodeURIComponent(title);
    return [
      {
        label: "X",
        href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      },
      {
        label: "Bağlantıyı kopyala",
        href: "",
      },
    ];
  }, [href, title]);

  async function copy() {
    if (!href) return;
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {links.map((l) =>
        l.label === "Bağlantıyı kopyala" ? (
          <button
            key={l.label}
            type="button"
            onClick={copy}
            className="rounded-full border border-border bg-surface px-4 py-2 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
          >
            {copied ? "Kopyalandı" : "Bağlantıyı kopyala"}
          </button>
        ) : (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-surface px-4 py-2 text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
          >
            {l.label}
          </a>
        ),
      )}
    </div>
  );
}
