import { Link } from 'react-router-dom'
import { useWallMessages } from '../hooks/useWallMessages'

const TYPE_BADGE = {
  looking_for: { label: '🔍 Busco',         className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  have_extra:  { label: '🤝 Tengo de sobra', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
}

export default function WallWidget() {
  const { messages, loading } = useWallMessages(null, 5)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          💬 Comunidad
        </h2>
        <Link
          to="/comunidad"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          Ver todo →
        </Link>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">
          Aún no hay mensajes —{' '}
          <Link to="/comunidad" className="text-blue-600 dark:text-blue-400 hover:underline">
            sé el primero
          </Link>
        </p>
      ) : (
        <div className="space-y-2">
          {messages.map(msg => {
            const badge = TYPE_BADGE[msg.type]
            const reactionCount = (msg.reactions || []).length
            return (
              <Link
                key={msg.id}
                to="/comunidad"
                className="block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl p-2 transition"
              >
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 bg-blue-800 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                    {msg.username?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">
                        {msg.username}
                      </span>
                      {badge && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${badge.className}`}>
                          {badge.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {msg.message}
                    </p>
                  </div>
                  {reactionCount > 0 && (
                    <span className="text-xs text-gray-400 shrink-0">{reactionCount} 👍</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <Link
        to="/comunidad"
        className="block text-center text-xs bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 py-2 rounded-xl transition font-medium"
      >
        Ir a la comunidad →
      </Link>
    </div>
  )
}