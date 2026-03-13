"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
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
        role="search"
        className={`relative flex w-full items-center gap-3 rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 ${
          open && hasQuery ? "rounded-b-none border-b-transparent" : ""
        } focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 ${
          variant === "hero" ? "px-5 py-4" : "px-4 py-3"
        }`}
      >
        <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
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
          placeholder="Bir sembol, duygu veya senaryo ara..."
          aria-label="Ruya ara"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={showDropdown}
          className={`w-full bg-transparent text-foreground outline-none placeholder:text-muted/70 ${
            variant === "hero" ? "text-base" : "text-sm"
          }`}
          autoComplete="off"
          spellCheck={false}
        />
        {loading && <LoadingSpinner className="h-5 w-5 text-accent" />}
        <button
          type="submit"
          className={`shrink-0 rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md active:scale-95 ${
            variant === "compact" ? "hidden sm:block" : ""
          }`}
        >
          Ara
        </button>
      </form>

      {showDropdown && (
        <div
          id="search-suggestions"
          role="listbox"
          aria-label="Arama onerileri"
          className="absolute z-50 w-full overflow-hidden rounded-b-xl border border-t-0 border-border bg-surface shadow-xl"
        >
          {suggestions.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {suggestions.map((s, idx) => {
                const active = idx === activeIndex;
                return (
                  <li key={s.slug}>
                    <button
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => goToDream(s.slug)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                        active ? "bg-accent/5" : "hover:bg-surface2"
                      }`}
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <SearchIcon className="h-4 w-4 text-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-foreground">{s.title}</div>
                        <div className="mt-0.5 truncate text-sm text-muted">{s.excerpt}</div>
                        {s.themes.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {s.themes.slice(0, 3).map((theme) => (
                              <span 
                                key={theme} 
                                className="rounded-full bg-surface2 px-2 py-0.5 text-[10px] font-medium text-muted"
                              >
                                {theme}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              {loading ? (
                <div className="flex items-center justify-center gap-2 text-sm text-muted">
                  <LoadingSpinner className="h-4 w-4" />
                  Sonuclar hazirlaniyor...
                </div>
              ) : (
                <div className="text-sm text-muted">
                  <p>Eslesen sonuc bulunamadi.</p>
                  <p className="mt-1 text-xs">Enter ile aramayi deneyin.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
