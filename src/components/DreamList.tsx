import Link from "next/link";
import type { DreamEntry } from "@/lib/dreams";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export function DreamList({
  dreams,
  variant = "rows",
}: {
  dreams: DreamEntry[];
  variant?: "rows" | "cards";
}) {
  if (dreams.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface px-5 py-12 text-center">
        <p className="text-sm text-muted">Henuz sonuc yok.</p>
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {dreams.map((d) => (
          <Link
            key={d.slug}
            href={`/ruya/${d.slug}`}
            className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
                  {d.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                  {d.excerpt}
                </p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface2 text-muted transition-all group-hover:bg-accent group-hover:text-white">
                <ArrowIcon className="h-4 w-4" />
              </div>
            </div>
            {d.themes.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {d.themes.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <ul className="divide-y divide-border">
        {dreams.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/ruya/${d.slug}`}
              className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface2"
            >
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium text-foreground transition-colors group-hover:text-accent">
                  {d.title}
                </h3>
                <p className="mt-1 truncate text-sm text-muted">
                  {d.excerpt}
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
                {d.themes.slice(0, 2).map((t) => (
                  <span key={t} className="rounded-full bg-surface2 px-2 py-0.5 text-[10px] font-medium text-muted">
                    {t}
                  </span>
                ))}
              </div>
              <ArrowIcon className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
