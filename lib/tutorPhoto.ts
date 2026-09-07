import { supabase } from "@/integrations/supabase/client";

const BUCKET = "tutor-photos";
// 1 year — Supabase signed URL max. Re-mint via the upload flow on replacement.
const SIGNED_URL_TTL = 60 * 60 * 24 * 365;

/**
 * Upload a tutor photo and return a long-lived (1-year) signed URL ready
 * to persist in `tutors.photo_url`. Components can then render it directly
 * with `<img src={photo_url} />` — no runtime resolution, no extra round-trips.
 */
export async function uploadTutorPhoto(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type,
    });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (signErr || !data?.signedUrl) throw signErr ?? new Error("Failed to sign URL");
  return data.signedUrl;
}

export function resolveTutorPhotoUrl(url?: string | null): string | null {
  if (!url) return null;
  const currentUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jzgxtchblpvfwgtcfnmf.supabase.co";
  const projectRef = currentUrl.replace(/^https?:\/\//, "").split(".")[0];

  let clean = url
    .replace(/YOUR_NEW_PROJECT_REF/gi, projectRef)
    .replace(/qvvhagyfzvhairnqpugs/gi, projectRef);

  // Convert signed URLs with old/invalid tokens to clean public URLs
  if (clean.includes("/storage/v1/object/sign/")) {
    clean = clean.replace("/storage/v1/object/sign/", "/storage/v1/object/public/");
    clean = clean.split("?")[0];
  }

  return clean;
}


