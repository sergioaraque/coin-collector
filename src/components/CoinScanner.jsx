import { useEffect } from 'react'
import { useCoinScanner } from '../hooks/useCoinScanner'
import { useCoinImage } from '../hooks/useCoinImage'

export default function CoinScanner({ allCoins, owned, onToggle, onClose }) {
  const {
    videoRef, phase, capturedImage, matches, ocrError,
    startCamera, stopCamera, captureAndRecognize, reset,
  } = useCoinScanner(allCoins)

  // Arranca la cámara al montar
  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-800 dark:text-white">
            📷 Escanear moneda
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">

          {/* FASE: cámara */}
          {phase === 'camera' && (
            <>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Enfoca la cara nacional de la moneda. Asegúrate de que el año sea visible.
              </p>
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                {/* Guía de encuadre */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 rounded-full border-2 border-white/60 border-dashed" />
                </div>
              </div>
              <button
                onClick={captureAndRecognize}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition text-sm"
              >
                📸 Capturar y reconocer
              </button>
            </>
          )}

          {/* FASE: procesando */}
          {phase === 'processing' && (
            <div className="flex flex-col items-center gap-4 py-6">
              {capturedImage && (
                <img
                  src={capturedImage}
                  alt="Captura"
                  className="w-48 h-32 object-cover rounded-xl border border-gray-200 dark:border-gray-600"
                />
              )}
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-blue-700 rounded-full animate-spin" />
                Reconociendo texto con OCR…
              </div>
              <p className="text-xs text-gray-400 text-center">
                La primera vez puede tardar unos segundos mientras se carga el motor OCR.
              </p>
            </div>
          )}

          {/* FASE: resultados */}
          {phase === 'results' && (
            <>
              {capturedImage && (
                <div className="flex items-center gap-3">
                  <img
                    src={capturedImage}
                    alt="Captura"
                    className="w-16 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-600 shrink-0"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {matches.length > 0
                      ? `${matches.length} coincidencia${matches.length > 1 ? 's' : ''} encontrada${matches.length > 1 ? 's' : ''}`
                      : 'Sin coincidencias'}
                  </p>
                </div>
              )}

              {ocrError && (
                <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2">
                  ⚠️ {ocrError}
                </p>
              )}

              {matches.length > 0 && (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {matches.map(coin => (
                    <MatchRow
                      key={coin.id}
                      coin={coin}
                      isOwned={owned.has(coin.id)}
                      onToggle={() => onToggle(coin.id)}
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { reset(); startCamera() }}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2.5 rounded-xl transition text-sm"
                >
                  🔄 Volver a escanear
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-xl transition text-sm"
                >
                  Cerrar
                </button>
              </div>
            </>
          )}

          {/* Error de cámara (sin llegar a phase camera) */}
          {phase === 'idle' && ocrError && (
            <div className="py-4 space-y-3">
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2 text-center">
                ❌ {ocrError}
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2.5 rounded-xl transition text-sm"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MatchRow({ coin, isOwned, onToggle }) {
  const { src, status } = useCoinImage(coin)

  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
      {/* Imagen de catálogo */}
      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center shrink-0 overflow-hidden">
        {status === 'error' ? (
          <span className="text-2xl">🪙</span>
        ) : (
          <img
            src={src}
            alt={coin.description}
            className={`w-full h-full object-contain transition-opacity ${status === 'ok' ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">{coin.country} · {coin.year}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{coin.description}</p>
      </div>

      {/* Botón */}
      <button
        onClick={onToggle}
        className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
          isOwned
            ? 'bg-green-500 text-white'
            : 'bg-blue-700 hover:bg-blue-800 text-white'
        }`}
      >
        {isOwned ? '✓ Tengo' : '+ Añadir'}
      </button>
    </div>
  )
}
