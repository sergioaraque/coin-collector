import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabase'
import { ALL_COINS } from '../../data/coins'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'

export default function PublicStatsPage() {
  const [globalStats, setGlobalStats] = useState(null)
  const [popularCoins, setPopularCoins] = useState([])
  const [loading, setLoading] = useState(true)

  const totalCoins = ALL_COINS.length

  useEffect(() => {
    async function load() {
      const [{ data: stats }, { data: popular }] = await Promise.all([
        supabase.rpc('get_global_stats'),
        supabase.rpc('get_popular_coins'),
      ])
      setGlobalStats(stats)
      setPopularCoins(popular || [])
      setLoading(false)
    }
    load()
  }, [])

  // Enriquecemos las monedas populares con datos del catálogo
  const popularWithData = popularCoins.map(p => {
    const coin = ALL_COINS.find(c => c.id === p.coin_id)
    return { ...p, coin }
  }).filter(p => p.coin)

  // Distribución por país de las monedas más coleccionadas
  const byCountry = popularWithData.reduce((acc, p) => {
    const c = p.coin.country
    acc[c] = (acc[c] || 0) + Number(p.times_collected)
    return acc
  }, {})

  const countryData = Object.entries(byCountry)
    .map(([country, count]) => ({ country: country.slice(0, 8), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

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
            <Link to="/catalogo" className="text-sm text-blue-200 hover:text-white transition hidden sm:block">
              Catálogo
            </Link>
            <Link to="/ranking-publico" className="text-sm text-blue-200 hover:text-white transition hidden sm:block">
              Ranking
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

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          📊 Estadísticas globales
        </h1>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Cargando estadísticas...</div>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🪙', label: 'Monedas en catálogo', value: totalCoins },
                { icon: '👥', label: 'Coleccionistas', value: globalStats?.total_users || 0 },
                { icon: '📦', label: 'Monedas registradas', value: globalStats?.total_collections?.toLocaleString('es') || 0 },
                { icon: '📊', label: 'Media por coleccionista', value: globalStats?.avg_per_user || 0 },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 sm:p-5 text-center">
                  <span className="text-3xl">{icon}</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 mt-2">
                    {value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Monedas más coleccionadas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
              <h2 className="font-bold text-gray-800 dark:text-white text-lg mb-4">
                🏆 Monedas más coleccionadas
              </h2>
              <div className="space-y-2">
                {popularWithData.slice(0, 10).map((p, i) => {
                  const maxCount = popularWithData[0]?.times_collected || 1
                  const pct = Math.round((p.times_collected / maxCount) * 100)
                  return (
                    <div key={p.coin_id} className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-400 w-5 shrink-0">
                        #{i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                            {p.coin.country} {p.coin.year} — {p.coin.description}
                          </p>
                          <span className="text-xs text-gray-400 shrink-0 ml-2">
                            {p.times_collected} col.
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-blue-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Popularidad por país */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
              <h2 className="font-bold text-gray-800 dark:text-white text-lg mb-4">
                🌍 Países más populares
              </h2>
              <div className="overflow-x-auto">
                <div style={{ minWidth: '400px' }}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={countryData}>
                      <XAxis dataKey="country" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="count" name="Colecciones" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 text-center text-white">
              <p className="text-lg font-bold mb-2">¿Quieres ver tu posición en el ranking?</p>
              <p className="text-blue-200 text-sm mb-6">Regístrate gratis y empieza a gestionar tu colección</p>
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-3 rounded-xl transition inline-block"
              >
                Crear cuenta gratis →
              </Link>
            </div>
          </>
        )}
      </main>

      <footer className="bg-blue-900 dark:bg-gray-900 text-blue-200 text-center py-4 text-xs">
        EuroCollector · Hecho con ❤️ para coleccionistas
      </footer>
    </div>
  )
}