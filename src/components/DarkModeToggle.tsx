import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'learnrbx-dark-mode'

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (darkMode) {
      root.classList.add('dark')
      body.classList.add('dark')
    } else {
      root.classList.remove('dark')
      body.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Sync initial state with DOM (covers pre-render script or server render)
    const root = document.documentElement
    const isDark = root.classList.contains('dark')
    if (isDark !== darkMode) {
      setDarkMode(isDark)
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = (event: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored === null) {
          setDarkMode(event.matches)
        }
      } catch (error) {
        console.warn('Unable to respond to system theme change', error)
      }
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue !== null) {
        setDarkMode(event.newValue === 'true')
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const toggleMode = () => {
    const next = !darkMode
    setDarkMode(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'true' : 'false')
    } catch (error) {
      console.warn('Unable to store theme preference', error)
    }
  }

  return (
    <button
      onClick={toggleMode}
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

