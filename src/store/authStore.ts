import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

// Error class for when Supabase is not configured
export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
    this.name = 'SupabaseNotConfiguredError'
  }
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthState {
  user: User | null
  supabaseUser: SupabaseUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      supabaseUser: null,
      loading: true,
      initialize: async () => {
        try {
          // Check if Supabase is configured
          if (!isSupabaseConfigured) {
            console.warn('Supabase not configured. Running in demo mode.')
            set({ loading: false })
            return
          }

          // Get current session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession()
          
          if (sessionError) {
            console.error('Error getting session:', sessionError)
            set({ loading: false })
            return
          }
          
          if (session?.user) {
            // Fetch user profile (may not exist yet, that's ok)
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            // Profile not found is fine (will be created on first action)
            if (profileError && profileError.code !== 'PGRST116') {
              // Only log non-"not found" errors
              if (profileError.code !== 'PGRST301') {
                console.warn('Profile fetch warning:', profileError.message)
              }
            }

            set({
              supabaseUser: session.user,
              user: profile ? {
                id: profile.id,
                email: session.user.email || '',
                name: profile.name || session.user.email?.split('@')[0] || 'User',
                avatar: profile.avatar_url,
              } : {
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.email?.split('@')[0] || 'User',
              },
              loading: false,
            })
          } else {
            set({ user: null, supabaseUser: null, loading: false })
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

              // Silently handle profile not found
              if (profileError && profileError.code !== 'PGRST116' && profileError.code !== 'PGRST301') {
                console.warn('Profile fetch warning:', profileError.message)
              }

              set({
                supabaseUser: session.user,
                user: profile ? {
                  id: profile.id,
                  email: session.user.email || '',
                  name: profile.name || session.user.email?.split('@')[0] || 'User',
                  avatar: profile.avatar_url,
                } : {
                  id: session.user.id,
                  email: session.user.email || '',
                  name: session.user.email?.split('@')[0] || 'User',
                },
              })
            } else if (event === 'SIGNED_OUT') {
              set({ user: null, supabaseUser: null })
            }
          })
        } catch (error) {
          console.error('Error initializing auth:', error)
          set({ loading: false })
        }
      },
      login: async (email: string, password: string) => {
        if (!isSupabaseConfigured) {
          throw new SupabaseNotConfiguredError()
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          // Fetch user profile (may not exist yet)
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()

          // Profile not found is fine
          if (profileError && profileError.code !== 'PGRST116' && profileError.code !== 'PGRST301') {
            console.warn('Profile fetch warning:', profileError.message)
          }

          set({
            supabaseUser: data.user,
            user: profile ? {
              id: profile.id,
              email: data.user.email || '',
              name: profile.name || data.user.email?.split('@')[0] || 'User',
              avatar: profile.avatar_url,
            } : {
              id: data.user.id,
              email: data.user.email || '',
              name: data.user.email?.split('@')[0] || 'User',
            },
          })
        }
      },
      signup: async (email: string, password: string, name: string) => {
        if (!isSupabaseConfigured) {
          throw new SupabaseNotConfiguredError()
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          // Create or update profile (upsert handles both insert and update)
          // The trigger might have already created a profile, so upsert handles that gracefully
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              name,
              email: data.user.email,
            }, {
              onConflict: 'id',
            })

          // Only log errors that aren't conflicts (409/23505 = duplicate, which is expected if trigger ran)
          if (profileError && profileError.code !== '23505' && profileError.code !== 'PGRST116') {
            // PGRST116 is "duplicate key" in PostgREST, also expected
            console.warn('Profile creation warning (may already exist):', profileError.message)
          }

          // Fetch the profile to get the latest data
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()

          set({
            supabaseUser: data.user,
            user: {
              id: data.user.id,
              email: data.user.email || '',
              name: profile?.name || name,
            },
          })
        }
      },
      logout: async () => {
        if (isSupabaseConfigured) {
          await supabase.auth.signOut()
        }
        set({ user: null, supabaseUser: null })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }), // Only persist user, not supabaseUser
    }
  )
)

