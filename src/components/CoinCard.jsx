import { useCoinImage } from '../hooks/useCoinImage'

export default function CoinCard({ coin, isOwned, onToggle }) {
  const { src, status } = useCoinImage(coin)

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer border-2 ${
        isOwned ? 'border-green-400' : 'border-transparent'
      }`}
      onClick={onToggle}
    >
      {/* Imagen */}
      <div className="relative bg-gray-50 flex items-center justify-center h-28">
        {status === 'error' ? (
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <span className="text-4xl">🪙</span>
            <span className="text-xs">Sin imagen</span>
          </div>
        ) : (
          <>
            {status === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}
            <img
              src={src}
              alt={coin.description}
              className={`h-24 w-24 object-contain transition-opacity duration-300 ${
                status === 'ok' ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => {}}
              onError={() => {}}
            />
          </>
        )}

        {isOwned && (
          <span className="absolute top-1 right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
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

      {/* Toggle */}
      <div className={`py-1.5 text-center text-xs font-medium transition ${
        isOwned ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}>
        {isOwned ? '✅ En mi colección' : '+ Añadir'}
      </div>
    </div>
  )
}
