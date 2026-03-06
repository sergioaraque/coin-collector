import { useState, useEffect } from 'react'
import { usePWAInstall } from '../hooks/usePWAInstall'

export default function PWABanner() {
  const { canInstall, install } = usePWAInstall()
  const [dismissed, setDismissed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const wasDismissed = localStorage.getItem('pwa-banner-dismissed')
    if (wasDismissed) { setDismissed(true); return }

    // Mostramos después de 3 segundos
    if (canInstall) {
      const timer = setTimeout(() => setVisible(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [canInstall])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    localStorage.setItem('pwa-banner-dismissed', 'true')
  }

  const handleInstall = async () => {
    await install()
    setVisible(false)
  }

  if (!visible || dismissed) return null

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80"
      style={{
        animation: 'slide-up-banner 0.4s ease forwards',
      }}
    >
      <style>{`
        @keyframes slide-up-banner {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="bg-blue-900 text-white rounded-2xl shadow-2xl p-4 border border-blue-700 flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center text-2xl shrink-0">
          🪙
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">Instala EuroCollector</p>
          <p className="text-blue-300 text-xs mt-0.5">Acceso rápido desde tu móvil</p>
        </div>
        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={handleInstall}
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-xs px-3 py-1.5 rounded-lg transition"
          >
            Instalar
          </button>
          <button
            onClick={handleDismiss}
            className="text-blue-400 hover:text-white text-xs text-center transition"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  )
}