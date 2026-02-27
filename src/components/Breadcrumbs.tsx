import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const visible = items.filter((x) => x.label.trim());
  if (visible.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {visible.map((item, idx) => {
          const isLast = idx === visible.length - 1;
          const content = item.href && !isLast ? (
            <Link href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className={isLast ? "text-foreground" : ""}>{item.label}</span>
          );

          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-2">
              {content}
              {!isLast ? <span aria-hidden="true">›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
