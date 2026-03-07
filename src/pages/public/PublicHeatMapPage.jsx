import { useMemo, useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabase'
import { ALL_COINS, COUNTRIES } from '../../data/coins'
import { useSEO } from '../../hooks/useSEO'

const GEO_URL = 'https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson'

const GEO_TO_COUNTRY = {
  'Germany': 'Alemania', 'Austria': 'Austria', 'Belgium': 'Bélgica',
  'Cyprus': 'Chipre', 'Slovakia': 'Eslovaquia', 'Slovenia': 'Eslovenia',
  'Spain': 'España', 'Estonia': 'Estonia', 'Finland': 'Finlandia',
  'France': 'Francia', 'Greece': 'Grecia', 'Ireland': 'Irlanda',
  'Italy': 'Italia', 'Latvia': 'Letonia', 'Lithuania': 'Lituania',
  'Luxembourg': 'Luxemburgo', 'Malta': 'Malta', 'Monaco': 'Mónaco',
  'Netherlands': 'Países Bajos', 'Portugal': 'Portugal',
  'Croatia': 'Croacia',
}

function getHeatColor(pct) {
  if (pct === 0)  return '#e5e7eb'
  if (pct < 20)  return '#fed7aa'
  if (pct < 40)  return '#fb923c'
  if (pct < 60)  return '#ea580c'
  if (pct < 80)  return '#c2410c'
  return '#7c2d12'
}

export default function PublicHeatMapPage() {
  useSEO({ title: 'Mapa de calor global · EuroCollector', description: 'Descubre qué monedas de 2€ colecciona más la comunidad' })
  const [globalStats, setGlobalStats] = useState({})
  const [totalUsers, setTotalUsers] = useState(1)
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    Promise.all([
      supabase.from('global_coin_stats').select('coin_id, owner_count'),
      supabase.from('profiles').select('user_id', { count: 'exact', head: true })
    ]).then(([{ data: coinData }, { count }]) => {
      const map = {}
      for (const row of (coinData || [])) map[row.coin_id] = row.owner_count
      setGlobalStats(map)
      setTotalUsers(Math.max(count || 1, 1))
      setLoading(false)
    })
  }, [])

  const globalCountryStats = useMemo(() => {
    if (Object.keys(globalStats).length === 0) return {}
    const stats = {}
    for (const country of COUNTRIES) {
      const coins = ALL_COINS.filter(c => c.country === country)
      const totalOwnership = coins.reduce((sum, c) => sum + (globalStats[c.id] || 0), 0)
      const avgPct = Math.round((totalOwnership / (coins.length * totalUsers)) * 100)
      stats[country] = { avgPct }
    }
    return stats
  }, [globalStats, totalUsers])

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

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            🌍 Mapa de calor global
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Qué monedas de 2€ colecciona más la comunidad · {totalUsers} coleccionistas registrados
          </p>
        </div>

        {/* Leyenda */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3">
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Popularidad:</span>
            {[
              { color: '#e5e7eb', label: '0%' },
              { color: '#fed7aa', label: '1-19%' },
              { color: '#fb923c', label: '20-39%' },
              { color: '#ea580c', label: '40-59%' },
              { color: '#c2410c', label: '60-79%' },
              { color: '#7c2d12', label: '80%+' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded shrink-0" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-2 sm:p-4">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-2 text-gray-400">
              <div className="w-6 h-6 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin" />
              Cargando datos...
            </div>
          ) : (
            <>
              {tooltip && (
                <div className="mb-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg px-3 py-2 text-sm text-center">
                  <span className="font-semibold text-orange-800 dark:text-orange-300">{tooltip.country}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">Media global: {tooltip.pct}%</span>
                </div>
              )}
              <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{ rotate: [-10, -52, 0], scale: 700 }}
                width={800}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const geoName = geo.properties.NAME || geo.properties.name
                      const countryName = GEO_TO_COUNTRY[geoName]
                      const stats = countryName ? globalCountryStats[countryName] : null
                      const fill = stats ? getHeatColor(stats.avgPct) : '#f3f4f6'
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fill}
                          stroke="#d1d5db"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: countryName ? '#93c5fd' : '#f3f4f6', outline: 'none', cursor: countryName ? 'pointer' : 'default' },
                            pressed: { outline: 'none' }
                          }}
                          onClick={() => {
                            if (!countryName) return
                            if (tooltip?.country === countryName) setTooltip(null)
                            else setTooltip({ country: countryName, pct: stats?.avgPct ?? 0 })
                          }}
                        />
                      )
                    })
                  }
                </Geographies>
              </ComposableMap>
              <p className="text-xs text-center text-gray-400 mt-1 sm:hidden">
                Toca un país para ver la popularidad
              </p>
            </>
          )}
        </div>

        {/* Tabla ranking países */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {COUNTRIES
              .filter(c => globalCountryStats[c])
              .sort((a, b) => globalCountryStats[b].avgPct - globalCountryStats[a].avgPct)
              .map(country => {
                const { avgPct } = globalCountryStats[country]
                return (
                  <div key={country} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 sm:p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">{country}</span>
                      <span className="text-xs font-bold text-orange-600">{avgPct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${avgPct}%`, backgroundColor: getHeatColor(avgPct) }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-center text-white">
          <p className="font-bold text-lg mb-1">¿Cómo te comparas con la comunidad?</p>
          <p className="text-blue-200 text-sm mb-4">
            Regístrate gratis y descubre en qué países vas por delante
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-2.5 rounded-xl transition inline-block"
          >
            Crear cuenta gratis →
          </Link>
        </div>
      </main>

      <footer className="bg-blue-900 dark:bg-gray-900 text-blue-200 text-center py-4 text-xs">
        EuroCollector · Hecho con ❤️ para coleccionistas
      </footer>
    </div>
  )
}