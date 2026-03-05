import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'

export function useAdmin() {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Esperamos a que auth termine de cargar
    if (authLoading) return

    // Si no hay usuario, no es admin
    if (!user) {
      setIsAdmin(false)
      setLoading(false)
      return
    }

    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()  // ← maybeSingle en lugar de single, no falla si no hay fila
      .then(({ data, error }) => {
        if (error) console.error('useAdmin error:', error)
        setIsAdmin(data?.role === 'admin')
        setLoading(false)
      })
  }, [user, authLoading])

  return { isAdmin, loading }
}