import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)!;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  }
});

// Sync auth state to a cookie so Next.js middleware can verify admin sessions
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((_event, session) => {
    const projectRef = SUPABASE_URL?.replace(/^https?:\/\//, '').split('.')[0] || 'supabase';
    const cookieName = `sb-${projectRef}-auth-token`;
    if (session) {
      const maxAge = 60 * 60 * 24 * 7; // 7 days
      document.cookie = `${cookieName}=${encodeURIComponent(session.access_token)}; path=/; max-age=${maxAge}; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
    } else {
      document.cookie = `${cookieName}=; path=/; max-age=0; SameSite=Lax;`;
    }
  });
}