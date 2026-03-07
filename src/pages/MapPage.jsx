import { useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useCollection } from '../context/CollectionContext'
import { ALL_COINS, COUNTRIES } from '../data/coins'
import { useNavigate } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

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

function getColor(pct) {
  if (pct === 0)  return '#e5e7eb'
  if (pct < 25)  return '#fef08a'
  if (pct < 50)  return '#fbbf24'
  if (pct < 75)  return '#86efac'
  if (pct < 100) return '#4ade80'
  return '#16a34a'
}

export default function MapPage() {
  useSEO({ title: 'Mi mapa', description: 'Visualiza tu progreso en el mapa de Europa' })
  const { owned } = useCollection()
  const navigate = useNavigate()
  const [tooltip, setTooltip] = useState(null) // para móvil: tap muestra info

  const countryStats = useMemo(() => {
    const stats = {}
    for (const country of COUNTRIES) {
      const coins = ALL_COINS.filter(c => c.country === country)
      const got = coins.filter(c => owned.has(c.id)).length
      stats[country] = { total: coins.length, got, pct: Math.round((got / coins.length) * 100) }
    }
    return stats
  }, [owned])

  return (
    <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
        🗺️ Mapa de Europa
      </h1>

      {/* Leyenda */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4">
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
      </div>

      {/* Mapa */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 sm:p-4">
        {/* Tooltip móvil */}
        {tooltip && (
          <div className="mb-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg px-3 py-2 text-sm text-center">
            <span className="font-semibold text-blue-800 dark:text-blue-300">{tooltip.country}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              {tooltip.got}/{tooltip.total} ({tooltip.pct}%)
            </span>
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
                const stats = countryName ? countryStats[countryName] : null
                const pct = stats ? stats.pct : -1
                const isEurozone = pct >= 0

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isEurozone ? getColor(pct) : '#f3f4f6'}
                    stroke="#d1d5db"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: isEurozone ? '#93c5fd' : '#f3f4f6', outline: 'none', cursor: isEurozone ? 'pointer' : 'default' },
                      pressed: { outline: 'none' }
                    }}
                    onClick={() => {
                      if (countryName) {
                        // En móvil primero mostramos tooltip, segundo tap navega
                        if (tooltip?.country === countryName) {
                          navigate(`/coleccion?country=${encodeURIComponent(countryName)}`)
                          setTooltip(null)
                        } else {
                          setTooltip({ country: countryName, ...stats })
                        }
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
        <p className="text-xs text-center text-gray-400 mt-1 sm:hidden">
          Toca un país para ver el progreso · Toca de nuevo para ir a la colección
        </p>
      </div>

      {/* Tabla resumen — 2 cols en móvil, 4 en desktop */}
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
    </div>
  )
}