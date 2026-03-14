import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCoins } from '../hooks/useCoins'
import { useCollection } from '../context/CollectionContext'
import CoinCard from '../components/CoinCard'
import CoinRow from '../components/CoinRow'
import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'

const PAGE_SIZE = 20

export default function CollectionPage() {
  useSEO({ title: 'Mi colección' })
  const { owned, toggleCoin } = useCollection()
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState('')
  const [country, setCountry] = useState(searchParams.get('country') || '')
  const [filter, setFilter] = useState('all')
  const [rarity, setRarity] = useState('')
  const { ALL_COINS, COUNTRIES, loading } = useCoins()
  const [viewMode, setViewMode] = useState('grid')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const loaderRef = useRef(null)
  const { t } = useTranslation()
  const { user } = useAuth()
  const [noteIds, setNoteIds] = useState(new Set())
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filtered = useMemo(() => {
    return ALL_COINS.filter(coin => {
      const matchSearch = !search ||
        coin.description.toLowerCase().includes(search.toLowerCase()) ||
        coin.country.toLowerCase().includes(search.toLowerCase()) ||
        coin.year.toString().includes(search) ||
        coin.commemorates?.toLowerCase().includes(search.toLowerCase())

      const matchCountry = !country || coin.country === country

      const matchFilter =
        filter === 'all' ? true :
        filter === 'owned' ? owned.has(coin.id) :
        !owned.has(coin.id)

      const matchRarity =
        rarity === '' ? true :
        rarity === 'rare'   ? coin.mintage > 0 && coin.mintage < 100000 :
        rarity === 'medium' ? coin.mintage >= 100000 && coin.mintage < 1000000 :
        rarity === 'common' ? coin.mintage >= 1000000 : true

      return matchSearch && matchCountry && matchFilter && matchRarity
    })
  }, [search, country, filter, rarity, owned])

  // Reset visibleCount cuando cambian los filtros
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [search, country, filter, rarity])

  // Infinite scroll con IntersectionObserver
  const handleObserver = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting && visibleCount < filtered.length) {
      setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filtered.length))
    }
  }, [visibleCount, filtered.length])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 })
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [handleObserver])

  const visibleCoins = filtered.slice(0, visibleCount)

  const countryProgress = useMemo(() => {
    return COUNTRIES.map(c => {
      const coins = ALL_COINS.filter(x => x.country === c)
      const got = coins.filter(x => owned.has(x.id)).length
      return { country: c, total: coins.length, got, pct: Math.round((got / coins.length) * 100) }
    })
  }, [owned])

  useEffect(() => {
  if (!user) return
  supabase.from('coin_notes').select('coin_id').eq('user_id', user.id)
    .then(({ data }) => setNoteIds(new Set((data || []).map(n => n.coin_id))))
}, [user])

  return (
    <div>
      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-center">

        {/* Búsqueda */}
        <input
          type="text"
          placeholder={`🔍 ${t('searchPlaceholder')}`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-48 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* País */}
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">{t('allCountries')}</option>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Rareza */}
        <select
          value={rarity}
          onChange={e => setRarity(e.target.value)}
          className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">{t('allRarities')}</option>
          <option value="rare">{t('rare')} (&lt;100k)</option>
          <option value="medium">{t('medium')} (100k-1M)</option>
          <option value="common">{t('common')} (&gt;1M)</option>
        </select>

        {/* Tengo / Faltan */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
          {[
            { value: 'all',     label: t('filterAll') },
            { value: 'owned',   label: '✅ ' + t('filterOwned') },
            { value: 'missing', label: '❌ ' + t('filterMissing') },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-3 py-2 text-sm transition ${
                filter === value
                  ? 'bg-blue-700 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid / Lista */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
          <button
            onClick={() => setViewMode('grid')}
            title="Cuadrícula"
            className={`px-3 py-2 text-sm transition ${
              viewMode === 'grid'
                ? 'bg-blue-700 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
            }`}
          >
            ⊞
          </button>
          <button
            onClick={() => setViewMode('list')}
            title="Lista"
            className={`px-3 py-2 text-sm transition ${
              viewMode === 'list'
                ? 'bg-blue-700 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
            }`}
          >
            ☰
          </button>
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {visibleCount < filtered.length
            ? `${visibleCount} de ${filtered.length} ${t('coins')}`
            : `${filtered.length} ${t('coins')}`
          }
        </span>
      </div>

      {/* Progreso por país */}
      {!search && !country && filter === 'all' && rarity === '' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
            {t('countryProgress')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {countryProgress.map(({ country: c, total, got, pct }) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className="text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition truncate">
                    {c}
                  </span>
                  <span className="text-xs text-gray-400 ml-2 shrink-0">{got}/{total}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      pct === 100 ? 'bg-green-500' :
                      pct >= 50  ? 'bg-blue-500' :
                      pct > 0    ? 'bg-yellow-400' : 'bg-gray-200'
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
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visibleCoins.map(coin => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isOwned={owned.has(coin.id)}
                onToggle={() => toggleCoin(coin.id)}
                hasNote={noteIds.has(coin.id)}
              />
            ))}
          </div>
          {/* Loader para infinite scroll */}
          {visibleCount < filtered.length && (
            <div ref={loaderRef} className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium w-16">Imagen</th>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium">País</th>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium">Año</th>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium hidden md:table-cell">Descripción</th>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium hidden lg:table-cell">Acuñación</th>
                <th className="text-center px-4 py-3 text-gray-500 dark:text-gray-300 font-medium">Tengo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {visibleCoins.map(coin => (
                <CoinRow
                  key={coin.id}
                  coin={coin}
                  isOwned={owned.has(coin.id)}
                  onToggle={() => toggleCoin(coin.id)}
                />
              ))}
            </tbody>
          </table>
          {visibleCount < filtered.length && (
            <div ref={loaderRef} className="flex justify-center py-6">
              <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}