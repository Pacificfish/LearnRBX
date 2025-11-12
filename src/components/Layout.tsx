import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogOut, BookOpen, User } from 'lucide-react'
import Logo from './Logo'

export default function Layout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="group">
                <Logo size="md" className="group-hover:scale-105 transition-transform duration-300" />
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-roblox font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <BookOpen size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <User size={20} className="text-roblox" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary text-sm">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-primary text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-gray-400 mb-2">&copy; 2024 LearnRBX. Master Roblox Scripting.</p>
            <p className="text-gray-500 text-sm">Built with ❤️ for the Roblox developer community</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

