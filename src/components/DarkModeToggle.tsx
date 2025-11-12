import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'learnrbx-dark-mode'

function getInitialDarkMode() {
  if (typeof window === 'undefined') return false
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') return true
    if (stored === 'false') return false
  } catch (error) {
    console.warn('Unable to read theme preference', error)
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode)

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

    try {
      localStorage.setItem(STORAGE_KEY, darkMode.toString())
    } catch (error) {
      console.warn('Unable to store theme preference', error)
    }
  }, [darkMode])

  useEffect(() => {
    if (typeof window === 'undefined') return

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
    setDarkMode((prev) => !prev)
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

