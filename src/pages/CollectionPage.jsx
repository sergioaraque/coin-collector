import { useState, useMemo } from 'react'
import { ALL_COINS, COUNTRIES } from '../data/coins'
import { useCollection } from '../context/CollectionContext'
import CoinCard from '../components/CoinCard'
import CoinRow from '../components/CoinRow'
import { useSearchParams } from 'react-router-dom'

export default function CollectionPage() {
  const { owned, toggleCoin } = useCollection()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState(searchParams.get('country') || '')
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // grid | list

  const filtered = useMemo(() => {
    return ALL_COINS.filter(coin => {
      const matchSearch = !search ||
        coin.description.toLowerCase().includes(search.toLowerCase()) ||
        coin.country.toLowerCase().includes(search.toLowerCase()) ||
        coin.year.toString().includes(search)
      const matchCountry = !country || coin.country === country
      const matchFilter =
        filter === 'all' ? true :
        filter === 'owned' ? owned.has(coin.id) :
        !owned.has(coin.id)
      return matchSearch && matchCountry && matchFilter
    })
  }, [search, country, filter, owned])

  // Progreso por país (solo cuando no hay filtro de país activo)
  const countryProgress = useMemo(() => {
    return COUNTRIES.map(c => {
      const coins = ALL_COINS.filter(x => x.country === c)
      const got = coins.filter(x => owned.has(x.id)).length
      return { country: c, total: coins.length, got, pct: Math.round((got / coins.length) * 100) }
    })
  }, [owned])

  return (
    <div>
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="🔍 Buscar moneda, país, año..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Todos los países</option>
          {COUNTRIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Filtro tengo/faltan */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          {[
            { value: 'all', label: 'Todas' },
            { value: 'owned', label: '✅ Tengo' },
            { value: 'missing', label: '❌ Faltan' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-3 py-2 text-sm transition ${
                filter === value ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Toggle grid/lista */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => setViewMode('grid')}
            title="Cuadrícula"
            className={`px-3 py-2 text-sm transition ${
              viewMode === 'grid' ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            ⊞
          </button>
          <button
            onClick={() => setViewMode('list')}
            title="Lista"
            className={`px-3 py-2 text-sm transition ${
              viewMode === 'list' ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            ☰
          </button>
        </div>

        <span className="text-sm text-gray-500">{filtered.length} monedas</span>
      </div>

      {/* Progreso por país (visible solo cuando no hay búsqueda activa) */}
      {!search && !country && filter === 'all' && (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">Progreso por país</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {countryProgress.map(({ country: c, total, got, pct }) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className="text-left hover:bg-gray-50 rounded-lg p-2 transition group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 transition truncate">
                    {c}
                  </span>
                  <span className="text-xs text-gray-400 ml-2 shrink-0">
                    {got}/{total}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      pct === 100 ? 'bg-green-500' :
                      pct >= 50 ? 'bg-blue-500' :
                      pct > 0 ? 'bg-yellow-400' : 'bg-gray-200'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resultados */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-4xl">🔍</span>
          <p className="mt-2">No se encontraron monedas</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(coin => (
            <CoinCard
              key={coin.id}
              coin={coin}
              isOwned={owned.has(coin.id)}
              onToggle={() => toggleCoin(coin.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium w-16">Imagen</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">País</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Año</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden md:table-cell">Descripción</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden lg:table-cell">Acuñación</th>
                <th className="text-center px-4 py-3 text-gray-500 font-medium">Tengo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(coin => (
                <CoinRow
                  key={coin.id}
                  coin={coin}
                  isOwned={owned.has(coin.id)}
                  onToggle={() => toggleCoin(coin.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}