import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useWallMessages } from '../hooks/useWallMessages'
import WallComposer from './WallComposer'
import { ALL_COINS } from '../data/coins'
import { useNavigate } from 'react-router-dom'

const EMOJIS = ['👍', '❤️', '🪙']

const TYPE_BADGE = {
  general:      null,
  looking_for:  { label: '🔍 Busco',   className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  have_extra:   { label: '🤝 Tengo de sobra', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
}

export default function WallMessage({ message, username, isAdmin = false}) {
  const { user } = useAuth()
  const { messages: replies, loading: repliesLoading, sendMessage, deleteMessage, toggleReaction } = useWallMessages(message.id, 10)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyComposer, setShowReplyComposer] = useState(false)

  const isOwn = user?.id === message.user_id
  const badge = TYPE_BADGE[message.type]
  const navigate = useNavigate()
  const mentionedCoin = message.coin_id ? ALL_COINS.find(c => c.id === message.coin_id) : null


  // Agrupa reacciones por emoji
  const reactionCounts = EMOJIS.reduce((acc, emoji) => {
    const reactions = (message.reactions || []).filter(r => r.emoji === emoji)
    const hasReacted = reactions.some(r => r.user_id === user?.id)
    if (reactions.length > 0) acc[emoji] = { count: reactions.length, hasReacted }
    return acc
  }, {})

  const handleDelete = async () => {
    if (confirm('¿Eliminar este mensaje?')) {
      await deleteMessage(message.id)
    }
  }

  const handleSendReply = async ({ message: text, type, username: uname }) => {
    await sendMessage({ message: text, type, parentId: message.id, username: uname })
    setShowReplyComposer(false)
    setShowReplies(true)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
            {message.username?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-sm text-gray-800 dark:text-white truncate">
                {message.username}
              </p>
              {badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${badge.className}`}>
                  {badge.label}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">
              {new Date(message.created_at).toLocaleString('es', {
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        {(isOwn || isAdmin) && (
          <button
            onClick={handleDelete}
            className="text-gray-300 hover:text-red-400 transition text-sm shrink-0"
            title="Eliminar"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Mensaje */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
        {message.message}
      </p>

      {/* Moneda mencionada */}
        {mentionedCoin && (
        <button
            onClick={() => navigate(`/moneda/${mentionedCoin.id}`)}
            className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg px-3 py-1.5 text-xs text-blue-700 dark:text-blue-400 inline-flex items-center gap-1 transition"
        >
            🪙 {mentionedCoin.country} {mentionedCoin.year} — {mentionedCoin.description}
        </button>
        )}

      {/* Footer: reacciones + responder */}
      <div className="flex items-center gap-3 flex-wrap pt-1">
        {/* Reacciones */}
        <div className="flex gap-1">
          {EMOJIS.map(emoji => {
            const data = reactionCounts[emoji]
            return (
              <button
                key={emoji}
                onClick={() => toggleReaction(message.id, emoji)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition ${
                  data?.hasReacted
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {emoji} {data?.count || ''}
              </button>
            )
          })}
        </div>

        {/* Responder */}
        <button
          onClick={() => setShowReplyComposer(r => !r)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          💬 Responder
        </button>

        {/* Ver respuestas */}
        {replies.length > 0 && (
          <button
            onClick={() => setShowReplies(r => !r)}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            {showReplies ? 'Ocultar' : `Ver ${replies.length} respuesta${replies.length > 1 ? 's' : ''}`}
          </button>
        )}
      </div>

      {/* Composer de respuesta */}
      {showReplyComposer && (
        <div className="pl-4 border-l-2 border-blue-200 dark:border-blue-700">
          <WallComposer
            onSend={handleSendReply}
            placeholder="Escribe una respuesta..."
            compact
            hideTypeSelector
          />
        </div>
      )}

      {/* Respuestas */}
      {showReplies && (
        <div className="pl-4 border-l-2 border-gray-100 dark:border-gray-700 space-y-3">
          {repliesLoading ? (
            <div className="text-xs text-gray-400">Cargando...</div>
          ) : (
            replies.map(reply => (
              <div key={reply.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {reply.username?.[0]?.toUpperCase() || '?'}
                  </div>
                  <p className="font-semibold text-xs text-gray-800 dark:text-white">{reply.username}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(reply.created_at).toLocaleString('es', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                  {(user?.id === reply.user_id || isAdmin) && (
                    <button
                      onClick={() => deleteMessage(reply.id)}
                      className="text-gray-300 hover:text-red-400 transition text-xs ml-auto"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 pl-8 leading-relaxed">
                  {reply.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}