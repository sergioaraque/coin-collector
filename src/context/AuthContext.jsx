import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { notifyLogin } from '../lib/discord'
import { ALL_COINS } from '../data/coins'
import { notifyDiscord } from '../lib/discord'

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
      if (event === 'SIGNED_IN' && session?.user) {
        const sessionKey = `notified_${session.user.id}`
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, '1')
          setTimeout(async () => {
            try {
              const [{ count }, { data: profile }] = await Promise.all([
                supabase
                  .from('collection')
                  .select('*', { count: 'exact', head: true })
                  .eq('user_id', session.user.id),
                supabase
                  .from('profiles')
                  .select('username')
                  .eq('user_id', session.user.id)
                  .maybeSingle()
              ])
              await notifyLogin(
                session.user.email,
                profile?.username,
                count || 0,
                ALL_COINS.length
              )
            } catch (e) {
              console.error('Error notificando Discord:', e)
            }
          }, 0)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    const result = await supabase.auth.signUp({ email, password })
    
    if (!result.error && result.data?.user) {
      await notifyDiscord(
        `🆕 **Nuevo registro** — \`${email}\`\n` +
        `📅 ${new Date().toLocaleString('es')}\n` +
        `⏳ Pendiente de confirmar email`
      )
    }
    
    return result
  }

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