import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ALL_COINS } from '../data/coins'
import { useCollection } from '../context/CollectionContext'
import { useCoinImage } from '../hooks/useCoinImage'
import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'

export default function CoinDetailPage() {
  const { coinId } = useParams()
  const navigate = useNavigate()
  const { owned, toggleCoin } = useCollection()
  const coin = ALL_COINS.find(c => c.id === coinId)
  const { src, status } = useCoinImage(coin || {})
  const { t } = useTranslation()
  useSEO({ title: coin?.description || 'Detalle de moneda' })

  if (!coin) return (
    <div className="text-center py-20">
      <p className="text-gray-400">{t('coinNotFound')}</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">
        {t('back')}
      </button>
    </div>
  )

  const isOwned = owned.has(coin.id)

  // Monedas del mismo país
  const sameCountry = ALL_COINS.filter(c => c.country === coin.country && c.id !== coin.id)
    .sort((a, b) => a.year - b.year)

  // Monedas del mismo año (emisiones comunes)
  const sameYear = ALL_COINS.filter(c => c.year === coin.year && c.id !== coin.id)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
      >
        {t('backToCollection')}
      </button>

      {/* Card principal */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 flex justify-center">
          {status === 'error' ? (
            <span className="text-8xl">🪙</span>
          ) : (
            <img
              src={src}
              alt={coin.description}
              className={`h-48 w-48 object-contain drop-shadow-2xl transition-opacity ${
                status === 'ok' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {coin.country} · {coin.year}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{coin.description}</p>
            </div>
            <button
              onClick={() => toggleCoin(coin.id)}
              className={`shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition ${
                isOwned
                  ? 'bg-green-500 text-white hover:bg-red-400'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              {isOwned ? t('inCollection') : '+ ' + t('addCoin')}
            </button>
          </div>

          {/* Detalles */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t('commemorates')}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-0.5">
                {coin.commemorates || '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t('mintage')}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-0.5">
                {coin.mintage > 0 ? coin.mintage.toLocaleString('es') + ' ' + t('units') : '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t('country')}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-0.5">
                {coin.country}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t('year')}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-0.5">
                {coin.year}
              </p>
            </div>
          </div>

          {/* Valor estimado según acuñación */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
                {t('estimatedMarketValue')}
              </p>
              <p className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                {coin.mintage === 0 ? '—' :
                 coin.mintage < 100000 ? '20€ - 200€' :
                 coin.mintage < 500000 ? '5€ - 20€' :
                 coin.mintage < 2000000 ? '3€ - 8€' :
                 '2€ - 4€'}
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-0.5">
                {t('mintageEstimation')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Otras monedas del mismo año (emisiones comunes) */}
      {sameYear.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
            🌍 {t('commonIssue')} {coin.year} — {t('otherCountries')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {sameYear.slice(0, 12).map(c => (
              <button
                key={c.id}
                onClick={() => navigate(`/moneda/${c.id}`)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  owned.has(c.id)
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {owned.has(c.id) ? '✓ ' : ''}{c.country}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Otras monedas del mismo país */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
          {t('otherCoinsFrom')} {coin.country}
        </h2>
        <div className="flex flex-wrap gap-2">
          {sameCountry.map(c => (
            <button
              key={c.id}
              onClick={() => navigate(`/moneda/${c.id}`)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                owned.has(c.id)
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {owned.has(c.id) ? '✓ ' : ''}{c.year}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}