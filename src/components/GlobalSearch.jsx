import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCoins } from '../hooks/useCoins'
import { useCollection } from '../context/CollectionContext'
import { useTranslation } from 'react-i18next'

export default function GlobalSearch({ autoFocus = false, onSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState([])
  const { owned } = useCollection()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { ALL_COINS, COUNTRIES, loading } = useCoins()
  const ref = useRef(null)

  useEffect(() => {
    if (!query.trim()) { setResults([]); setOpen(false); return }
    const q = query.toLowerCase()
    const found = ALL_COINS.filter(c =>
      c.country.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.year.toString().includes(q) ||
      c.commemorates?.toLowerCase().includes(q)
    ).slice(0, 8)
    setResults(found)
    setOpen(true)
  }, [query])

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (coin) => {
    navigate(`/moneda/${coin.id}`)
    setQuery('')
    setOpen(false)
    onSelect?.()
  }

  const totalResults = ALL_COINS.filter(c =>
    c.country.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase()) ||
    c.year.toString().includes(query) ||
    c.commemorates?.toLowerCase().includes(query.toLowerCase())
  ).length

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      <div className="flex items-center bg-blue-700 dark:bg-gray-700 rounded-lg px-3 py-1.5 gap-2">
        <span className="text-blue-200 text-sm">🔍</span>
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => query && setOpen(true)}
          placeholder={t('searchPlaceholder')}
          className="bg-transparent text-white placeholder-blue-200 dark:placeholder-gray-400 text-sm outline-none w-full"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false) }}
            className="text-blue-200 hover:text-white text-xs shrink-0"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown resultados */}
      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 w-full min-w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          {results.map(coin => (
            <button
              key={coin.id}
              onClick={() => handleSelect(coin)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
            >
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center shrink-0 text-sm">
                {owned.has(coin.id) ? '✅' : '🪙'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                  {coin.country} · {coin.year}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {coin.description}
                </p>
              </div>
              {owned.has(coin.id) && (
                <span className="text-xs text-green-500 shrink-0">{t('owned')}</span>
              )}
            </button>
          ))}

          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
            <p className="text-xs text-gray-400">
              {totalResults} {totalResults !== 1 ? t('results') : t('result')}
              {totalResults > 8 ? ` (${t('showingFirst')})` : ''}
            </p>
          </div>
        </div>
      )}

      {/* Sin resultados */}
      {open && query && results.length === 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 w-full min-w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 p-4 text-center">
          <p className="text-sm text-gray-400">
            {t('noResults')} "{query}"
          </p>
        </div>
      )}
    </div>
  )
}