import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function isValidSlug(slug: string) {
  return /^[a-z0-9-]{1,120}$/.test(slug);
}

async function getCount(supabase: ReturnType<typeof createSupabaseAdminClient>, slug: string) {
  const { count, error } = await supabase
    .from("dream_reads")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);

  if (error) throw error;
  return typeof count === "number" ? count : 0;
}

export async function GET(_: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await ctx.params;
  const slug = String(raw ?? "");
  if (!isValidSlug(slug)) return new Response("Bad Request", { status: 400 });

  try {
    const supabase = createSupabaseAdminClient();
    const count = await getCount(supabase, slug);
    return Response.json({ count });
  } catch {
    return Response.json({ count: null }, { status: 200 });
  }
}

export async function POST(_: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await ctx.params;
  const slug = String(raw ?? "");
  if (!isValidSlug(slug)) return new Response("Bad Request", { status: 400 });

  try {
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.from("dream_reads").insert({ slug });
    if (error) throw error;

    const count = await getCount(supabase, slug);
    return Response.json({ count });
  } catch {
    return Response.json({ count: null }, { status: 200 });
  }
}