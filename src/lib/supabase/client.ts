import { createClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl } from "./config";

export function createSupabaseBrowserClient() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey());
}

