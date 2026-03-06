import { createContext, useContext, useEffect, useState } from 'react'

const THEMES = {
  blue:   { primary: '#1e40af', dark: '#1e3a8a', nav: '#1e3a8a', accent: '#3b82f6', name: 'Azul' },
  green:  { primary: '#166534', dark: '#14532d', nav: '#14532d', accent: '#22c55e', name: 'Verde' },
  purple: { primary: '#6b21a8', dark: '#581c87', nav: '#581c87', accent: '#a855f7', name: 'Morado' },
  red:    { primary: '#9f1239', dark: '#881337', nav: '#881337', accent: '#f43f5e', name: 'Rojo' },
  orange: { primary: '#9a3412', dark: '#7c2d12', nav: '#7c2d12', accent: '#f97316', name: 'Naranja' },
  gray:   { primary: '#1f2937', dark: '#111827', nav: '#111827', accent: '#6b7280', name: 'Gris' },
}

export const THEME_LIST = Object.entries(THEMES).map(([id, t]) => ({ id, ...t }))

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true')
  const [colorTheme, setColorTheme] = useState(() => localStorage.getItem('colorTheme') || 'blue')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const theme = THEMES[colorTheme] || THEMES.blue
    const root = document.documentElement

    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-dark', theme.dark)
    root.style.setProperty('--color-nav', theme.nav)
    root.style.setProperty('--color-accent', theme.accent)

    // Limpiamos clases de tema anteriores y añadimos la nueva
    Object.keys(THEMES).forEach(t => root.classList.remove(`theme-${t}`))
    root.classList.add(`theme-${colorTheme}`)

    localStorage.setItem('colorTheme', colorTheme)
  }, [colorTheme])

  const toggle = () => {
    setDark(d => {
      localStorage.setItem('dark', !d)
      return !d
    })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle, colorTheme, setColorTheme, themes: THEME_LIST }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)