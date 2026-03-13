import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

function ChevronIcon() {
  return (
    <svg className="h-4 w-4 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const visible = items.filter((x) => x.label.trim());
  if (visible.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {visible.map((item, idx) => {
          const isLast = idx === visible.length - 1;
          
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link 
                  href={item.href} 
                  className="text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-foreground" : "text-muted"}>
                  {isLast && item.label.length > 40 ? item.label.slice(0, 40) + "..." : item.label}
                </span>
              )}
              {!isLast && <ChevronIcon />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
