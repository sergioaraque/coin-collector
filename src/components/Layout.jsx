import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCollection } from '../context/CollectionContext'
import { useTheme } from '../context/ThemeContext'
import { useAdmin } from '../hooks/useAdmin'
import { ALL_COINS } from '../data/coins'
import GlobalSearch from './GlobalSearch'

export default function Layout() {
  const { user, signOut } = useAuth()
  const { owned } = useCollection()
  const { dark, toggle } = useTheme()
  const { isAdmin } = useAdmin()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  const pct = Math.round((owned.size / ALL_COINS.length) * 100)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-blue-800 dark:bg-gray-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-2xl">🪙</span>
            <div>
              <h1 className="font-bold text-lg leading-tight">EuroCollector</h1>
              <p className="text-blue-200 dark:text-gray-400 text-xs">
                {owned.size}/{ALL_COINS.length} · {pct}%
              </p>
            </div>
          </div>

          {/* Buscador global */}
          <div className="flex-1 flex justify-center">
            <GlobalSearch />
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3 shrink-0">
            <NavLink
              to="/perfil"
              className="text-sm text-blue-200 dark:text-gray-400 hover:text-white transition hidden sm:block truncate max-w-36"
            >
              {user?.email}
            </NavLink>
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
      <nav className="bg-blue-900 dark:bg-gray-700 text-white overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 min-w-max">
          {[
            { to: '/mapa',        label: '🗺️ Mapa' },
            { to: '/coleccion',   label: '📋 Colección' },
            { to: '/estadisticas',label: '📊 Estadísticas' },
            { to: '/actividad',   label: '🕐 Actividad' },
            ...(isAdmin ? [{ to: '/admin', label: '🛡️ Admin' }] : []),
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2.5 text-sm font-medium transition border-b-2 whitespace-nowrap ${
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