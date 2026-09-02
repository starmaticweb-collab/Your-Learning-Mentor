import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.VITE_SUPABASE_URL || 
  "https://qvvhagyfzvhairnqpugs.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dmhhZ3lmenZoYWlybnFwdWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NTc1MzksImV4cCI6MjA4NzEzMzUzOX0.UipRk__e1ewZ1i7pvkQzi-JAw2gmUw7ic3L1mYTu3C4";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  }
});