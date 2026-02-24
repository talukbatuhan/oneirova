import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({
  children,
  mainClassName = "pb-24 pt-12",
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 top-[-120px] h-[520px]",
          "bg-[radial-gradient(700px_circle_at_20%_20%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_58%),radial-gradient(680px_circle_at_80%_10%,color-mix(in_oklab,var(--accent2)_18%,transparent),transparent_60%)]",
          "opacity-70 blur-2xl",
        ].join(" ")}
      />
      <SiteHeader />
      <main className={mainClassName}>{children}</main>
      <SiteFooter />
    </div>
  );
}

