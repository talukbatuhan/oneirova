"use client";

import { useEffect, useMemo, useState } from "react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ShareMenu({ title }: { title: string }) {
  const [href, setHref] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  const xShareUrl = useMemo(() => {
    if (!href) return "";
    const encodedUrl = encodeURIComponent(href);
    const encodedTitle = encodeURIComponent(title);
    return `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  }, [href, title]);

  async function copy() {
    if (!href) return;
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted">Paylas:</span>
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-all hover:border-accent/40 hover:text-foreground"
        aria-label="X'te paylas"
      >
        <XIcon className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copy}
        className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-all ${
          copied 
            ? "border-accent2/40 bg-accent2/10 text-accent2" 
            : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground"
        }`}
        aria-label={copied ? "Kopyalandi" : "Baglantıyı kopyala"}
      >
        {copied ? (
          <>
            <CheckIcon className="h-4 w-4" />
            Kopyalandi
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4" />
            Kopyala
          </>
        )}
      </button>
    </div>
  );
}
