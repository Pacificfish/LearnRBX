import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { isSupabaseConfigured } from '../lib/supabase'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const signup = useAuthStore((state) => state.signup)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      await signup(email, password, name)
      navigate('/dashboard')
    } catch (err: any) {
      let errorMessage = err?.message || 'Failed to create account. Please try again.'
      
      // Check if it's a network error (Supabase not configured)
      if (err?.message?.includes('Failed to fetch') || err?.message?.includes('Supabase is not configured')) {
        errorMessage = 'Supabase is not configured. Please set up your Supabase credentials in the .env file. See SETUP.md for instructions.'
      }
      
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-roblox hover:text-roblox-dark">
              sign in to your existing account
            </Link>
          </p>
        </div>
        {!isSupabaseConfigured && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
            <p className="font-medium">⚠️ Supabase Not Configured</p>
            <p className="text-sm mt-1">
              Authentication requires Supabase setup. See <code className="bg-yellow-100 px-1 rounded">SETUP.md</code> for instructions.
            </p>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-roblox focus:border-roblox"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-roblox focus:border-roblox"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-roblox focus:border-roblox"
                placeholder="••••••••"
              />
              <p className="mt-1 text-sm text-gray-500">Must be at least 6 characters</p>
            </div>
          </div>

          <div>
            <button type="submit" className="btn-primary w-full">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

