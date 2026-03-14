import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabase'
import { useCoins } from '../../hooks/useCoins'
import { useSEO } from '../../hooks/useSEO'

export default function PublicRankingPage() {

  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(true)
  const totalCoins = ALL_COINS.length
  const { ALL_COINS, COUNTRIES}  = useCoins()
  useSEO({ title: 'Ranking público' })

  useEffect(() => {
    supabase.rpc('get_anonymous_ranking').then(({ data, error }) => {
      if (error) console.error(error)
      setRanking(data || [])
      setLoading(false)
    })
  }, [])

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

      {/* Header */}
      <header className="bg-blue-800 dark:bg-gray-800 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            <span className="font-bold text-lg">EuroCollector</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/estadisticas-publicas" className="text-sm text-blue-200 hover:text-white transition hidden sm:block">
              Estadísticas
            </Link>
            <Link to="/catalogo" className="text-sm text-blue-200 hover:text-white transition hidden sm:block">
              Catálogo
            </Link>
            <Link to="/login" className="text-sm text-blue-200 hover:text-white transition">
              Iniciar sesión
            </Link>
            <Link to="/register" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold text-sm px-4 py-2 rounded-lg transition">
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            🏆 Ranking de coleccionistas
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ranking anónimo — no se muestran datos personales
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Cargando ranking...</div>
          ) : ranking.length === 0 ? (
            <div className="text-center py-16 text-gray-400">Sin datos aún</div>
          ) : (
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {ranking.map((u, i) => {
                const pct = Math.round((u.owned_count / totalCoins) * 100)
                return (
                  <div key={i} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-8 text-center shrink-0">
                      {i < 3
                        ? <span className="text-2xl">{medals[i]}</span>
                        : <span className="text-gray-400 font-bold text-sm">#{i + 1}</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Coleccionista #{i + 1}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-gray-100 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-blue-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">{pct}%</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                        {u.owned_count}
                      </p>
                      <p className="text-xs text-gray-400">monedas</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-center text-white">
          <p className="font-bold text-lg mb-1">¿Cuál sería tu posición?</p>
          <p className="text-blue-200 text-sm mb-4">
            Regístrate y compite con otros coleccionistas
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-2.5 rounded-xl transition inline-block"
          >
            Unirme al ranking →
          </Link>
        </div>
      </main>

      <footer className="bg-blue-900 dark:bg-gray-900 text-blue-200 text-center py-4 text-xs">
        EuroCollector · Hecho con ❤️ para coleccionistas
      </footer>
    </div>
  )
}