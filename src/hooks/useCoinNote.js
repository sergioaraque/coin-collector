import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'

export function useCoinNote(coinId) {
  const { user } = useAuth()
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user || !coinId) { setLoading(false); return }
    supabase
      .from('coin_notes')
      .select('note')
      .eq('user_id', user.id)
      .eq('coin_id', coinId)
      .maybeSingle()
      .then(({ data }) => {
        setNote(data?.note || '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user, coinId])

  const saveNote = useCallback(async (text) => {
    if (!user) return
    setSaving(true)
    try {
      if (text.trim() === '') {
        await supabase.from('coin_notes')
          .delete()
          .eq('user_id', user.id)
          .eq('coin_id', coinId)
        setNote('')
      } else {
        await supabase.from('coin_notes')
          .upsert({ user_id: user.id, coin_id: coinId, note: text.trim(), updated_at: new Date().toISOString() })
        setNote(text.trim())
      }
    } finally {
      setSaving(false)
    }
  }, [user, coinId])

  return { note, setNote, saving, loading, saveNote }
}