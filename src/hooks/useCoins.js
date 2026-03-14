// src/hooks/useCoins.js
// Drop-in replacement de '../data/coins'
// Exporta ALL_COINS, COUNTRIES y YEARS igual que antes, pero desde Supabase

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../supabase'

// Caché en memoria para la sesión (evita refetches entre navegaciones)
let _cache = null

export function useCoins() {
  const [coins, setCoins]     = useState(_cache || [])
  const [loading, setLoading] = useState(!_cache)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (_cache) return

    let cancelled = false

    async function fetchCoins() {
      setLoading(true)
      setError(null)

      // Supabase devuelve máx 1000 filas — paginamos por si el catálogo crece
      const PAGE = 1000
      let all = []
      let from = 0

      while (true) {
        const { data, error } = await supabase
          .from('coins')
          .select('*')
          .order('country', { ascending: true })
          .order('year',    { ascending: true })
          .range(from, from + PAGE - 1)

        if (error) {
          if (!cancelled) {
            setError(error.message)
            setLoading(false)
          }
          return
        }

        all = [...all, ...data]
        if (data.length < PAGE) break
        from += PAGE
      }

      if (!cancelled) {
        const normalized = all.map(normalizeRow)
        _cache = normalized
        setCoins(normalized)
        setLoading(false)
      }
    }

    fetchCoins()
    return () => { cancelled = true }
  }, [])

  // Mismos nombres que antes: ALL_COINS, COUNTRIES, YEARS
  const ALL_COINS = coins

  const COUNTRIES = useMemo(
    () => [...new Set(coins.map(c => c.country))].sort(),
    [coins]
  )

  const YEARS = useMemo(
    () => [...new Set(coins.map(c => c.year))].sort(),
    [coins]
  )

  return { ALL_COINS, COUNTRIES, YEARS, loading, error }
}

// Convierte snake_case de Supabase → camelCase que usa la app
function normalizeRow(row) {
  return {
    id:           row.id,
    country:      row.country,
    year:         row.year,
    description:  row.description,
    imageUrl:     row.image_url,
    mintage:      row.mintage,
    commemorates: row.commemorates,
  }
}

// Llama esto desde el panel admin tras aprobar una propuesta
// para que el siguiente render recargue el catálogo desde Supabase
export function invalidateCoinsCache() {
  _cache = null
}