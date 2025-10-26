// Client-side Supabase client (use in Client Components)
export { createClient as createBrowserClient } from './client';

// Server-side Supabase client (use in Server Components, Server Actions)
// Server client는 직접 import 해야 합니다: import { createClient } from '@/lib/supabase/server'
