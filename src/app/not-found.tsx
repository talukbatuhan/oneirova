import Link from "next/link";
import { Container } from "@/components/Container";
import { DreamList } from "@/components/DreamList";
import { SearchBar } from "@/components/SearchBar";
import { SiteShell } from "@/components/SiteShell";
import { getTrendingDreams } from "@/lib/dreams";

export default async function NotFound() {
  const trending = await getTrendingDreams(6);

  return (
    <SiteShell mainClassName="pb-24 pt-12">
      <Container>
        <div className="mx-auto max-w-[72ch]">
          <h1 className="text-balance text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Sayfa bulunamadı
          </h1>
          <p className="mt-4 text-pretty text-base leading-7 text-muted sm:text-[17px] sm:leading-8">
            Aradığınız sayfa taşınmış veya kaldırılmış olabilir. İsterseniz arama yaparak doğru içeriğe hızlıca ulaşın.
          </p>

          <div className="mt-8">
            <SearchBar variant="hero" autoFocus />
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted">
            {["diş", "kovalanmak", "su", "sınav", "yılan", "ev"].map((q) => (
              <Link
                key={q}
                href={`/search?q=${encodeURIComponent(q)}`}
                className="rounded-full border border-border bg-surface px-4 py-2 transition-colors hover:border-accent/60 hover:bg-surface2 hover:text-foreground"
              >
                {q}
              </Link>
            ))}
          </div>

          <section className="mt-14">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-lg text-foreground">En çok arananlar</h2>
              <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
                Ana sayfa
              </Link>
            </div>
            <div className="mt-4">
              <DreamList dreams={trending} variant="cards" />
            </div>
          </section>
        </div>
      </Container>
    </SiteShell>
  );
}
