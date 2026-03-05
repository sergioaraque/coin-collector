import { useState, useMemo } from 'react'
import { ALL_COINS, COUNTRIES } from '../data/coins'
import { useCollection } from '../context/CollectionContext'
import CoinCard from '../components/CoinCard'

export default function CollectionPage() {
  const { owned, toggleCoin } = useCollection()
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const [filter, setFilter] = useState('all') // all | owned | missing

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

  return (
    <div>
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
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
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
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
                filter === value
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500">{filtered.length} monedas</span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-4xl">🔍</span>
          <p className="mt-2">No se encontraron monedas</p>
        </div>
      ) : (
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
      )}
    </div>
  )
}