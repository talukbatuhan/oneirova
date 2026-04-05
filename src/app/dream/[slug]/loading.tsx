import { Container } from "@/components/Container";
import { SiteShell } from "@/components/SiteShell";

export default function DreamLoading() {
  return (
    <SiteShell mainClassName="pb-24 pt-10">
      <Container>
        <div className="mx-auto max-w-[72ch] animate-pulse space-y-6">
          <div className="h-4 w-48 rounded bg-surface2" />
          <div className="h-12 w-full max-w-xl rounded-lg bg-surface2" />
          <div className="h-24 w-full rounded-lg bg-surface2" />
          <div className="aspect-[16/9] w-full rounded-2xl bg-surface2" />
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full rounded bg-surface2" />
            <div className="h-4 w-full rounded bg-surface2" />
            <div className="h-4 w-5/6 rounded bg-surface2" />
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
