import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Create client even if env vars are missing (will fail gracefully when used)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Log warning in console if env vars are missing (for debugging)
if (import.meta.env.DEV && !isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase environment variables are missing. Authentication and database features will not work.'
  )
}

