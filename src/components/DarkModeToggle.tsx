import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      if (saved) return saved === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const syncMode = () => {
      const stored = localStorage.getItem('darkMode')
      if (stored === 'true') {
        setDarkMode(true)
        document.documentElement.classList.add('dark')
      } else if (stored === 'false') {
        setDarkMode(false)
        document.documentElement.classList.remove('dark')
      }
    }

    const storageListener = (event: StorageEvent) => {
      if (event.key === 'darkMode') {
        syncMode()
      }
    }

    // Ensure initial sync (covers cases where class was set before mount)
    syncMode()

    window.addEventListener('storage', storageListener)
    return () => window.removeEventListener('storage', storageListener)
  }, [])

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  )
}

