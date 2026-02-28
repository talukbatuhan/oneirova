"use client";

import { useEffect, useState } from "react";

export function DreamReadCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const key = `read:${slug}`;

    async function run() {
      try {
        const has = typeof window !== "undefined" ? window.sessionStorage.getItem(key) : "1";
        const res = await fetch(`/api/dreams/${encodeURIComponent(slug)}/read`, {
          method: has ? "GET" : "POST",
          headers: has ? undefined : { "content-type": "application/json" },
        });
        const json = (await res.json()) as { count?: number | null };
        if (!cancelled) setCount(typeof json.count === "number" ? json.count : null);
        if (!has && typeof window !== "undefined") window.sessionStorage.setItem(key, "1");
      } catch {
        if (!cancelled) setCount(null);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const text = count == null ? "Okunma: …" : `Okunma: ${count.toLocaleString("tr-TR")}`;

  return (
    <span className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-xs text-muted">
      {text}
    </span>
  );
}