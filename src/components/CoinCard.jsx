import { useState } from 'react'

export default function CoinCard({ coin, isOwned, onToggle }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer border-2 ${
        isOwned ? 'border-green-400' : 'border-transparent'
      }`}
      onClick={onToggle}
    >
      {/* Imagen */}
      <div className="relative bg-gray-50 flex items-center justify-center h-28">
        {!imgError ? (
          <img
            src={coin.imageUrl}
            alt={coin.description}
            className="h-24 w-24 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-4xl">🪙</span>
        )}
        {isOwned && (
          <span className="absolute top-1 right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            ✓
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2">
        <p className="text-xs font-semibold text-blue-800 truncate">{coin.country}</p>
        <p className="text-sm font-bold text-gray-800">{coin.year}</p>
        <p className="text-xs text-gray-500 leading-tight line-clamp-2">{coin.description}</p>
        {coin.mintage > 0 && (
          <p className="text-xs text-gray-400 mt-1">{coin.mintage.toLocaleString('es')} uds.</p>
        )}
      </div>

      {/* Toggle button */}
      <div className={`py-1.5 text-center text-xs font-medium transition ${
        isOwned ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}>
        {isOwned ? '✅ En mi colección' : '+ Añadir'}
      </div>
    </div>
  )
}