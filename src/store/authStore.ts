import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

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
          // Get current session
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session?.user) {
            // Fetch user profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

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
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

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
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()

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
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          // Create profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              name,
              email: data.user.email,
            })

          if (profileError) {
            console.error('Error creating profile:', profileError)
          }

          set({
            supabaseUser: data.user,
            user: {
              id: data.user.id,
              email: data.user.email || '',
              name,
            },
          })
        }
      },
      logout: async () => {
        await supabase.auth.signOut()
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

