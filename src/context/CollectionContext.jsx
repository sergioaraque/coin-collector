import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../supabase'
import { useAuth } from './AuthContext'
import { ALL_COINS } from '../data/coins'
import { notifyCountryComplete } from '../lib/discord'
import { showToast } from '../components/Toast'

const CollectionContext = createContext(null)

export function CollectionProvider({ children }) {
  const { user } = useAuth()
  const [owned, setOwned] = useState(new Set())
  const [loading, setLoading] = useState(false)

  const fetchOwned = useCallback(async () => {
    if (!user) { setOwned(new Set()); return }
    setLoading(true)
    const { data } = await supabase
      .from('collection')
      .select('coin_id')
      .eq('user_id', user.id)
    setOwned(new Set((data || []).map(r => r.coin_id)))
    setLoading(false)
  }, [user])

  useEffect(() => { fetchOwned() }, [fetchOwned])

  const toggleCoin = async (coinId) => {
    if (!user) return
    const isOwned = owned.has(coinId)
    const coin = ALL_COINS.find(c => c.id === coinId)

    if (isOwned) {
      await supabase.from('collection').delete()
        .eq('user_id', user.id).eq('coin_id', coinId)
      setOwned(prev => { const s = new Set(prev); s.delete(coinId); return s })
      showToast(`${coin?.country} ${coin?.year} eliminada`, 'info')
    } else {
      await supabase.from('collection').insert({ user_id: user.id, coin_id: coinId })
      const newOwned = new Set([...owned, coinId])
      setOwned(newOwned)
      showToast(`🪙 ${coin?.country} ${coin?.year} añadida`, 'success')

      // Comprobamos país completado
      if (coin) {
        const countryCoins = ALL_COINS.filter(c => c.country === coin.country)
        const allOwned = countryCoins.every(c => newOwned.has(c.id))
        if (allOwned) {
          showToast(`🏆 ¡${coin.country} completado al 100%!`, 'success')
          await notifyCountryComplete(user.email, coin.country, countryCoins.length)
        }
      }
    }
  }

  return (
    <CollectionContext.Provider value={{ owned, loading, toggleCoin }}>
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollection = () => useContext(CollectionContext)