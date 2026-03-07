import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ALL_COINS, COUNTRIES } from '../../data/coins'
import { useCoinImage } from '../../hooks/useCoinImage'
import { useSEO } from '../../hooks/useSEO'

const PAGE_SIZE = 20

function PublicCoinCard({ coin }) {
  const { src, status } = useCoinImage(coin)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition border-2 border-transparent hover:border-blue-300">
      <div className="bg-gray-50 dark:bg-gray-700 flex items-center justify-center h-28 relative">
        {status === 'error' ? (
          <span className="text-4xl">🪙</span>
        ) : (
          <>
            {status === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}
            <img
              src={src}
              alt={coin.description}
              className={`h-24 w-24 object-contain transition-opacity ${
                status === 'ok' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        )}
        {coin.mintage > 0 && coin.mintage < 100000 && (
          <span className="absolute top-1 right-1 bg-purple-500 text-white text-xs rounded-full px-1.5 py-0.5">
            💎
          </span>
        )}
      </div>
      <div className="p-2">
        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 truncate">{coin.country}</p>
        <p className="text-sm font-bold text-gray-800 dark:text-white">{coin.year}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">{coin.description}</p>
      </div>
    </div>
  )
}

export default function PublicCatalogPage() {
  useSEO({ title: 'Catálogo', description: 'Más de 290 monedas conmemorativas de 2€ de todos los países de la eurozona' })

  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const [rarity, setRarity] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const loaderRef = useRef(null)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filtered = useMemo(() => {
    return ALL_COINS.filter(coin => {
      const matchSearch = !search ||
        coin.country.toLowerCase().includes(search.toLowerCase()) ||
        coin.description.toLowerCase().includes(search.toLowerCase()) ||
        coin.year.toString().includes(search) ||
        coin.commemorates?.toLowerCase().includes(search.toLowerCase())
      const matchCountry = !country || coin.country === country
      const matchRarity =
        rarity === '' ? true :
        rarity === 'rare'   ? coin.mintage > 0 && coin.mintage < 100000 :
        rarity === 'medium' ? coin.mintage >= 100000 && coin.mintage < 1000000 :
        coin.mintage >= 1000000
      return matchSearch && matchCountry && matchRarity
    })
  }, [search, country, rarity])

  // Reset al cambiar filtros
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [search, country, rarity])

  // Infinite scroll
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

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            🪙 Catálogo de monedas
          </h1>
          <Link
            to="/register"
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            ✅ Registrarse para marcar monedas
          </Link>
        </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="🔍 Buscar moneda, país, año..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-48 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todos los países</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={rarity}
            onChange={e => setRarity(e.target.value)}
            className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todas las rarezas</option>
            <option value="rare">💎 Raras (&lt;100k)</option>
            <option value="medium">🔵 Medias (100k-1M)</option>
            <option value="common">⚪ Comunes (&gt;1M)</option>
          </select>
          <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
            {visibleCount < filtered.length
              ? `${visibleCount} de ${filtered.length} monedas`
              : `${filtered.length} monedas`
            }
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <span className="text-4xl">🔍</span>
            <p className="mt-2">No se encontraron monedas</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {visibleCoins.map(coin => (
                <PublicCoinCard key={coin.id} coin={coin} />
              ))}
            </div>
            {/* Loader infinite scroll */}
            {visibleCount < filtered.length && (
              <div ref={loaderRef} className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}
          </>
        )}

        {/* Banner CTA */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <p className="font-semibold text-blue-800 dark:text-blue-300">
              ¿Te gustaría marcar las monedas que tienes?
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-0.5">
              Regístrate gratis y lleva el control de tu colección
            </p>
          </div>
          <Link
            to="/register"
            className="shrink-0 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-xl transition"
          >
            Crear cuenta →
          </Link>
        </div>
      </main>

      <footer className="bg-blue-900 dark:bg-gray-900 text-blue-200 text-center py-4 text-xs">
        EuroCollector · Hecho con ❤️ para coleccionistas
      </footer>
    </div>
  )
}