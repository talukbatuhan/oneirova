import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export default function SearchLoading() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch] animate-pulse space-y-6">
          <div className="h-8 w-40 rounded-lg bg-surface2" />
          <div className="h-14 w-full rounded-xl bg-surface2" />
          <div className="h-32 rounded-xl bg-surface2" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-lg bg-surface2" />
            ))}
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
