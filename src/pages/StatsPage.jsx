import { useMemo } from 'react'
import { useCoins } from '../hooks/useCoins'
import { useCollection } from '../context/CollectionContext'
import { useSEO } from '../hooks/useSEO'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell
} from 'recharts'

function getEstimatedValue(coin) {
  if (!coin.mintage || coin.mintage === 0) return 3
  if (coin.mintage < 50000)  return 100
  if (coin.mintage < 100000) return 40
  if (coin.mintage < 500000) return 12
  if (coin.mintage < 2000000) return 5
  return 3
}

export default function StatsPage() {
  useSEO({ title: 'Estadísticas' })
  const { ALL_COINS, COUNTRIES, loading } = useCoins()
  const { owned } = useCollection()

  const total = ALL_COINS.length
  const ownedCount = owned.size
  const pct = total > 0 ? Math.round((ownedCount / total) * 100) : 0

  const ownedCoins = useMemo(() =>
    ALL_COINS.filter(c => owned.has(c.id)), [owned])

  // Valor estimado total
  const totalValue = useMemo(() =>
    ownedCoins.reduce((sum, c) => sum + getEstimatedValue(c), 0), [ownedCoins])

  // Moneda más rara que tienes
  const rarestCoin = useMemo(() =>
    ownedCoins.length === 0 ? null :
    ownedCoins.reduce((prev, curr) =>
      (curr.mintage > 0 && (prev.mintage === 0 || curr.mintage < prev.mintage)) ? curr : prev
    ), [ownedCoins])

  // Distribución por rareza
  const rarityData = useMemo(() => [
    { name: '💎 Raras (<100k)',   value: ownedCoins.filter(c => c.mintage > 0 && c.mintage < 100000).length },
    { name: '🔵 Medias (100k-1M)', value: ownedCoins.filter(c => c.mintage >= 100000 && c.mintage < 1000000).length },
    { name: '⚪ Comunes (>1M)',    value: ownedCoins.filter(c => c.mintage >= 1000000).length },
  ], [ownedCoins])

  const byCountry = useMemo(() =>
    COUNTRIES.map(c => {
      const coins = ALL_COINS.filter(x => x.country === c)
      const got = coins.filter(x => owned.has(x.id)).length
      return {
        country: c.length > 10 ? c.slice(0, 8) + '…' : c,
        total: coins.length, tengo: got, faltan: coins.length - got
      }
    }).sort((a, b) => b.tengo - a.tengo), [owned])

  const byYear = useMemo(() => {
    const years = [...new Set(ALL_COINS.map(c => c.year))].sort()
    return years.map(y => {
      const coins = ALL_COINS.filter(c => c.year === y)
      return { año: y, total: coins.length, tengo: coins.filter(c => owned.has(c.id)).length }
    })
  }, [owned])

  const pieData = [
    { name: 'Tengo', value: ownedCount },
    { name: 'Faltan', value: total - ownedCount },
  ]

  const RARITY_COLORS = ['#7c3aed', '#3b82f6', '#9ca3af']

  return (
    <div className="space-y-6">

      {/* KPIs principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total monedas', value: total, color: 'text-blue-700 dark:text-blue-400', icon: '🪙' },
          { label: 'En mi colección', value: ownedCount, color: 'text-green-600', icon: '✅' },
          { label: 'Me faltan', value: total - ownedCount, color: 'text-red-500', icon: '❌' },
          { label: 'Completado', value: `${pct}%`, color: 'text-yellow-500', icon: '🎯' },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl mb-1">{icon}</div>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Valor estimado + moneda más rara */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 flex items-center gap-4">
          <span className="text-4xl">💰</span>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Valor estimado total</p>
            <p className="text-3xl font-bold text-yellow-500 mt-0.5">{totalValue.toLocaleString('es')}€</p>
            <p className="text-xs text-gray-400 mt-1">Basado en acuñación de cada moneda</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 flex items-center gap-4">
          <span className="text-4xl">💎</span>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Tu moneda más rara</p>
            {rarestCoin ? (
              <>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-0.5 truncate">
                  {rarestCoin.country} {rarestCoin.year}
                </p>
                <p className="text-xs text-gray-400 truncate">{rarestCoin.description}</p>
                <p className="text-xs text-purple-500 mt-0.5">
                  {rarestCoin.mintage.toLocaleString('es')} uds. acuñadas
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400 mt-1">Aún no tienes monedas</p>
            )}
          </div>
        </div>
      </div>

      {/* Barra progreso */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Progreso general</h2>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-500 h-4 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2 text-right">
          {ownedCount} de {total} monedas ({pct}%)
        </p>
      </div>

      {/* Distribución por rareza */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Distribución colección
          </h2>
          <div className="flex items-center justify-center">
            <PieChart width={180} height={180}>
              <Pie data={pieData} cx={90} cy={90} innerRadius={50} outerRadius={85} dataKey="value">
                <Cell fill="#16a34a" />
                <Cell fill="#e5e7eb" />
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="ml-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />
                <span className="dark:text-gray-300">Tengo: {ownedCount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />
                <span className="dark:text-gray-300">Faltan: {total - ownedCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Mis monedas por rareza
          </h2>
          <div className="flex items-center justify-center">
            <PieChart width={180} height={180}>
              <Pie data={rarityData} cx={90} cy={90} innerRadius={50} outerRadius={85} dataKey="value">
                {rarityData.map((_, i) => <Cell key={i} fill={RARITY_COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="ml-4 space-y-2">
              {rarityData.map(({ name, value }, i) => (
                <div key={name} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full inline-block shrink-0"
                    style={{ backgroundColor: RARITY_COLORS[i] }} />
                  <span className="dark:text-gray-300">{name}: {value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Por país */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Monedas por país</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={byCountry} margin={{ bottom: 60 }}>
            <XAxis dataKey="country" angle={-45} textAnchor="end" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="tengo" name="Tengo" fill="#16a34a" stackId="a" />
            <Bar dataKey="faltan" name="Faltan" fill="#e5e7eb" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Por año */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Evolución por año</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={byYear}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="año" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" name="Total" stroke="#1d4ed8" dot={false} />
            <Line type="monotone" dataKey="tengo" name="Tengo" stroke="#16a34a" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}