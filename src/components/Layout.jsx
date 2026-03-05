import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCollection } from '../context/CollectionContext'
import { useTheme } from '../context/ThemeContext'
import { useAdmin } from '../hooks/useAdmin'
import { ALL_COINS } from '../data/coins'

export default function Layout() {
  const { user, signOut } = useAuth()
  const { owned } = useCollection()
  const { dark, toggle } = useTheme()
  const { isAdmin } = useAdmin()
  const navigate = useNavigate()

const handleSignOut = async () => {
  try {
    await signOut()
  } catch (e) {
    console.error('Error en signOut:', e)
  } finally {
    navigate('/login', { replace: true })
    window.location.reload()
  }
}

  const pct = Math.round((owned.size / ALL_COINS.length) * 100)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-blue-800 dark:bg-gray-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪙</span>
            <div>
              <h1 className="font-bold text-lg leading-tight">EuroCollector</h1>
              <p className="text-blue-200 dark:text-gray-400 text-xs">
                {owned.size}/{ALL_COINS.length} monedas · {pct}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-200 dark:text-gray-400 hidden sm:block">
              {user?.email}
            </span>
            {/* Toggle dark mode */}
            <button
              onClick={toggle}
              className="bg-blue-700 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm transition"
              title={dark ? 'Modo claro' : 'Modo oscuro'}
            >
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handleSignOut}
              className="bg-blue-700 dark:bg-gray-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg text-sm transition"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-blue-900 dark:bg-gray-700 text-white">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {[
            { to: '/mapa', label: '🗺️ Mapa' },
            { to: '/coleccion', label: '📋 Colección' },
            { to: '/estadisticas', label: '📊 Estadísticas' },
            ...(isAdmin ? [{ to: '/admin', label: '🛡️ Admin' }] : []),
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2.5 text-sm font-medium transition border-b-2 ${
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
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}