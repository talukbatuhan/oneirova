"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Variant = "hero" | "compact";
type Suggestion = { slug: string; title: string; excerpt: string; themes: string[] };

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

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
  const debouncedQuery = useDebouncedValue(query, 300);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!autoFocus) return;
    inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      abortRef.current?.abort();
      abortRef.current = null;
      setSuggestions([]);
      setLoading(false);
      setActiveIndex(-1);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}&limit=8`, { signal: ac.signal });
        if (!res.ok) return;
        const data = (await res.json()) as Suggestion[];
        if (!ac.signal.aborted) setSuggestions(Array.isArray(data) ? data : []);
      } catch {
        if (!ac.signal.aborted) setSuggestions([]);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [debouncedQuery]);

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
    router.push(`/ruya/${slug}`);
    setOpen(false);
    setActiveIndex(-1);
  }

  const hasQuery = query.trim().length > 0;
  const showDropdown = open && hasQuery;

  return (
    <div ref={rootRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToSearch(query);
        }}
        className={[
          "relative flex w-full items-center gap-3 border border-border bg-surface/80 px-4 py-3 shadow-sm backdrop-blur-sm",
          "focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/20",
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
        {loading ? <span className="text-xs text-muted">Aranıyor…</span> : null}
        <button
          type="submit"
          className={[
            "bg-foreground px-6 py-2 text-xs font-medium uppercase tracking-wider text-background shadow-sm",
            "transition-colors hover:bg-foreground/90",
            variant === "compact" ? "hidden sm:block" : "",
          ].join(" ")}
        >
          Ara
        </button>
      </form>

      {showDropdown ? (
        <div
          role="listbox"
          aria-label="Arama önerileri"
          className={[
            "absolute z-20 mt-1 w-full overflow-hidden border border-border",
            "bg-surface shadow-xl",
          ].join(" ")}
        >
          <div className="py-0">
            {suggestions.length > 0 ? (
              suggestions.map((s, idx) => {
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
                      "flex w-full items-center justify-between gap-4 border-b border-border px-4 py-3 text-left last:border-0",
                      active ? "bg-surface2" : "bg-transparent",
                      "transition-colors",
                    ].join(" ")}
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-foreground">{s.title}</div>
                      <div className="truncate text-xs text-muted">{s.excerpt}</div>
                    </div>
                    <div className="hidden shrink-0 text-xs text-muted sm:block">{s.themes.slice(0, 2).join(" · ")}</div>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-4 text-sm text-muted">
                {loading ? "Sonuçlar hazırlanıyor…" : "Eşleşen sonuç bulunamadı. Enter ile aramayı deneyin."}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
