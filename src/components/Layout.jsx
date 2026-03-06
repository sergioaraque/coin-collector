import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCollection } from '../context/CollectionContext'
import { useAdmin } from '../hooks/useAdmin'
import { ALL_COINS } from '../data/coins'
import GlobalSearch from './GlobalSearch'
import { useTranslation } from 'react-i18next'
import { useTheme, THEME_LIST } from '../context/ThemeContext'
import { useState } from 'react'

export default function Layout() {
  const { user, signOut } = useAuth()
  const { owned } = useCollection()
  const { dark, toggle, colorTheme, setColorTheme } = useTheme()
  const [showThemes, setShowThemes] = useState(false)
  const { isAdmin } = useAdmin()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  const toggleLang = () => {
    const next = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  const pct = Math.round((owned.size / ALL_COINS.length) * 100)

  const navLinks = [
    { to: '/mapa',         label: t('map') },
    { to: '/coleccion',    label: t('collection') },
    { to: '/estadisticas', label: t('stats') },
    { to: '/actividad',    label: t('activity') },
    { to: '/insignias', label:  t('badges') },
    { to: '/ranking',      label: t('ranking') },
    ...(isAdmin ? [{ to: '/admin', label: t('admin') }] : []),
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">

      {/* Header */}
      <header className="themed text-white shadow-lg transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-3">

          {/* Fila principal */}
          <div className="flex items-center justify-between gap-2">

            {/* Logo */}
            <NavLink to="/mapa" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl">🪙</span>
              <div className="hidden sm:block">
                <p className="font-bold text-base leading-tight">EuroCollector</p>
                <p className="text-blue-200 dark:text-gray-400 text-xs">
                  {owned.size}/{ALL_COINS.length} · {pct}%
                </p>
              </div>
            </NavLink>

            {/* Buscador — visible en desktop, oculto en móvil */}
            <div className="hidden md:flex flex-1 justify-center">
              <GlobalSearch />
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2">

              {/* Buscar en móvil */}
              <button
                onClick={() => setMobileSearchOpen(s => !s)}
                className="md:hidden bg-blue-700 dark:bg-gray-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg text-sm transition"
              >
                🔍
              </button>

              {/* Toggle idioma */}
              <button
                onClick={toggleLang}
                className="bg-blue-700 dark:bg-gray-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg text-sm transition"
              >
                {i18n.language === 'es' ? '🇬🇧' : '🇪🇸'}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowThemes(s => !s)}
                  className="bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-lg text-sm transition"
                  title="Cambiar tema"
                >
                  🎨
                </button>
                {showThemes && (
                  <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 z-50 flex gap-2">
                    {THEME_LIST.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => { setColorTheme(theme.id); setShowThemes(false) }}
                        title={theme.name}
                        className={`w-7 h-7 rounded-full border-2 transition ${
                          colorTheme === theme.id ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: theme.primary }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Email + salir — desktop */}
              <div className="hidden sm:flex items-center gap-2">
                <NavLink
                  to="/perfil"
                  className="text-sm text-blue-200 dark:text-gray-400 hover:text-white transition truncate max-w-32"
                >
                  {user?.email}
                </NavLink>
                <button
                  onClick={handleSignOut}
                  className="bg-blue-700 dark:bg-gray-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg text-sm transition"
                >
                  {t('logout')}
                </button>
              </div>

              {/* Menú hamburguesa — móvil */}
              <button
                onClick={() => setMobileMenuOpen(s => !s)}
                className="sm:hidden bg-blue-700 dark:bg-gray-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg text-sm transition"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Buscador expandible en móvil */}
          {mobileSearchOpen && (
            <div className="mt-3 md:hidden">
              <GlobalSearch autoFocus onSelect={() => setMobileSearchOpen(false)} />
            </div>
          )}

          {/* Menú móvil desplegable */}
          {mobileMenuOpen && (
            <div className="mt-3 sm:hidden border-t border-blue-700 dark:border-gray-600 pt-3 space-y-1">
              <NavLink
                to="/perfil"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-blue-200 hover:bg-blue-700 hover:text-white transition"
              >
                👤 {user?.email}
              </NavLink>
              <button
                onClick={() => { handleSignOut(); setMobileMenuOpen(false) }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-blue-200 hover:bg-blue-700 hover:text-white transition"
              >
                🚪 {t('logout')}
              </button>
              <div className="pt-1 pb-1 px-3 text-xs text-blue-300 dark:text-gray-400">
                {owned.size}/{ALL_COINS.length} monedas · {pct}%
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Nav — scroll horizontal en móvil */}
      <nav className="themed text-white overflow-x-auto scrollbar-hide transition-colors">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 min-w-max">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-yellow-400 text-yellow-300'
                    : 'border-transparent text-blue-200 dark:text-gray-300 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6">
        <Outlet />
      </main>
    </div>
  )
}