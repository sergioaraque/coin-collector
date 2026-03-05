import { useMemo } from 'react'
import { ALL_COINS, COUNTRIES } from '../data/coins'
import { useCollection } from '../context/CollectionContext'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#1d4ed8','#16a34a','#dc2626','#d97706','#7c3aed','#0891b2','#be185d','#065f46']

export default function StatsPage() {
  const { owned } = useCollection()

  const total = ALL_COINS.length
  const ownedCount = owned.size
  const pct = total > 0 ? Math.round((ownedCount / total) * 100) : 0

  const byCountry = useMemo(() =>
    COUNTRIES.map(c => {
      const coins = ALL_COINS.filter(x => x.country === c)
      const got = coins.filter(x => owned.has(x.id)).length
      return { country: c.length > 10 ? c.slice(0, 8) + '…' : c, total: coins.length, tengo: got, faltan: coins.length - got }
    }).sort((a, b) => b.tengo - a.tengo),
    [owned]
  )

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

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total monedas', value: total, color: 'text-blue-700' },
          { label: 'En mi colección', value: ownedCount, color: 'text-green-600' },
          { label: 'Me faltan', value: total - ownedCount, color: 'text-red-500' },
          { label: 'Completado', value: `${pct}%`, color: 'text-yellow-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Barra progreso */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-700 mb-3">Progreso general</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-500 h-4 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2 text-right">{ownedCount} de {total} monedas ({pct}%)</p>
      </div>

      {/* Pie */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-700 mb-3">Distribución de la colección</h2>
        <div className="flex items-center justify-center">
          <PieChart width={200} height={200}>
            <Pie data={pieData} cx={100} cy={100} innerRadius={55} outerRadius={90} dataKey="value">
              {pieData.map((_, i) => (
                <Cell key={i} fill={i === 0 ? '#16a34a' : '#e5e7eb'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="ml-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />
              <span>Tengo: {ownedCount}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />
              <span>Faltan: {total - ownedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Por país */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-700 mb-4">Monedas por país</h2>
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
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-700 mb-4">Evolución por año</h2>
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