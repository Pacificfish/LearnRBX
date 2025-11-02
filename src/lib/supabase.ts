import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || ''

// Check if Supabase is configured (must be a valid URL starting with http)
const isValidUrl = supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://')
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && isValidUrl)

// Create client only if properly configured
let supabaseInstance: SupabaseClient

if (isSupabaseConfigured) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Use a valid URL format placeholder that won't crash
  // This allows the app to run but Supabase features won't work
  supabaseInstance = createClient(
    'https://placeholder.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU2NzEwNDAsImV4cCI6MTk2MTI0NzA0MH0.placeholder'
  )
  
  if (import.meta.env.DEV) {
    console.warn(
      '⚠️ Supabase environment variables are missing or invalid. Authentication and database features will not work.'
    )
    console.warn('   Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')
  }
}

export const supabase = supabaseInstance

