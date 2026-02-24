import { createSupabaseAdminClient } from "./admin";

export type UploadResult = {
  path: string;
  fullPath: string;
};

export async function uploadToBucket(params: {
  bucket: string;
  path: string;
  data: ArrayBuffer | Blob;
  contentType?: string;
  upsert?: boolean;
}): Promise<UploadResult> {
  const supabase = createSupabaseAdminClient();
  const { bucket, path, data, contentType, upsert } = params;

  const { data: uploaded, error } = await supabase.storage.from(bucket).upload(path, data, {
    upsert: upsert ?? false,
    contentType,
  });
  if (error) throw error;
  if (!uploaded) throw new Error("Upload başarısız.");
  return { path: uploaded.path, fullPath: uploaded.fullPath };
}

export function getPublicUrl(params: { bucket: string; path: string }): string {
  const supabase = createSupabaseAdminClient();
  const { data } = supabase.storage.from(params.bucket).getPublicUrl(params.path);
  return data.publicUrl;
}

