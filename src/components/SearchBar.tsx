"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Variant = "hero" | "compact";
type Suggestion = { slug: string; title: string; excerpt: string; themes: string[] };

export function SearchBar({
  variant = "hero",
  initialQuery = "",
  autoFocus = false,
}: {
  variant?: Variant;
  initialQuery?: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!autoFocus) return;
    inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      abortRef.current?.abort();
      abortRef.current = null;
      setSuggestions([]);
      return;
    }

    const t = window.setTimeout(async () => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}&limit=7`, { signal: ac.signal });
        if (!res.ok) return;
        const data = (await res.json()) as Suggestion[];
        setSuggestions(Array.isArray(data) ? data : []);
      } catch {
        if (!ac.signal.aborted) setSuggestions([]);
      }
    }, 140);

    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function goToSearch(nextQuery: string) {
    const q = nextQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
    setActiveIndex(-1);
  }

  function goToDream(slug: string) {
    router.push(`/dream/${slug}`);
    setOpen(false);
    setActiveIndex(-1);
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToSearch(query);
        }}
        className={[
          "relative flex w-full items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3",
          "focus-within:border-accent focus-within:ring-2 focus-within:ring-ring/30",
          variant === "hero" ? "sm:px-5 sm:py-4" : "px-4 py-3",
        ].join(" ")}
      >
        <span className="select-none text-muted">⌕</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open && e.key === "ArrowDown") {
              setOpen(true);
              return;
            }

            if (!open) return;

            if (e.key === "Escape") {
              setOpen(false);
              setActiveIndex(-1);
              return;
            }

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
              return;
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, -1));
              return;
            }

            if (e.key === "Enter" && activeIndex >= 0) {
              e.preventDefault();
              const s = suggestions[activeIndex];
              if (s) goToDream(s.slug);
            }
          }}
          placeholder="Bir sembol, duygu veya senaryo ara"
          className={[
            "w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted",
            variant === "hero" ? "text-[15px] sm:text-base" : "text-sm",
          ].join(" ")}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className={[
            "rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background",
            "transition-colors hover:bg-foreground/90",
            variant === "compact" ? "hidden sm:block" : "",
          ].join(" ")}
        >
          Ara
        </button>
      </form>

      {open && suggestions.length > 0 ? (
        <div
          role="listbox"
          aria-label="Arama önerileri"
          className={[
            "absolute z-20 mt-3 w-full overflow-hidden rounded-2xl border border-border",
            "bg-surface/80 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)]",
          ].join(" ")}
        >
          <div className="py-2">
            {suggestions.map((s, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={s.slug}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToDream(s.slug)}
                  className={[
                    "flex w-full items-center justify-between gap-4 px-4 py-3 text-left",
                    active ? "bg-foreground/5" : "bg-transparent",
                    "transition-colors",
                  ].join(" ")}
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-foreground">{s.title}</div>
                    <div className="truncate text-xs text-muted">{s.excerpt}</div>
                  </div>
                  <div className="hidden shrink-0 text-xs text-muted sm:block">
                    {s.themes.slice(0, 2).join(" · ")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
