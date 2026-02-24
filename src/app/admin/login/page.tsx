import { Container } from "@/components/Container";
import { SiteHeader } from "@/components/SiteHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifyAdminPassword } from "@/lib/admin/auth";

async function loginAction(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!verifyAdminPassword(password)) {
    redirect(`/admin/login?next=${encodeURIComponent(next)}&err=${encodeURIComponent("Hatalı şifre.")}`);
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect(next);
}

type AdminLoginSearchParams = { [key: string]: string | string[] | undefined };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<AdminLoginSearchParams>;
}) {
  const sp = (await searchParams) ?? {};
  const next = typeof sp.next === "string" ? sp.next : "/admin";
  const err = typeof sp.err === "string" ? sp.err : "";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-24 pt-10">
        <Container>
          <div className="mx-auto max-w-md">
            <h1 className="text-2xl text-foreground">Admin girişi</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Oneirova CMS paneline giriş yapın.</p>

            <form action={loginAction} className="mt-6 rounded-2xl border border-border bg-surface px-6 py-6">
              <input type="hidden" name="next" value={next} />
              <label className="block text-sm font-medium text-foreground">Şifre</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className={[
                  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground",
                  "outline-none focus:border-accent focus:ring-2 focus:ring-ring/30",
                ].join(" ")}
              />
              {err ? <div className="mt-3 text-sm text-muted">{err}</div> : null}
              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Giriş yap
              </button>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}
