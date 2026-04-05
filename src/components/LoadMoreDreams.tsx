"use client";

import { useState } from "react";
import Link from "next/link";

type Item = {
  slug: string;
  title: string;
  excerpt: string;
  themes: string[];
};

export function LoadMoreDreams({
  items,
  pageSize = 12,
}: {
  items: Item[];
  pageSize?: number;
}) {
  const [visible, setVisible] = useState(pageSize);
  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface px-5 py-10 text-center text-sm text-muted">
        Sonuc bulunamadi.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((d) => {
          const rawTitle = String(d.title ?? "").trim();
          const isAlready = /^rüyada\s/i.test(rawTitle);
          const parts = rawTitle.split(/\s+/).filter(Boolean);
          const formatted = isAlready
            ? rawTitle
            : parts.length <= 1
              ? `Rüyada ${rawTitle} Görmek`
              : `Rüyada ${rawTitle}`;

          return (
            <Link
              key={d.slug}
              href={`/ruya/${d.slug}`}
              className="group rounded-2xl border border-border bg-surface/80 px-5 py-5 shadow-sm backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-surface2 hover:shadow-md"
            >
              <div className="text-base font-medium leading-snug text-foreground">{formatted}</div>
              <div className="mt-2 text-sm leading-6 text-muted">{d.excerpt || "Kisa aciklama yakinda."}</div>
              {d.themes?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.themes.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisible((v) => v + pageSize)}
            className="rounded-xl border border-border bg-surface px-8 py-3 text-sm font-medium text-muted transition-all hover:border-accent/60 hover:bg-surface2 hover:text-foreground active:scale-[0.98]"
          >
            Daha fazla goster ({items.length - visible} kaldi)
          </button>
        </div>
      )}
    </>
  );
}
