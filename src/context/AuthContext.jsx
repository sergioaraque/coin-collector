import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { notifyLogin } from '../lib/discord'
import { ALL_COINS } from '../data/coins'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('onAuthStateChange evento:', event)

      if (event === 'SIGNED_OUT') {
        setUser(null)
        setLoading(false)
        return
      }

      setUser(session?.user ?? null)
      setLoading(false)

      // Solo notificamos en login real, no en cada F5
      // sessionStorage se mantiene en F5 pero se borra al cerrar el navegador
      if (event === 'SIGNED_IN' && session?.user) {
        const sessionKey = `notified_${session.user.id}`
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, '1')
          setTimeout(() => {
            supabase
              .from('collection')
              .select('*', { count: 'exact', head: true })
              .eq('user_id', session.user.id)
              .then(({ count }) => notifyLogin(session.user.email, count || 0, ALL_COINS.length))
              .catch(e => console.error('Error notificando Discord:', e))
          }, 0)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password })

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)