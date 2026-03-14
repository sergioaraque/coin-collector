import { useMemo, useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useCollection } from '../context/CollectionContext'
import { useCoins } from '../hooks/useCoins'
import { useNavigate } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import WallWidget from '../components/WallWidget'
import { supabase } from '../supabase'

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

// Colores para el modo "mi colección"
function getColor(pct) {
  if (pct === 0)   return '#e5e7eb'
  if (pct < 25)   return '#fef08a'
  if (pct < 50)   return '#fbbf24'
  if (pct < 75)   return '#86efac'
  if (pct < 100)  return '#4ade80'
  return '#16a34a'
}

// Colores para el modo "comparar" — rojo si vas por detrás, verde si por delante
function getCompareColor(diff) {
  if (diff === null) return '#f3f4f6'
  if (diff > 15)  return '#16a34a'  // muy por delante
  if (diff > 5)   return '#4ade80'  // por delante
  if (diff > -5)  return '#fbbf24'  // similar
  if (diff > -15) return '#f87171'  // por detrás
  return '#dc2626'                   // muy por detrás
}

// Colores para el mapa de calor global
function getHeatColor(pct) {
  if (pct === 0)   return '#e5e7eb'
  if (pct < 20)   return '#fed7aa'
  if (pct < 40)   return '#fb923c'
  if (pct < 60)   return '#ea580c'
  if (pct < 80)   return '#c2410c'
  return '#7c2d12'
}

export default function MapPage() {
  useSEO({ title: 'Mi mapa', description: 'Visualiza tu progreso en el mapa de Europa' })
  const { owned } = useCollection()
  const navigate = useNavigate()
  const { ALL_COINS, COUNTRIES, loading } = useCoins()
  const [tooltip, setTooltip] = useState(null)
  const [mode, setMode] = useState('mine') // 'mine' | 'compare' | 'heat'
  const [globalStats, setGlobalStats] = useState({}) // coin_id -> owner_count
  const [totalUsers, setTotalUsers] = useState(1)
  const [loadingGlobal, setLoadingGlobal] = useState(false)

  // Carga datos globales al cambiar a modos que los necesitan
  useEffect(() => {
    if (mode === 'mine') return
    if (Object.keys(globalStats).length > 0) return // ya cargado

    setLoadingGlobal(true)
    Promise.all([
      supabase.from('global_coin_stats').select('coin_id, owner_count'),
      supabase.from('profiles').select('user_id', { count: 'exact', head: true })
    ]).then(([{ data: coinData }, { count }]) => {
      const map = {}
      for (const row of (coinData || [])) {
        map[row.coin_id] = row.owner_count
      }
      setGlobalStats(map)
      setTotalUsers(Math.max(count || 1, 1))
      setLoadingGlobal(false)
    })
  }, [mode])

  // Stats de mi colección por país
  const countryStats = useMemo(() => {
    const stats = {}
    for (const country of COUNTRIES) {
      const coins = ALL_COINS.filter(c => c.country === country)
      const got = coins.filter(c => owned.has(c.id)).length
      stats[country] = { total: coins.length, got, pct: Math.round((got / coins.length) * 100) }
    }
    return stats
  }, [owned])

  // Stats globales por país (% medio de usuarios que tienen cada moneda)
  const globalCountryStats = useMemo(() => {
    if (Object.keys(globalStats).length === 0) return {}
    const stats = {}
    for (const country of COUNTRIES) {
      const coins = ALL_COINS.filter(c => c.country === country)
      const totalOwnership = coins.reduce((sum, c) => sum + (globalStats[c.id] || 0), 0)
      const avgPct = Math.round((totalOwnership / (coins.length * totalUsers)) * 100)
      stats[country] = { avgPct, totalOwners: totalOwnership }
    }
    return stats
  }, [globalStats, totalUsers])

  // Diferencia: mi % - media global (por país)
  const compareStats = useMemo(() => {
    if (Object.keys(globalCountryStats).length === 0) return {}
    const stats = {}
    for (const country of COUNTRIES) {
      const mine = countryStats[country]?.pct ?? 0
      const avg = globalCountryStats[country]?.avgPct ?? 0
      stats[country] = { diff: mine - avg, mine, avg }
    }
    return stats
  }, [countryStats, globalCountryStats])

  const getFillColor = (countryName) => {
    if (mode === 'mine') {
      const stats = countryStats[countryName]
      return stats ? getColor(stats.pct) : '#f3f4f6'
    }
    if (mode === 'heat') {
      const stats = globalCountryStats[countryName]
      return stats ? getHeatColor(stats.avgPct) : '#f3f4f6'
    }
    if (mode === 'compare') {
      const stats = compareStats[countryName]
      return stats ? getCompareColor(stats.diff) : '#f3f4f6'
    }
    return '#f3f4f6'
  }

  const getTooltipContent = (countryName) => {
    if (mode === 'mine') {
      const s = countryStats[countryName]
      return s ? `${s.got}/${s.total} (${s.pct}%)` : null
    }
    if (mode === 'heat') {
      const s = globalCountryStats[countryName]
      return s ? `Media global: ${s.avgPct}%` : null
    }
    if (mode === 'compare') {
      const s = compareStats[countryName]
      if (!s) return null
      const sign = s.diff > 0 ? '+' : ''
      return `Tú: ${s.mine}% · Media: ${s.avg}% · Diferencia: ${sign}${s.diff}%`
    }
  }

  const MODES = [
    { id: 'mine',    label: '🗺️ Mi colección' },
    { id: 'compare', label: '📊 Comparar con la media' },
    { id: 'heat',    label: '🌍 Calor global' },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
        🗺️ Mapa de Europa
      </h1>

      {/* Selector de modo */}
      <div className="flex gap-2 flex-wrap">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setTooltip(null) }}
            className={`text-sm px-4 py-2 rounded-xl font-medium transition ${
              mode === m.id
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Leyenda según modo */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4">
        {mode === 'mine' && (
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Progreso:</span>
            {[
              { color: '#e5e7eb', label: '0%' },
              { color: '#fef08a', label: '1-24%' },
              { color: '#fbbf24', label: '25-49%' },
              { color: '#86efac', label: '50-74%' },
              { color: '#4ade80', label: '75-99%' },
              { color: '#16a34a', label: '100% ✓' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded shrink-0" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        )}

        {mode === 'compare' && (
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Vs. media:</span>
            {[
              { color: '#16a34a', label: '+15% o más' },
              { color: '#4ade80', label: '+5% a +15%' },
              { color: '#fbbf24', label: 'Similar (±5%)' },
              { color: '#f87171', label: '-5% a -15%' },
              { color: '#dc2626', label: '-15% o menos' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded shrink-0" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        )}

        {mode === 'heat' && (
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Popularidad global:</span>
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
        )}
      </div>

      {/* Mapa */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 sm:p-4">
        {loadingGlobal && (
          <div className="text-center py-3 text-sm text-gray-400 flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
            Cargando datos globales...
          </div>
        )}

        {tooltip && (
          <div className="mb-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg px-3 py-2 text-sm text-center">
            <span className="font-semibold text-blue-800 dark:text-blue-300">{tooltip.country}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">{tooltip.info}</span>
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
                const isEurozone = !!countryName
                const fill = isEurozone ? getFillColor(countryName) : '#f3f4f6'

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#d1d5db"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: isEurozone ? '#93c5fd' : '#f3f4f6', outline: 'none', cursor: isEurozone ? 'pointer' : 'default' },
                      pressed: { outline: 'none' }
                    }}
                    onClick={() => {
                      if (!countryName) return
                      const info = getTooltipContent(countryName)
                      if (tooltip?.country === countryName) {
                        if (mode === 'mine') navigate(`/coleccion?country=${encodeURIComponent(countryName)}`)
                        setTooltip(null)
                      } else {
                        setTooltip({ country: countryName, info })
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>

        <p className="text-xs text-center text-gray-400 mt-1 sm:hidden">
          Toca un país para ver info · Toca de nuevo para ir a la colección
        </p>
      </div>

      <WallWidget />

      {/* Tabla resumen */}
      {mode === 'mine' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {COUNTRIES.filter(c => countryStats[c]).map(country => {
            const { got, total, pct } = countryStats[country]
            return (
              <button
                key={country}
                onClick={() => navigate(`/coleccion?country=${encodeURIComponent(country)}`)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 sm:p-3 text-left hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">
                    {country}
                  </span>
                  <span className={`text-xs font-bold ml-1 shrink-0 ${
                    pct === 100 ? 'text-green-600' : pct > 0 ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {pct}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: getColor(pct) }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{got}/{total}</p>
              </button>
            )
          })}
        </div>
      )}

      {/* Tabla comparación */}
      {mode === 'compare' && Object.keys(compareStats).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {COUNTRIES.filter(c => compareStats[c]).sort((a, b) => compareStats[b].diff - compareStats[a].diff).map(country => {
            const { diff, mine, avg } = compareStats[country]
            const sign = diff > 0 ? '+' : ''
            return (
              <div
                key={country}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 sm:p-3"
              >
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate mb-1">{country}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tú: <span className="font-medium text-gray-700 dark:text-white">{mine}%</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Media: <span className="font-medium text-gray-700 dark:text-white">{avg}%</span></p>
                <p className={`text-sm font-bold mt-1 ${diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                  {sign}{diff}%
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Tabla calor global */}
      {mode === 'heat' && Object.keys(globalCountryStats).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {COUNTRIES.filter(c => globalCountryStats[c]).sort((a, b) => globalCountryStats[b].avgPct - globalCountryStats[a].avgPct).map(country => {
            const { avgPct } = globalCountryStats[country]
            return (
              <div
                key={country}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 sm:p-3"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">{country}</span>
                  <span className="text-xs font-bold text-orange-600">{avgPct}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${avgPct}%`, backgroundColor: getHeatColor(avgPct) }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">media global</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}