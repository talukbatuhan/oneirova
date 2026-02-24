import { uploadToBucket } from "@/lib/supabase/storage";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/auth";

export async function POST(req: Request) {
  const jar = await cookies();
  if (jar.get(ADMIN_COOKIE_NAME)?.value !== "1") return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();
  const bucket = String(form.get("bucket") ?? "oneirova");
  const path = String(form.get("path") ?? "");
  const file = form.get("file");

  if (!path) return new Response("path required", { status: 400 });
  if (!(file instanceof File)) return new Response("file required", { status: 400 });

  const uploaded = await uploadToBucket({
    bucket,
    path,
    data: file,
    contentType: file.type || undefined,
    upsert: true,
  });

  return Response.json(uploaded);
}

