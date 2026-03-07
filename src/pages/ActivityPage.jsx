import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'
import { ALL_COINS } from '../data/coins'
import { useSEO } from '../hooks/useSEO'

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'ahora mismo'
  if (mins < 60) return `hace ${mins} min`
  if (hours < 24) return `hace ${hours}h`
  return `hace ${days} día${days !== 1 ? 's' : ''}`
}

export default function ActivityPage() {
  useSEO({ title: 'Actividad reciente' })
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setActivity(data || [])
        setLoading(false)
      })
  }, [user])

  const getCoin = (coinId) => ALL_COINS.find(c => c.id === coinId)

  const getActivityInfo = (item) => {
    const coin = item.coin_id ? getCoin(item.coin_id) : null
    switch (item.action) {
      case 'add':
        return {
          icon: '➕',
          color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
          text: coin
            ? `Añadiste ${coin.country} ${coin.year}`
            : `Añadiste moneda`,
          sub: coin?.description,
          coinId: item.coin_id,
        }
      case 'remove':
        return {
          icon: '➖',
          color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
          text: coin
            ? `Eliminaste ${coin.country} ${coin.year}`
            : `Eliminaste moneda`,
          sub: coin?.description,
          coinId: item.coin_id,
        }
      case 'complete_country':
        return {
          icon: '🏆',
          color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
          text: `¡Completaste ${item.country} al 100%!`,
          sub: null,
          coinId: null,
        }
      default:
        return { icon: '🪙', color: 'bg-gray-100 text-gray-600', text: item.action, sub: null }
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        📋 Historial de actividad
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">Cargando historial...</div>
        ) : activity.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <span className="text-4xl block mb-2">📭</span>
            Aún no hay actividad registrada
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {activity.map(item => {
              const info = getActivityInfo(item)
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    info.coinId
                      ? 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition'
                      : ''
                  }`}
                  onClick={() => info.coinId && navigate(`/moneda/${info.coinId}`)}
                >
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 ${info.color}`}>
                    {info.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {info.text}
                    </p>
                    {info.sub && (
                      <p className="text-xs text-gray-400 truncate mt-0.5">{info.sub}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">
                    {timeAgo(item.created_at)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}