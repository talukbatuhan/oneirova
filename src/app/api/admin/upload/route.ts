import { isAdminSession } from "@/lib/admin/auth";
import {
  ADMIN_UPLOAD_BUCKET,
  sanitizeUploadPath,
  validateAdminImageUpload,
} from "@/lib/admin/uploadValidate";
import { uploadToBucket } from "@/lib/supabase/storage";

export async function POST(req: Request) {
  if (!(await isAdminSession())) {
    return Response.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const form = await req.formData();
  const pathRaw = String(form.get("path") ?? "");
  const file = form.get("file");

  const path = sanitizeUploadPath(pathRaw);
  if (!path) {
    return Response.json(
      { error: "Geçersiz veya eksik path (yalnızca güvenli karakterler ve / ile klasör)." },
      { status: 400 },
    );
  }

  if (!(file instanceof File)) {
    return Response.json({ error: "Dosya gerekli." }, { status: 400 });
  }

  const validated = await validateAdminImageUpload(file);
  if (!validated.ok) {
    return Response.json({ error: validated.error }, { status: 400 });
  }

  try {
    const uploaded = await uploadToBucket({
      bucket: ADMIN_UPLOAD_BUCKET,
      path,
      data: validated.buffer,
      contentType: validated.contentType,
      upsert: true,
    });
    return Response.json(uploaded);
  } catch (e) {
    console.error("admin upload:", e);
    return Response.json({ error: "Yükleme başarısız." }, { status: 500 });
  }
}
