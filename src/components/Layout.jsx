import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCollection } from '../context/CollectionContext'
import { ALL_COINS } from '../data/coins'

export default function Layout() {
  const { user, signOut } = useAuth()
  const { owned } = useCollection()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const pct = Math.round((owned.size / ALL_COINS.length) * 100)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪙</span>
            <div>
              <h1 className="font-bold text-lg leading-tight">EuroCollector</h1>
              <p className="text-blue-200 text-xs">{owned.size}/{ALL_COINS.length} monedas · {pct}%</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-blue-200 hidden sm:block">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg text-sm transition"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {[
            { to: '/coleccion', label: '📋 Colección' },
            { to: '/estadisticas', label: '📊 Estadísticas' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2.5 text-sm font-medium transition border-b-2 ${
                  isActive
                    ? 'border-yellow-400 text-yellow-300'
                    : 'border-transparent text-blue-200 hover:text-white'
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