import Link from "next/link";
import type { DreamEntry } from "@/lib/dreams";

export function DreamList({
  dreams,
  variant = "rows",
}: {
  dreams: DreamEntry[];
  variant?: "rows" | "cards";
}) {
  if (dreams.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface px-5 py-10 text-center text-sm text-muted">
        Henüz sonuç yok.
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {dreams.map((d) => (
          <Link
            key={d.slug}
            href={`/dream/${d.slug}`}
            className={[
              "group rounded-2xl border border-border bg-surface px-5 py-5 transition-colors",
              "hover:border-accent/60 hover:bg-surface2",
            ].join(" ")}
          >
            <div className="text-base font-medium text-foreground">{d.title}</div>
            <div className="mt-2 text-sm leading-6 text-muted">{d.excerpt}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {d.themes.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="divide-y divide-border">
        {dreams.map((d) => (
          <Link
            key={d.slug}
            href={`/dream/${d.slug}`}
            className={[
              "block px-5 py-4 transition-colors",
              "hover:bg-surface2",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">{d.title}</div>
                <div className="mt-1 truncate text-sm leading-6 text-muted">{d.excerpt}</div>
              </div>
              <div className="hidden shrink-0 text-xs text-muted sm:block">
                {d.themes.slice(0, 2).join(" · ")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
