import { createClient, type SupabaseClient } from "@supabase/supabase-js"

export type FeedbackRow = {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

let client: SupabaseClient | null = null

/**
 * Browser-side Supabase client (anon key). Returns null when the env vars are
 * missing so the Feedback section can degrade gracefully instead of crashing.
 */
export function getSupabase(): SupabaseClient | null {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  client = createClient(url, key)
  return client
}
