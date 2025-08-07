import { useEffect, useState } from 'react'

export const useTheme = (initialTheme: string = 'dark') => {
  const [theme, setTheme] = useState(initialTheme)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  useEffect(() => {
    document.body.className = theme + '-theme'
  }, [theme])

  return {
    theme,
    toggleTheme,
    setTheme,
  }
}
