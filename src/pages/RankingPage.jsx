import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'
import { ALL_COINS } from '../data/coins'
import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'

const isOnlineToday = (lastSignIn) => {
  if (!lastSignIn) return false
  const today = new Date().toDateString()
  return new Date(lastSignIn).toDateString() === today
}

export default function RankingPage() {
  useSEO({ title: 'Ranking' })
  const { user } = useAuth()
  const { t } = useTranslation()
  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(true)
  const totalCoins = ALL_COINS.length

  useEffect(() => {
    supabase.rpc('get_ranking').then(({ data, error }) => {
      if (error) console.error(error)
      setRanking(data || [])
      setLoading(false)
    })
  }, [])

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        {t('rankingTitle')}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">Cargando...</div>
        ) : ranking.length === 0 ? (
          <div className="text-center py-16 text-gray-400">{t('rankingEmpty')}</div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {ranking.map((u, i) => {
              const pct = Math.round((u.owned_count / totalCoins) * 100)
              const isMe = u.user_id === user?.id
              const online = isOnlineToday(u.last_sign_in_at)
              return (
                <div
                  key={u.user_id}
                  className={`flex items-center gap-4 px-5 py-4 transition ${
                    isMe ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {/* Posición */}
                  <div className="w-8 text-center shrink-0">
                    {i < 3
                      ? <span className="text-2xl">{medals[i]}</span>
                      : <span className="text-gray-400 font-bold text-sm">#{i + 1}</span>
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {u.username}
                      </p>
                      {online && (
                        <span
                          className="w-2 h-2 rounded-full bg-green-400 shrink-0 animate-pulse"
                          title="Conectado hoy"
                        />
                      )}
                      {isMe && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full shrink-0">
                          {t('rankingYou')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full bg-blue-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{pct}%</span>
                    </div>
                  </div>

                  {/* Contador */}
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                      {u.owned_count}
                    </p>
                    <p className="text-xs text-gray-400">{t('rankingCoins')}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span>Conectado hoy</span>
      </div>
    </div>
  )
}